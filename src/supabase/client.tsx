import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://vexjatvegsecwozgrgzp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleGphdHZlZ3NlY3dvemdyZ3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMzg0OTYsImV4cCI6MjA0ODkxNDQ5Nn0.JJuTaue9IJBqfVnv9iG3GFOhCBdFBFDK0fbjSlZZyrI"
);
