import express, { Request, Response } from "express";
import lockerRoutes from "./routes/lockerRoutes.js";
import rentRoutes from "./routes/rentRoutes.js";
import { prisma } from "./utils/prisma/prisma.js";
import { BloqService } from "./services/bloqService.js";
import { BloqController } from "./controllers/bloqController.js";
import { createBloqRouter } from "./routes/bloqRoutes.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const bloqService = new BloqService(prisma);
const bloqController = new BloqController(bloqService);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from docker!");
});

app.use("/api/bloqs", createBloqRouter(bloqController));
app.use("/api/lockers", lockerRoutes);
app.use("/api/rents", rentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
