"""
Database setup and seed data for AgriSmart: Advisory & Cost Saver Hub
Tailored for smallholder and first-time farmers.
"""
import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'agri_smart.db')

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # Crop advisories table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS crops (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT,
        season TEXT,
        duration_days INTEGER,
        water_requirement TEXT,
        soil_type TEXT,
        stage_1_sowing TEXT,
        stage_2_vegetative TEXT,
        stage_3_flowering TEXT,
        stage_4_harvest TEXT,
        avg_cost_per_acre INTEGER,
        yield_estimate TEXT
    )
    ''')

    # Crop diagnosis & pest management
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS diseases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        crop TEXT NOT NULL,
        symptom_summary TEXT NOT NULL,
        affected_part TEXT NOT NULL,
        disease_name TEXT NOT NULL,
        cause TEXT,
        low_cost_organic_remedy TEXT NOT NULL,
        chemical_remedy TEXT,
        prevention_tips TEXT NOT NULL,
        estimated_cost_reduction TEXT
    )
    ''')

    # DIY Organic Recipes
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS organic_recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        target_use TEXT NOT NULL,
        materials_needed TEXT NOT NULL,
        preparation_steps TEXT NOT NULL,
        application_method TEXT NOT NULL,
        estimated_cost TEXT NOT NULL,
        commercial_alternative_cost TEXT NOT NULL,
        savings_percentage TEXT NOT NULL
    )
    ''')

    # Community equipment sharing / rental
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS equipment_listings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tool_name TEXT NOT NULL,
        category TEXT NOT NULL,
        owner_name TEXT NOT NULL,
        village_location TEXT NOT NULL,
        contact_phone TEXT NOT NULL,
        price_per_hour REAL NOT NULL,
        availability_status TEXT DEFAULT 'Available',
        description TEXT
    )
    ''')

    # Bulk Group Buying Circles
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS bulk_orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_name TEXT NOT NULL,
        category TEXT NOT NULL,
        retail_price_per_unit REAL NOT NULL,
        bulk_price_per_unit REAL NOT NULL,
        min_order_units INTEGER NOT NULL,
        current_committed_units INTEGER NOT NULL,
        unit TEXT NOT NULL,
        deadline_date TEXT NOT NULL,
        organizer_contact TEXT NOT NULL,
        status TEXT DEFAULT 'Open'
    )
    ''')

    # Users & Admin authentication table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        full_name TEXT NOT NULL,
        phone TEXT,
        acres_owned REAL DEFAULT 1.0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    conn.commit()

    # Seed users if empty
    cursor.execute('SELECT COUNT(*) FROM users')
    if cursor.fetchone()[0] == 0:
        cursor.execute('''
        INSERT INTO users (username, password, role, full_name, phone, acres_owned)
        VALUES 
        ('admin', 'admin123', 'admin', 'Chief Agronomist (Admin)', '+91 99000 11223', 0),
        ('farmer', 'farmer123', 'user', 'Ramesh Patel (Smallholder)', '+91 98765 43210', 2.5)
        ''')
        conn.commit()

    # Seed data if empty
    cursor.execute('SELECT COUNT(*) FROM crops')
    if cursor.fetchone()[0] == 0:
        seed_data(cursor)
        conn.commit()

    conn.close()

def seed_data(cursor):
    # Seed Crops
    crops_data = [
        (
            'Wheat (गेहूं / Trigo)',
            'Grains',
            'Rabi / Winter',
            120,
            'Moderate (4-6 irrigations)',
            'Loamy to clay loam',
            'Sow treated seeds 4-5 cm deep with 20 cm row spacing in November. Base compost 3 tons/acre.',
            'First irrigation at CRI stage (21 days). Top dress with vermicompost or split nitrogen at 30 days.',
            'Keep moisture steady during heading and flowering. Avoid waterlogging.',
            'Harvest when grains become hard and straw turns golden yellow and dry (<14% moisture).',
            14000,
            '18 - 22 quintals/acre'
        ),
        (
            'Paddy / Rice (धान / Arroz)',
            'Grains',
            'Kharif / Monsoon',
            135,
            'High (Standing water early stage)',
            'Clayey loam / fertile clay',
            'Nursery raised 25 days before transplanting. Treat with Trichoderma bio-fungicide.',
            'Maintain 2-3 cm water level. Hand weeding or rotary hoe at 20 & 40 days saves herbicide costs.',
            'Critical water need at panicle initiation. Spray diluted wood ash solution for potassium boost.',
            'Drain field 10 days before harvest. Cut when 80% grains are golden straw color.',
            18000,
            '22 - 26 quintals/acre'
        ),
        (
            'Tomato (टमाटर / Tomate)',
            'Vegetables',
            'All Seasons (Cool dry preferred)',
            90,
            'Regular drip or furrow (avoid wet leaves)',
            'Well-drained sandy loam pH 6.0-7.0',
            'Raise seedlings on raised beds. Transplant 25-day seedlings with 60x45cm spacing on mulched ridges.',
            'Stake plants with bamboo sticks to prevent soil rot. Prune bottom suckers for better air flow.',
            'Spray fermented buttermilk (chhaas) spray every 10 days to induce heavy flowering and deter pests.',
            'Pick fruits at pink/breaker stage for long transport, or full red for immediate local sale.',
            22000,
            '12 - 16 tons/acre'
        ),
        (
            'Potato (आलू / Papa)',
            'Tubers',
            'Rabi / Winter',
            100,
            'Moderate (light frequent)',
            'Loose sandy loam rich in humus',
            'Plant sprouted seed tubers (30-40g each) cut with 2-3 eyes. Treat with Trichoderma.',
            'Earthing up (mounding soil) at 25-30 days after planting to prevent green tubers.',
            'Critical tuber bulking period. Maintain uniform soil moisture; water stress reduces tuber size.',
            'De-haulm (cut foliage) 10-12 days before harvest to harden skin. Dig carefully on sunny day.',
            25000,
            '80 - 100 quintals/acre'
        ),
        (
            'Maize / Corn (मक्का / Maíz)',
            'Grains / Fodder',
            'Kharif & Spring',
            95,
            'Moderate (drought sensitive at silking)',
            'Fertile well-drained loam',
            'Sow 20 kg seed/acre at 60x20 cm spacing. Apply farmyard manure 4 tons before plowing.',
            'Intercultivation at 25 days. Watch for fall armyworm in central whorl (apply neem cake / sand mix).',
            'Critical silking stage: ensure soil moisture. Foliar spray of cow urine + water (1:10) for lush growth.',
            'Harvest when husk covers dry out and brown, grain moisture drops below 20%.',
            12000,
            '20 - 25 quintals/acre'
        ),
        (
            'Chili / Pepper (मिर्च / Chile)',
            'Spices / Vegetables',
            'Kharif & Summer',
            150,
            'Low to Moderate (sensitive to excess water)',
            'Well-drained sandy or black loam',
            'Transplant 35-day seedlings on ridges. Intercrop with marigold to trap root-knot nematodes.',
            'Pinch top shoots at 30 days to encourage branching and more fruiting nodes.',
            'Install yellow sticky traps (10/acre) to control thrips and whiteflies without buying expensive chemicals.',
            'Pick ripe green or dry red chilies sequentially every 10-14 days.',
            24000,
            '6 - 9 quintals dry / acre'
        )
    ]

    cursor.executemany('''
    INSERT INTO crops (
        name, category, season, duration_days, water_requirement, soil_type,
        stage_1_sowing, stage_2_vegetative, stage_3_flowering, stage_4_harvest,
        avg_cost_per_acre, yield_estimate
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', crops_data)

    # Seed Diseases & Diagnostic rules
    disease_data = [
        (
            'Tomato',
            'Yellow curled leaves, stunted plant growth, tiny white flies flying when leaves are shaken',
            'Leaves & Shoots',
            'Tomato Leaf Curl Virus (transmitted by Whitefly)',
            'Begomovirus spread by silverleaf whitefly',
            'Install 10-12 Yellow Sticky Traps per acre ($1.50). Spray 5% Neem Seed Kernel Extract (NSKE) or 5ml/L pure Neem Oil with soap emulsifier weekly.',
            'Imidacloprid 17.8 SL (expensive, destroys friendly bees)',
            'Plant 2 rows of barrier maize or sorghum around tomato plot; remove infected plants immediately.',
            'Saves 70% vs repeat synthetic insecticide sprays'
        ),
        (
            'Wheat',
            'Orange-yellow or brown powdery pustules arranged in stripes along leaf veins',
            'Leaves',
            'Yellow / Stripe Rust (Puccinia striiformis)',
            'Fungal pathogen thriving in cool, humid morning dew',
            'Spray Sour Buttermilk (chaas / lassi) 1 liter mixed with 15 liters water and 100g wood ash. Actively inhibits fungal spores.',
            'Propiconazole 25% EC ($12/acre)',
            'Plant rust-resistant certified seeds; avoid excessive synthetic nitrogen fertilizer which causes lush weak leaves.',
            'Saves up to $20/acre in fungicide costs'
        ),
        (
            'Paddy / Rice',
            'Spindle-shaped brown spots with grey centers on leaves, rotting neck of panicles falling over',
            'Leaf & Panicle Neck',
            'Rice Blast (Magnaporthe oryzae)',
            'Foliar fungal infection during cloudy humid spells',
            'Bio-treatment with Pseudomonas fluorescens (5g/L) foliar spray. Spray fermented cow urine + garlic extract.',
            'Tricyclazole 75 WP ($15/acre)',
            'Avoid deep standing stagnant water; balance nitrogen with potassium (wood ash).',
            'Saves 60% compared to brand fungicides'
        ),
        (
            'Potato',
            'Water-soaked dark lesions on leaf tips turning black, white mildew on leaf undersides in wet weather',
            'Leaves & Tubers',
            'Late Blight (Phytophthora infestans)',
            'Oomycete fungus spreading rapidly after rain and fog',
            'Spray Bordeaux Mixture (1% copper sulfate + hydrated lime) prepared at home for pennies, or Trichoderma viride.',
            'Metalaxyl + Mancozeb proprietary blends ($18/acre)',
            'Mound soil high over tubers so spores cannot wash into potatoes; harvest only after vines are fully dead and dry.',
            'Reduces spray costs by 65%'
        ),
        (
            'Maize / Corn',
            'Window pane holes in young leaves, sawdust-like excreta in the central leaf whorl, chewed cobs',
            'Leaf whorl & Cob',
            'Fall Armyworm (Spodoptera frugiperda)',
            'Invasive moth caterpillar feeding inside whorls',
            'Drop a mixture of fine sand and wood ash (1:1) into leaf whorls, or spray Bacillus thuringiensis (Bt) or Neem oil.',
            'Emamectin benzoate 5 SG ($14/acre)',
            'Intercrop with Desmodium or legumes (push-pull strategy); deep summer plowing to expose pupae to birds.',
            'Saves 75% on toxic chemicals'
        ),
        (
            'Chili',
            'Upward leaf curling (boat shape), crinkling, flower drop, bronzed leaf texture',
            'Top Young Leaves',
            'Chili Thrips and Mites',
            'Minute sap-sucking insects thriving in warm dry weather',
            'Spray Dashaparni Kashayam (10-leaf herbal extract) or 5% Neem oil + liquid soap. Intercrop with tall marigolds.',
            'Diafenthiuron or Fipronil ($16/acre)',
            'Keep soil consistently moist (dry spells trigger mite outbreaks); preserve ladybugs and predatory mites.',
            'Cuts pesticide expenses by 80%'
        )
    ]

    cursor.executemany('''
    INSERT INTO diseases (
        crop, symptom_summary, affected_part, disease_name, cause,
        low_cost_organic_remedy, chemical_remedy, prevention_tips, estimated_cost_reduction
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', disease_data)

    # Seed DIY Organic Recipes
    recipes_data = [
        (
            'Jeevamrutha (Liquid Bio-Fertilizer & Soil Microbe Booster)',
            'All crops (Increases soil fertility, replaces urea & chemical DAP)',
            '10 kg fresh indigenous cow dung, 10 liters cow urine, 2 kg jaggery (raw sugar), 2 kg pulse flour (besan), handful of virgin fertile soil, 200 liters water in a plastic drum.',
            '1. Mix cow dung and urine thoroughly in drum with water.\n2. Add crushed jaggery and pulse flour.\n3. Add handful of soil from undisturbed forest or bund.\n4. Stir clockwise 2-3 minutes with a wooden stick twice a day.\n5. Keep in shade covered with jute gunny bag for 48 to 72 hours.',
            'Apply 200 liters per acre with irrigation water or spray filtered solution (10% dilution) twice a month.',
            '$2.50 per 200L batch',
            '$35.00 for chemical fertilizer equivalent',
            '92% Savings'
        ),
        (
            'Neem Seed Kernel Extract (NSKE 5% Natural Insecticide)',
            'Broad spectrum insect pest repellent (caterpillars, aphids, borers)',
            '5 kg dried neem seeds/kernels, 100 liters water, 200g mild laundry soap or liquid soap.',
            '1. Pound 5 kg neem kernels into fine powder.\n2. Tie in a clean cloth pouch and soak in 10 liters water overnight.\n3. Squeeze the pouch repeatedly in morning till water turns milky brown.\n4. Dilute with 90 liters clean water and add 200g soap solution as sticking agent.',
            'Spray directly onto upper and lower leaf surfaces during late afternoon. Use within 24 hours of brewing.',
            '$1.80 per 100L spray',
            '$22.00 for chemical insecticide',
            '88% Savings'
        ),
        (
            'Panchagavya (Plant Growth Hormone & Immunity Tonic)',
            'Flowering boost, fruit setting, drought resilience for all crops',
            '5 kg fresh cow dung, 3 liters cow urine, 2 liters cow milk, 2 liters cow curd (yogurt), 1 kg clarified butter (ghee), 3 kg ripe bananas, 3 liters coconut water, 1 kg jaggery.',
            '1. Mix cow dung and ghee thoroughly in a container for 3 days.\n2. On 4th day, add cow urine, milk, curd, mashed bananas, coconut water, and jaggery syrup.\n3. Stir daily morning and evening for 15-20 days.',
            'Filter and dilute 300 ml in 10 liters of water (3% solution). Spray on plants at vegetative, flowering, and fruit formation stages.',
            '$4.00 per 15-liter concentrate',
            '$45.00 for synthetic growth regulators and micronutrients',
            '85% Savings'
        ),
        (
            'Sour Buttermilk Antifungal Spray (Chhaas Fungicide)',
            'Mildew, leaf spots, rusts, and fungal blights',
            '2 liters sour curd/buttermilk (aged 5-7 days in copper or clay pot), 15 liters water, 50g wood ash.',
            '1. Let buttermilk turn deeply sour and pungent for 5-7 days.\n2. Strain through fine muslin cloth.\n3. Mix with 15 liters clean water and add fine wood ash as a spreader.',
            'Spray thoroughly across crop foliage when fungal spots first appear or during cool foggy mornings.',
            '$0.60 per tank',
            '$15.00 for synthetic copper fungicides',
            '96% Savings'
        )
    ]

    cursor.executemany('''
    INSERT INTO organic_recipes (
        title, target_use, materials_needed, preparation_steps, application_method,
        estimated_cost, commercial_alternative_cost, savings_percentage
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', recipes_data)

    # Seed Equipment Listings for Rental Sharing
    equipment_data = [
        ('Mini Tractor (25 HP) with Cultivator', 'Tractor & Tillage', 'Ramesh Patel', 'Greenfield Village, Sector 4', '+91 98765 43210', 8.50, 'Available', 'Ideal for 1-3 acre small plots. Fuel efficient, includes cultivator and rotavator attachments.'),
        ('Battery Operated Knapsack Sprayer (16L)', 'Sprayers', 'Anita Sharma', 'North Hill Hamlet', '+91 98231 11223', 1.50, 'Available', 'Lightweight, dual-nozzle for fast organic or foliar spraying. Eliminates manual pumping.'),
        ('Paddy Drum Seeder (Manual 8-Row)', 'Seeders', 'Gurpreet Singh', 'East Canal Colony', '+91 98112 33445', 2.00, 'Available', 'Reduces seed requirement by 40% and cuts transplanting labor by 70%. Easy for single person to pull.'),
        ('Multi-Crop Power Thresher (5 HP)', 'Harvesting & Threshing', 'Sunil Kumar', 'Central Market Area', '+91 98990 88776', 6.00, 'Available', 'Threshes wheat, soybean, maize, and mustard with minimal grain breakage.'),
        ('Solar Water Pump Set (Mobile 3 HP)', 'Irrigation', 'Mahesh Verma', 'South Riverbank', '+91 97654 32190', 4.00, 'Available', 'Mounted on cart, zero electricity or diesel costs. Perfect for flood or furrow irrigation.')
    ]

    cursor.executemany('''
    INSERT INTO equipment_listings (
        tool_name, category, owner_name, village_location, contact_phone, price_per_hour, availability_status, description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', equipment_data)

    # Seed Bulk Buying Circles
    bulk_data = [
        ('Certified Wheat Seeds (HD-2967 High Yield)', 'Seeds', 38.00, 24.50, 100, 68, 'Bags (40kg)', '2026-12-05', 'Kisan Cooperative Secretary (+91 94123 55667)', 'Open'),
        ('Neem Coated Organic Bio-Fertilizer', 'Fertilizer', 22.00, 14.20, 150, 115, 'Bags (50kg)', '2026-11-30', 'Farm Collective Group (+91 95551 23456)', 'Open'),
        ('High-Density Yellow Sticky Traps (Pack of 50)', 'Pest Control', 18.00, 9.80, 50, 38, 'Packs', '2026-12-02', 'Youth Farmer Circle (+91 93332 99887)', 'Open'),
        ('Drip Irrigation Inline Tubing (16mm, 500m Roll)', 'Irrigation', 45.00, 29.00, 30, 22, 'Rolls', '2026-12-10', 'Water Conservation Group (+91 96664 11223)', 'Open')
    ]

    cursor.executemany('''
    INSERT INTO bulk_orders (
        item_name, category, retail_price_per_unit, bulk_price_per_unit, min_order_units, current_committed_units, unit, deadline_date, organizer_contact, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', bulk_data)

if __name__ == '__main__':
    init_db()
    print("Database initialized successfully with seed data.")
