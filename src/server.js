import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./authRoutes/authRoutes.js";

// Create an array of objects to store the user accounts info
export const userAccounts = [];

// Create the app
const app = express();

// Set env variable for production or fallback locally
const PORT = process.env.PORT || 6001;

// Get the absolute path of file
const __filename = fileURLToPath(import.meta.url);

// Get the directory
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
// Serve static CSS files
app.use(express.static(path.join(__dirname, "../public")));

// Serve up the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/sign-up", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "sign-up.html"));
});

app.use("/auth", authRoutes);

// Listen for request
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
