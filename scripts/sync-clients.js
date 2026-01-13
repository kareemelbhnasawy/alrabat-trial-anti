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
const supabaseKey = envConfig.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const assetsBase = path.resolve(__dirname, "../assets/ClientsR01");
const clientsJsonPath = path.resolve(__dirname, "../src/data/clients.json");

// Define directories to scan
const dirsToScan = [
  path.join(assetsBase, "Clients"),
  path.join(assetsBase, "Partners"),
  path.join(assetsBase, "Partners/Consultant"),
  path.join(assetsBase, "Partners/Contractor"),
];

// Helper to normalize strings for matching
const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/logo/g, "")
    .replace(/[^a-z0-9]/g, "");

async function syncClients() {
  console.log("Scanning client assets...");
  const imageMap = new Map(); // normalizedName -> publicUrl

  for (const dir of dirsToScan) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => !f.startsWith("."));
    for (const file of files) {
      if (fs.statSync(path.join(dir, file)).isDirectory()) continue;

      const filePath = path.join(dir, file);
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = `clients/${file}`; // Flattening structure for simplicity

      // Upload
      const { error } = await supabase.storage
        .from("media")
        .upload(fileName, fileBuffer, {
          contentType: "image/auto",
          upsert: true,
        });

      if (error) {
        console.error(`Failed to upload ${file}:`, error.message);
        continue;
      }

      const { data } = supabase.storage.from("media").getPublicUrl(fileName);
      const publicUrl = data.publicUrl;

      // Store in map
      const normName = normalize(path.parse(file).name);
      imageMap.set(normName, publicUrl);
      console.log(`Uploaded & Mapped: ${file} -> ${normName}`);
    }
  }

  // Update JSON
  console.log("Updating clients.json...");
  const clientsData = JSON.parse(fs.readFileSync(clientsJsonPath, "utf-8"));

  let updatedCount = 0;
  const updateClient = (client) => {
    const normName = normalize(client.name);
    // Try exact match
    if (imageMap.has(normName)) {
      client.image = imageMap.get(normName);
      updatedCount++;
      return;
    }

    // Try finding a file that includes the client name
    for (const [key, url] of imageMap.entries()) {
      if (key.includes(normName) || normName.includes(key)) {
        client.image = url;
        updatedCount++;
        return;
      }
    }
  };

  clientsData.forEach((category) => {
    category.clients.forEach(updateClient);
  });

  fs.writeFileSync(clientsJsonPath, JSON.stringify(clientsData, null, 4));
  console.log(`Updated ${updatedCount} clients with images.`);
}

syncClients();
