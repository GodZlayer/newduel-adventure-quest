
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ouqwotdzypxiarmpeqhn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91cXdvdGR6eXB4aWFybXBlcWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0ODA1NzEsImV4cCI6MjA1ODA1NjU3MX0.TYyeSFzWcXaEJCxCFkZ2fBn3LV3TpBakaS3QSHCU3aU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
