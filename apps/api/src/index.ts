import express, { Application, Request, Response } from "express";
import http from "http";
import cors from "cors";
import apiRoutes from "./routes/route";

const port = 8080;

const app: Application = express();

app.use(cors({
    credentials: true,
}))


app.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: "Welcome"})
})

app.use('/api', apiRoutes);


const server = http.createServer(app);

server.listen(port, () => {
    console.log(`- ready started API on 0.0.0.0:${port}, url: http://localhost:${port}`)
})