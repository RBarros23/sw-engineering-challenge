import { Router } from "express";
import {
  createBloq,
  getAllBloqs,
  getBloqByID,
  updateBloq,
  deleteBloq,
} from "../controllers/bloqController.js";
import {
  validateRequest,
  createBloqSchema,
  updateBloqSchema,
  getBloqSchema,
} from "../middleware/validateRequest.js";

const router = Router();

router.post("/", validateRequest(createBloqSchema), createBloq);
router.get("/:id", validateRequest(getBloqSchema), getBloqByID);
router.put("/:id", validateRequest(updateBloqSchema), updateBloq);
router.delete("/:id", validateRequest(getBloqSchema), deleteBloq);
router.get("/", getAllBloqs);

export default router;
