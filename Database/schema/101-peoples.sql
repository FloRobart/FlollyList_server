-- ============================================
-- File: 101-peoples.sql
-- Description: Create peoples table
-- Author: Floris Robart
-- ============================================



-- Table to store authentication methods
CREATE TABLE peoples (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) DEFAULT NULL,
    date_of_birth DATE,

    user_id INTEGER NOT NULL,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
