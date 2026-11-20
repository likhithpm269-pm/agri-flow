"""
AgriSmart Flask Backend Server
Providing unified advice, multilingual support, and input cost optimization for smallholder farmers.
"""
from flask import Flask, jsonify, request, send_from_directory
import os
import sqlite3
import datetime
import random
from database import get_connection, init_db

app = Flask(__name__, static_folder='static', static_url_path='')

# Ensure DB is created on startup
init_db()

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'
    return response

# Serve Frontend
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

# Health Check Endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    db_status = "unhealthy"
    try:
        conn = get_connection()
        conn.execute("SELECT 1")
        conn.close()
        db_status = "healthy"
    except Exception as e:
        db_status = f"error: {str(e)}"

    return jsonify({
        "status": "online",
        "service": "AgriSmart Smallholder Farmer Hub Backend",
        "version": "1.0.0",
        "database": db_status,
        "timestamp": datetime.datetime.now().isoformat(),
        "host_available": True
    }), 200

# Authentication Routes (User & Admin)
@app.route('/api/auth/login', methods=['POST'])
def auth_login():
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, username, password, role, full_name, phone, acres_owned FROM users WHERE LOWER(username) = LOWER(?)", (username,))
    user = cursor.fetchone()
    conn.close()

    if not user or user['password'] != password:
        return jsonify({"error": "Invalid username or password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user['id'],
            "username": user['username'],
            "role": user['role'],
            "full_name": user['full_name'],
            "phone": user['phone'],
            "acres_owned": user['acres_owned']
        }
    }), 200

