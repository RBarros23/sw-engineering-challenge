import express, { Request, Response } from "express";
import bloqRoutes from "./routes/bloqRoutes.js";
import lockerRoutes from "./routes/lockerRoutes.js";
import rentRoutes from "./routes/rentRoutes.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from docker!");
});

app.use("/api/bloqs", bloqRoutes);
app.use("/api/lockers", lockerRoutes);
app.use("/api/rents", rentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
