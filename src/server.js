import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { authMiddleware } from "./middleware/authMiddleware.js";
import authRoutes from "./authRoutes/authRoutes.js";
import accountRoutes from "./accountRoutes/accountRoutes.js";
import settingsRoutes from "./settingsRoutes/settingsRoutes.js";

// Create the app
const app = express();

// Set env variable for production or fallback locally
const PORT = process.env.PORT || 6001;

// Get the absolute path of file
const __filename = fileURLToPath(import.meta.url);

// Get the directory
const __dirname = dirname(__filename);

// Middleware
// This line tells Express to use the middleware that unpacks incoming JSON strings
app.use(express.json());
// Serve static CSS files
app.use(express.static(path.join(__dirname, "..", "public")));

// Serve up the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "landpage.html"));
});

app.get("/sign-up", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "sign-up.html"));
});

app.get("/app", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "app.html"));
});

app.use("/auth", authRoutes);

app.use("/account", authMiddleware, accountRoutes);

app.use("/settings", authMiddleware, settingsRoutes);

// Listen for request
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
