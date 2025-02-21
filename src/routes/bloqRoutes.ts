import { Router } from "express";
import {
  createBloq,
  getAllBloqs,
  getBloqByID,
  updateBloq,
  deleteBloq,
} from "../controllers/bloqController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createBloqSchema,
  updateBloqSchema,
  getBloqSchema,
} from "../middleware/bloqValidateSchema.js";

const router = Router();

// Create new bloq with title and address
router.post("/", validateRequest(createBloqSchema), createBloq);

// Get bloq by ID
router.get("/:id", validateRequest(getBloqSchema), getBloqByID);

// Update bloq title/address
router.put("/:id", validateRequest(updateBloqSchema), updateBloq);

// Delete bloq by ID
router.delete("/:id", validateRequest(getBloqSchema), deleteBloq);

// Get all bloqs
router.get("/", getAllBloqs);

// Add locker to bloq

export default router;