@app.route('/api/auth/register', methods=['POST'])
def auth_register():
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()
    full_name = data.get('full_name', '').strip()
    phone = data.get('phone', '').strip()
    acres_owned = float(data.get('acres_owned', 1.0))
    role = data.get('role', 'user')

    if not username or not password or not full_name:
        return jsonify({"error": "Username, password, and full name are required"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
        INSERT INTO users (username, password, role, full_name, phone, acres_owned)
        VALUES (?, ?, ?, ?, ?, ?)
        ''', (username, password, role, full_name, phone, acres_owned))
        conn.commit()
        new_id = cursor.lastrowid
        conn.close()
        return jsonify({
            "message": "User registered successfully",
            "user": {
                "id": new_id,
                "username": username,
                "role": role,
                "full_name": full_name,
                "phone": phone,
                "acres_owned": acres_owned
            }
        }), 201
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({"error": "Username already exists. Please pick another."}), 409

# Admin Metrics & Management APIs
@app.route('/api/admin/metrics', methods=['GET'])
def admin_metrics():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM users")
    total_users = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM crops")
    total_crops = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM equipment_listings")
    total_equipment = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*), SUM(current_committed_units) FROM bulk_orders")
    bulk_stats = cursor.fetchone()
    total_bulk_orders = bulk_stats[0]
    total_committed_units = bulk_stats[1] or 0
    cursor.execute("SELECT COUNT(*) FROM diseases")
    total_diseases = cursor.fetchone()[0]
    conn.close()

    return jsonify({
        "total_users": total_users,
        "total_crops": total_crops,
        "total_equipment": total_equipment,
        "total_bulk_pools": total_bulk_orders,
        "total_committed_units": total_committed_units,
        "total_diseases": total_diseases,
        "estimated_community_savings": "$14,850+"
    }), 200

@app.route('/api/admin/crops', methods=['POST'])
def admin_add_crop():
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    category = data.get('category', 'Grains')
    season = data.get('season', 'All Season')
    duration_days = int(data.get('duration_days', 90))
    water_req = data.get('water_requirement', 'Moderate')
    soil_type = data.get('soil_type', 'Loam')
    stage_1 = data.get('stage_1_sowing', '')
    stage_2 = data.get('stage_2_vegetative', '')
    stage_3 = data.get('stage_3_flowering', '')
    stage_4 = data.get('stage_4_harvest', '')
    avg_cost = int(data.get('avg_cost_per_acre', 15000))
    yield_est = data.get('yield_estimate', '15-20 quintals')

    if not name or not stage_1 or not stage_4:
        return jsonify({"error": "Name, stage 1, and stage 4 are required"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO crops (name, category, season, duration_days, water_requirement, soil_type,
                       stage_1_sowing, stage_2_vegetative, stage_3_flowering, stage_4_harvest,
                       avg_cost_per_acre, yield_estimate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (name, category, season, duration_days, water_req, soil_type, stage_1, stage_2, stage_3, stage_4, avg_cost, yield_est))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return jsonify({"message": "Crop advisory added successfully", "id": new_id}), 201

@app.route('/api/equipment/<int:tool_id>', methods=['DELETE'])
def delete_equipment(tool_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM equipment_listings WHERE id = ?", (tool_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": f"Equipment listing {tool_id} deleted successfully"}), 200

# Crop Advisories API
@app.route('/api/crops', methods=['GET'])
def get_crops():
    category = request.args.get('category')
    conn = get_connection()
    cursor = conn.cursor()
    if category:
        cursor.execute("SELECT * FROM crops WHERE category = ?", (category,))
    else:
        cursor.execute("SELECT * FROM crops")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows]), 200

@app.route('/api/crops/<int:crop_id>', methods=['GET'])
def get_crop_detail(crop_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM crops WHERE id = ?", (crop_id,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        return jsonify({"error": "Crop not found"}), 404
    return jsonify(dict(row)), 200

# Disease & Symptom Diagnosis API
@app.route('/api/diagnose', methods=['GET', 'POST'])
def diagnose_crop():
    crop_query = ""
    symptom_query = ""
    if request.method == 'POST':
        data = request.get_json() or {}
        crop_query = data.get('crop', '').strip()
        symptom_query = data.get('symptom', '').strip()
    else:
        crop_query = request.args.get('crop', '').strip()
        symptom_query = request.args.get('symptom', '').strip()

    conn = get_connection()
    cursor = conn.cursor()
    
    query = "SELECT * FROM diseases WHERE 1=1"
    params = []
    if crop_query and crop_query.lower() != 'all':
        query += " AND LOWER(crop) LIKE ?"
        params.append(f"%{crop_query.lower()}%")
    if symptom_query:
        query += " AND (LOWER(symptom_summary) LIKE ? OR LOWER(disease_name) LIKE ? OR LOWER(affected_part) LIKE ?)"
        term = f"%{symptom_query.lower()}%"
        params.extend([term, term, term])

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows]), 200

# DIY Low-Cost Organic Recipes API
@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM organic_recipes")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows]), 200

# Input Cost Calculator API
@app.route('/api/calculator/inputs', methods=['POST'])
def calculate_inputs():
    data = request.get_json() or {}
    crop = data.get('crop', 'wheat').lower()
    acres = float(data.get('acres', 1.0))
    if acres <= 0:
        acres = 1.0

    # Benchmark requirements per acre
    standards = {
        'wheat': {
            'seed_kg': 40,
            'chemical_fertilizer_cost': 45,
            'pesticide_cost': 30,
            'organic_diy_cost': 14,
            'water_sessions': 5,
            'seed_cost_per_kg': 0.90
        },
        'rice': {
            'seed_kg': 20,
            'chemical_fertilizer_cost': 55,
            'pesticide_cost': 38,
            'organic_diy_cost': 18,
            'water_sessions': 12,
            'seed_cost_per_kg': 1.20
        },
        'tomato': {
            'seed_kg': 0.15,
            'chemical_fertilizer_cost': 70,
            'pesticide_cost': 50,
            'organic_diy_cost': 22,
            'water_sessions': 14,
            'seed_cost_per_kg': 180.0
        },
        'potato': {
            'seed_kg': 1000,
            'chemical_fertilizer_cost': 65,
            'pesticide_cost': 45,
            'organic_diy_cost': 20,
            'water_sessions': 7,
            'seed_cost_per_kg': 0.40
        },
        'maize': {
            'seed_kg': 8,
            'chemical_fertilizer_cost': 40,
            'pesticide_cost': 25,
            'organic_diy_cost': 12,
            'water_sessions': 6,
            'seed_cost_per_kg': 3.50
        },
        'chili': {
            'seed_kg': 0.4,
            'chemical_fertilizer_cost': 60,
            'pesticide_cost': 48,
            'organic_diy_cost': 20,
            'water_sessions': 10,
            'seed_cost_per_kg': 120.0
        }
    }

    # Match benchmark or use general
    benchmark = standards.get(crop, standards['wheat'])
    
    total_seeds = round(benchmark['seed_kg'] * acres, 2)
    seed_expenditure = round(total_seeds * benchmark['seed_cost_per_kg'], 2)
    chemical_total = round((benchmark['chemical_fertilizer_cost'] + benchmark['pesticide_cost']) * acres, 2)
    organic_total = round(benchmark['organic_diy_cost'] * acres, 2)
    estimated_savings = round(chemical_total - organic_total, 2)
    savings_percent = round((estimated_savings / chemical_total * 100) if chemical_total else 0, 1)

    return jsonify({
        "crop": crop.capitalize(),
        "acres": acres,
        "seed_required": f"{total_seeds} kg",
        "seed_budget": f"${seed_expenditure}",
        "conventional_chemical_cost": f"${chemical_total}",
        "organic_diy_alternative_cost": f"${organic_total}",
        "net_money_saved": f"${estimated_savings}",
        "savings_percentage": f"{savings_percent}%",
        "recommended_water_cycles": int(benchmark['water_sessions']),
        "actionable_tips": [
            "Use certified seed rate to avoid over-planting by 20-30%.",
            "Prepare Jeevamrutha and Bio-pesticides on farm to eliminate expensive synthetic chemical inputs.",
            "Form or join a local collective buying circle for seed procurement."
        ]
    }), 200

# Equipment Rental & Sharing API
@app.route('/api/equipment', methods=['GET', 'POST'])
def manage_equipment():
    conn = get_connection()
    cursor = conn.cursor()
    if request.method == 'POST':
        data = request.get_json() or {}
        tool_name = data.get('tool_name', '').strip()
        category = data.get('category', 'General')
        owner_name = data.get('owner_name', '').strip()
        village_location = data.get('village_location', '').strip()
        contact_phone = data.get('contact_phone', '').strip()
        price_per_hour = float(data.get('price_per_hour', 0.0))
        description = data.get('description', '').strip()

        if not tool_name or not owner_name or not contact_phone:
            conn.close()
            return jsonify({"error": "tool_name, owner_name, and contact_phone are required"}), 400

        cursor.execute('''
        INSERT INTO equipment_listings (tool_name, category, owner_name, village_location, contact_phone, price_per_hour, availability_status, description)
        VALUES (?, ?, ?, ?, ?, ?, 'Available', ?)
        ''', (tool_name, category, owner_name, village_location, contact_phone, price_per_hour, description))
        conn.commit()
        new_id = cursor.lastrowid
        conn.close()
        return jsonify({"message": "Equipment listing created successfully", "id": new_id}), 201

    cursor.execute("SELECT * FROM equipment_listings ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows]), 200

# Bulk Buying Pools API
@app.route('/api/bulk-orders', methods=['GET'])
def get_bulk_orders():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM bulk_orders ORDER BY id ASC")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows]), 200

@app.route('/api/bulk-orders/<int:order_id>/commit', methods=['POST'])
def commit_bulk_order(order_id):
    data = request.get_json() or {}
    units = int(data.get('units', 1))
    if units <= 0:
        return jsonify({"error": "Units must be at least 1"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM bulk_orders WHERE id = ?", (order_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return jsonify({"error": "Bulk order not found"}), 404

    new_committed = row['current_committed_units'] + units
    status = 'Completed' if new_committed >= row['min_order_units'] else 'Open'

    cursor.execute("UPDATE bulk_orders SET current_committed_units = ?, status = ? WHERE id = ?", (new_committed, status, order_id))
    conn.commit()
    conn.close()

    savings_per_unit = row['retail_price_per_unit'] - row['bulk_price_per_unit']
    total_savings = savings_per_unit * units

    return jsonify({
        "message": f"Successfully joined order for {units} {row['unit']}!",
        "new_committed_units": new_committed,
        "target_units": row['min_order_units'],
        "farmer_estimated_savings": f"${round(total_savings, 2)}",
        "status": status
    }), 200

# Weather & Smart Spraying Advisory
@app.route('/api/weather-advisory', methods=['GET'])
def weather_advisory():
    # Simulates local microclimate advisory
    current_temp = 27
    humidity = 62
    wind_speed = 7 # km/h
    rain_probability = 15 # %

    spray_safe = True
    advisory_reason = "Safe for foliar spray. Low wind speed (<12 km/h) and minimal rain probability (<30%)."
    
    # Logic to prevent farmers wasting expensive sprays
    if rain_probability > 40:
        spray_safe = False
        advisory_reason = "DO NOT SPRAY TODAY. High rain probability will wash away expensive sprays, causing financial loss."
    elif wind_speed > 15:
        spray_safe = False
        advisory_reason = "DO NOT SPRAY TODAY. High winds will cause spray drift onto neighbor fields and waste inputs."

    return jsonify({
        "location": "Regional Rural Micro-Zone",
        "temperature_celsius": current_temp,
        "humidity_percentage": humidity,
        "wind_speed_kmh": wind_speed,
        "rain_probability_pct": rain_probability,
        "spray_recommended": spray_safe,
        "spray_advisory_message": advisory_reason,
        "cost_warning": "Spraying before heavy rain wastes 100% of chemical/organic spray and up to $30/acre."
    }), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting AgriSmart Server on http://0.0.0.0:{port}")
    app.run(host='0.0.0.0', port=port, debug=False)
