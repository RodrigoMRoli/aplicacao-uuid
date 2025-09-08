import { Router } from "express";

const healthRoutes = Router();
healthRoutes.get("/", (req, res) => {
	const message = "100% Working";
	res.status(200).json({
		message,
	});
});

export default healthRoutes;
