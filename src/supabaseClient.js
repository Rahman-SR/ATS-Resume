import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and Key from environment variables (recommended for production)
// Fallback to the hardcoded values for local development if env vars are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vnmwqrdjqfphzfupagvk.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZubXdxcmRqcWZwaHpmdXBhZ3ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNzAyNzcsImV4cCI6MjA5ODY0NjI3N30.-kPRVwnoBTYSJdcSZRX9drTzQt-QkXf_QnxyP66IvZc';

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
