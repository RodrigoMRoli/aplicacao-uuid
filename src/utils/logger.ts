import assert from "assert";
import { existsSync, mkdirSync, writeFileSync, appendFileSync } from "fs";
import path from "path";

export default class Logger {
	static _filename: string = "app";
	static _extension: string = "log";
	static _path: string = "logs";
	static _fullPath: string = "";
	static setFilename = (filename: string) => {
		this._filename = filename;
	};
	static setExtension = (extension: string) => {
		this._extension = extension;
	};
	static assertPath = (filename: string | null) => {
		const pathName = this._path;
		filename = `${filename ? filename : this._filename}.${this._extension}`;
		if (!existsSync(pathName)) {
			mkdirSync(pathName, { recursive: true });
		}

		const fullPath = path.resolve(path.join(pathName, filename));
		this._fullPath = fullPath;

		if (!existsSync(fullPath)) {
			writeFileSync(fullPath, "");
		}
	};
	static inlineMessage = (message: string) => {
		return message + "\n";
	};
	static log = (filename: string | null = null, message: string) => {
		try {
			this.assertPath(filename);
			appendFileSync(this._fullPath, this.inlineMessage(message));
		} catch (err) {
			assert(err instanceof Error);
			console.log("Error writing to log file:", err);
		}
	};
}
