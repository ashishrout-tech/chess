import { Request, Response, Router } from "express";

const router: Router = Router();

router.get('/get', (req: Request, res: Response) => {
    res.status(200).json({message: "Connected to get method"})
})

export default router;