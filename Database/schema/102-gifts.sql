-- ============================================
-- File: 102-gifts.sql
-- Description: Create gifts table
-- Author: Floris Robart
-- ============================================



-- Table to store authentication methods
CREATE TABLE gifts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    gift_name VARCHAR(255) NOT NULL,
    gift_description TEXT,
    gift_year INTEGER,
    price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    link VARCHAR(512),

    people_id INTEGER REFERENCES peoples(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
