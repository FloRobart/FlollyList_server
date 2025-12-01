-- ============================================
-- File: 201-update_users_updated_at.sql
-- Description: Triggers to update updated_at columns on row updates
-- Author: Floris Robart
-- ============================================



-- Trigger on the peoples table to update the updated_at column on row updates
DROP TRIGGER IF EXISTS update_peoples_updated_at ON peoples;
CREATE TRIGGER update_peoples_updated_at
BEFORE UPDATE ON peoples
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();


-- Trigger on the gifts table to update the updated_at column on row updates
DROP TRIGGER IF EXISTS update_gifts_updated_at ON gifts;
CREATE TRIGGER update_gifts_updated_at
BEFORE UPDATE ON gifts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();