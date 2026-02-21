import express from "express";
import path from "node:path";
import router from "./routes/routes.mjs";
import AppError from "./utilities/appError.mjs";
import globalErrorHandle from "./middleware/errorMiddleware.mjs";
import cors from "cors";

const __dirname = import.meta.dirname;
const app = express();
const PORT = 7001;

// ==========================================
// 1. GLOBAL MIDDLEWARES (The Pre-Processors)
// ==========================================

app.use(cors()); 

// [DEBUG LOGGER]: Moved to top. 
// If placed at the bottom, it won't log successful requests!
app.use((req, res, next) => {
  console.log(`[DEBUG] ${req.method} request to: ${req.url}`);
  next();
});

// JSON Parser: Converts raw request bodies into JS objects (req.body)
app.use(express.json());

// Static Files: Serves your frontend build (CSS, JS, Images)
const filePath = path.join(__dirname, "../client/project");
app.use(express.static(filePath));

// ==========================================
// 2. PRIMARY ROUTES (The Logic)
// ==========================================

app.use("/api", router);

// ==========================================
// 3. FALLBACKS & ERROR HANDLING (The Safety Nets)
// ==========================================

/**
 * [API 404 HANDLER]: 
 * If a request starts with /api but doesn't match any route in your 'router',
 * this creates a 404 AppError and "teleports" it to the Global Error Handler.
 */
app.use("/api", (req, res, next) => {
  next(new AppError(`API Endpoint ${req.originalUrl} not found`, 404));
});

/**
 * [SPA Fallback]: 
 * For any non-API request (like /inventory or /dashboard), serve index.html.
 * This allows React Router to handle the page navigation without the server 
 * thinking the page is missing.
 */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/project/index.html"));
});

/**
 * [GLOBAL ERROR HOSPITAL]:
 * The final destination for all errors. Whether it's a 404 from above,
 * a Zod validation fail, or a database crash, it all ends up here.
 */
app.use(globalErrorHandle);

// ==========================================
// 4. SERVER START
// ==========================================

app.listen(PORT, () => {
  console.log(`🚀 Server active at: http://localhost:${PORT}`);
});