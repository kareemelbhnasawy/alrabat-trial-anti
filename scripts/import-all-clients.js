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

// Define mapping from directory to formatted Category Name
const dirMapping = [
  { path: path.join(assetsBase, "Clients"), category: "Developers" },
  {
    path: path.join(assetsBase, "Partners/Consultant"),
    category: "Consultants",
  },
  {
    path: path.join(assetsBase, "Partners/Contractor"),
    category: "Contractors",
  },
  { path: path.join(assetsBase, "Partners"), category: "Strategic Partners" }, // Fallback for root partners
];

// Helper to clean name
const cleanName = (filename) => {
  const name = path.parse(filename).name;
  return name
    .replace(/logo/gi, "")
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\.webp|\.png|\.jpg|\.jpeg/gi, "")
    .trim();
};

async function importClients() {
  console.log("Starting full client import...");

  // Load existing data
  let clientsData = JSON.parse(fs.readFileSync(clientsJsonPath, "utf-8"));

  // Helper to find or create category
  const getCategory = (catName) => {
    let cat = clientsData.find((c) => c.category === catName);
    if (!cat) {
      cat = {
        category: catName,
        description: `Our valued ${catName.toLowerCase()} partners.`,
        typicalNeeds: [],
        clients: [],
      };
      clientsData.push(cat);
    }
    return cat;
  };

  // Helper to check if client exists in ANY category
  const findClientAnywhere = (name) => {
    for (const cat of clientsData) {
      const found = cat.clients.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );
      if (found) return found;
    }
    return null;
  };

  for (const { path: dirPath, category } of dirMapping) {
    if (!fs.existsSync(dirPath)) continue;

    console.log(`Processing ${category} from ${dirPath}...`);
    const files = fs
      .readdirSync(dirPath)
      .filter(
        (f) =>
          !f.startsWith(".") &&
          !fs.statSync(path.join(dirPath, f)).isDirectory()
      );

    for (const file of files) {
      const clientName = cleanName(file);
      const filePath = path.join(dirPath, file);
      const fileBuffer = fs.readFileSync(filePath);
      const storagePath = `clients/${category.toLowerCase().replace(/\s/g, "-")}/${file}`; // Organized storage

      // Upload
      const { error } = await supabase.storage
        .from("media")
        .upload(storagePath, fileBuffer, {
          contentType: "image/auto",
          upsert: true,
        });

      if (error) {
        console.error(`Error uploading ${clientName}:`, error.message);
        continue;
      }

      const { data } = supabase.storage.from("media").getPublicUrl(storagePath);
      const publicUrl = data.publicUrl;

      // Update Data
      const existingClient = findClientAnywhere(clientName);

      if (existingClient) {
        // Update existing image
        existingClient.image = publicUrl;
        console.log(`Updated existing: ${clientName}`);
      } else {
        // Add new to the specific category
        // Note: files in "Partners" root might duplicate files in specific subfolders.
        // But since we process specific subfolders first (if order is correct), we might want to check order.
        // Actually, "Partners" root is last in our list. So if we find it there, and it wasn't in specific folders, we add it to Strategic Partners.

        const targetCat = getCategory(category);

        // Double check not to add if it was added in a previous loop iteration (e.g. Clients having same name as Partners)
        if (!findClientAnywhere(clientName)) {
          targetCat.clients.push({
            name: clientName,
            isHighlighted: false,
            image: publicUrl,
          });
          console.log(`Added new to ${category}: ${clientName}`);
        } else {
          console.log(`Skipped duplicate in ${category}: ${clientName}`);
        }
      }
    }
  }

  // Remove "Strategic Partners" if empty or move strictly distinct ones
  // Optional cleanup

  fs.writeFileSync(clientsJsonPath, JSON.stringify(clientsData, null, 4));
  console.log("Import complete.");
}

importClients();
