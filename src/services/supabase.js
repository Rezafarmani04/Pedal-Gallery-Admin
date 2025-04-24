import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://jkipfrcmwfxonodasykn.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpraXBmcmNtd2Z4b25vZGFzeWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTIzOTUsImV4cCI6MjA1NzI4ODM5NX0.pm85y5aIK9_GzgkUU0h63oSXJpHZwqgGM4V_aUV4Rac';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
