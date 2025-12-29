
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing connection to:', supabaseUrl);

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        const { data, error } = await supabase.from('intakes').select('count', { count: 'exact', head: true });
        if (error) {
            console.error('Connection Error:', error.message);
            if (error.code === '42P01') {
                console.log('Suggestion: The table "intakes" does not exist. Please run the SQL creation script.');
            }
        } else {
            console.log('Success! Connected to "intakes" table.');
        }
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

testConnection();
