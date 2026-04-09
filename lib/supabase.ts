import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cxnfwcnmbmysabunnjrf.supabase.co";
const supabaseAnonKey = "sb_publishable_wwbxQ68cii-LAZYTl7sehQ_EWn5ch";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);