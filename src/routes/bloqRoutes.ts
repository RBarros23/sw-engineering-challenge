import { Router } from "express";
import { BloqController } from "../controllers/bloqController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createBloqSchema,
  updateBloqSchema,
  getBloqSchema,
  addLockerToBloqSchema,
} from "../middleware/bloqValidateSchema.js";

const router = Router();
const bloqController = new BloqController();

// Create new bloq with title and address
router.post(
  "/",
  validateRequest(createBloqSchema),
  bloqController.createBloq.bind(bloqController)
);

// Get bloq by ID
router.get(
  "/:id",
  validateRequest(getBloqSchema),
  bloqController.getBloqById.bind(bloqController)
);

// Update bloq title/address
router.put(
  "/:id",
  validateRequest(updateBloqSchema),
  bloqController.updateBloq.bind(bloqController)
);

// Delete bloq by ID
router.delete(
  "/:id",
  validateRequest(getBloqSchema),
  bloqController.deleteBloq.bind(bloqController)
);

// Get all bloqs
router.get("/", bloqController.getAllBloqs.bind(bloqController));

// Add locker to bloq
router.post(
  "/:id/lockers",
  validateRequest(addLockerToBloqSchema),
  bloqController.addLockerToBloq.bind(bloqController)
);
export default router;
