// config/supabase.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL; // Add Supabase URL in .env
const supabaseKey = process.env.SUPABASE_KEY; // Add Supabase Key in .env

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
