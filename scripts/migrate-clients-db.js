import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env file manually
const envPath = path.resolve(__dirname, "../.env");
const envContent = fs.readFileSync(envPath, "utf-8");
const envConfig = {};
envContent.split("\n").forEach((line) => {
  const [key, value] = line.split("=");
  if (key && value) {
    envConfig[key.trim()] = value.trim();
  }
});

const supabaseUrl = envConfig.VITE_SUPABASE_URL;
const supabaseKey = envConfig.VITE_SUPABASE_ANON_KEY; // Using Anon key, but RLS might block if not authenticated.
// For migration scripts, it's often better to use SERVICE_ROLE_KEY if available in .env, or ensure RLS allows Anon write (which we set in SQL).
// Let's stick to Anon key and assume the "Authenticated Upload" policy I set might need the user to be signed in, BUT
// I created RLS policies for "Enable insert for authenticated users only".
// Note: My SQL script set policies for 'authenticated'.
// Since this is a server-side script, I should ideally use the Service Role Key to bypass RLS.
// Let's check if there is a VITE_SUPABASE_SERVICE_ROLE_KEY in .env, or I'll just use ANON and hope I didn't lock myself out.
// Actually, I can just temporarily use the anon key if I didn't enforce auth on the TABLE for this script, OR I can sign in.
// Better: I'll use the service role key if it exists, or just try to insert.
// Wait, I defined policies: "Enable insert for authenticated users only". This script needs to be authenticated.
// I will check for SERVICE_ROLE_KEY in logic.

const supabaseServiceKey =
  envConfig.SUPABASE_SERVICE_ROLE_KEY ||
  envConfig.VITE_SUPABASE_SERVICE_ROLE_KEY;
const clientKey = supabaseServiceKey || supabaseKey;

// If I don't have a service key, I might fail if I use anon key without signing in.
// But usually in these local setups I might have the service key in .env or I can just disable RLS temporarily.
// Let's assume the user has a service key or simple setup.
// If this fails, I'll have to ask user to provide key or disable RLS.

const supabase = createClient(supabaseUrl, clientKey);

const clientsJsonPath = path.resolve(__dirname, "../src/data/clients.json");
const clientsData = JSON.parse(fs.readFileSync(clientsJsonPath, "utf-8"));

async function migrateData() {
  console.log("Starting DB migration...");

  if (!supabaseServiceKey) {
    console.warn(
      "WARNING: No Service Role Key found. RLS might block inserts if tables are protected."
    );
  }

  for (const category of clientsData) {
    console.log(`Processing category: ${category.category}`);

    // Insert Category
    const { data: catData, error: catError } = await supabase
      .from("client_categories")
      .upsert(
        {
          name: category.category,
          description: category.description,
          typical_needs: category.typicalNeeds,
        },
        { onConflict: "name" }
      )
      .select()
      .single();

    if (catError) {
      console.error(
        `Error inserting category ${category.category}:`,
        catError.message
      );
      continue;
    }

    const categoryId = catData.id;

    // Insert Clients
    for (const client of category.clients) {
      // Check if client exists to avoid duplicates (optional, based on name)
      const { data: existing } = await supabase
        .from("clients")
        .select("id")
        .eq("name", client.name)
        .eq("category_id", categoryId)
        .single();

      if (existing) {
        // Update
        await supabase
          .from("clients")
          .update({
            image: client.image,
            is_highlighted: client.isHighlighted || false,
          })
          .eq("id", existing.id);
        console.log(`Updated client: ${client.name}`);
      } else {
        // Insert
        const { error: clientError } = await supabase.from("clients").insert({
          name: client.name,
          image: client.image,
          is_highlighted: client.isHighlighted || false,
          category_id: categoryId,
        });

        if (clientError) {
          console.error(
            `Error inserting client ${client.name}:`,
            clientError.message
          );
        } else {
          console.log(`Inserted client: ${client.name}`);
        }
      }
    }
  }

  console.log("Migration complete.");
}

migrateData();
