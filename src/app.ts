import path from "path";
import express from "express";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import requestLogger from "#/middlewares/logger.js";
import { errorHandler } from "#/middlewares/error-handler.js";
import healthRoutes from "#/routes/health.js";
import { ApiError } from "#/errors/api-error.js";

import "#/scripts/prototypes";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __rootdir = path.join(__dirname, "..");

if (process.env.NODE_ENV === "production") {
	config({ path: path.resolve(__rootdir, ".env.prod"), quiet: true });
} else if (process.env.NODE_ENV === "development") {
	config({ path: path.resolve(__rootdir, ".env.dev"), quiet: true });
} else {
	throw new Error(
		"NODE_ENV is not set or is invalid. Please check your environment configuration."
	);
}

const port = 3000;

app.listen(port, () => {
	console.log(`Server running on app port ${port}`);
}).on("error", (error) => {
	console.error(`LocalApp Server Error: ${error.message}`);
});

app.use(requestLogger);

app.use("/health", healthRoutes);
app.use("/users", () => {});
app.use("/posts", () => {});

app.use(errorHandler);
