import Logger from "#/utils/logger.js";
import AccessLog from "#/utils/loggers/access-log.js";
import { Request, Response, NextFunction } from "express";

export default function requestLogger(
	req: Request,
	res: Response,
	next: NextFunction
) {
	AccessLog.log(req)
	next();
}
