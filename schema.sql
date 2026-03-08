-- MacroFridge: Core Database Schema
-- Optimized for PowerSync Logical Replication

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Households
CREATE TABLE households (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    daily_protein_goal INTEGER DEFAULT 150,
    daily_carb_goal INTEGER DEFAULT 200,
    daily_fat_goal INTEGER DEFAULT 60,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Household Members (Many-to-Many)
CREATE TABLE household_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID REFERENCES households(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('admin', 'member')) DEFAULT 'member',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(household_id, user_id)
);

-- 4. Products (Global Catalog)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    barcode TEXT UNIQUE,
    name TEXT NOT NULL,
    brand TEXT,
    macros_per_100g JSONB, -- {p: float, c: float, f: float}
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Inventory Items
CREATE TABLE inventory_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID REFERENCES households(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    custom_name TEXT, -- Fallback if not linked to a catalog product
    quantity FLOAT NOT NULL DEFAULT 0,
    unit TEXT NOT NULL DEFAULT 'count', -- g, ml, count
    purchase_price DECIMAL(12, 2),
    expiration_date TIMESTAMPTZ,
    use_soon_flag BOOLEAN DEFAULT FALSE,
    entry_method TEXT CHECK (entry_method IN ('manual', 'barcode', 'ocr')) DEFAULT 'manual',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Transactions (Financial Tracking)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_id UUID REFERENCES households(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    vendor_name TEXT,
    total_amount DECIMAL(12, 2) NOT NULL,
    transaction_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Logical Replication for PowerSync
-- Create publication for all tables
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'powersync_publication') THEN
        CREATE PUBLICATION powersync_publication FOR ALL TABLES;
    END IF;
END $$;
