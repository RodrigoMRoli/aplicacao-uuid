import Logger from "#/utils/logger.js";
import type { Request } from "express";

class AccessLog {
	static log = (req: Request) => {
		const logMessage = `[${new Date().toLocaleString()}] - [IP - ${
			req.ip
		}] - HTTP/${req.httpVersion} - ${req.method} - ${req.path}`;
		Logger.log("access", logMessage);
	};
}

export default AccessLog;
