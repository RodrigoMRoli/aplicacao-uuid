import type { ApiError } from "#/errors/api-error.js";
import { NextFunction, Request, Response } from "express";

export function errorHandler(
	err: Error | ApiError,
	req: Request,
	res: Response,
	next: NextFunction
) {
	const statusCode = (err as ApiError).statusCode || 500;
	res.status(statusCode).json({
		message: err.message || "Internal Server Error",
	});
}
