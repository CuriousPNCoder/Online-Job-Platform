import { Router } from "express";
import { patchApplicationStatus } from "../controllers/applications.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/rbac.middleware";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { updateApplicationStatusSchema } from "../validators/applications.validators";

const router = Router();

router.patch(
  "/:id/status",
  authenticate,
  allowRoles("recruiter", "admin"),
  validate(updateApplicationStatusSchema),
  asyncHandler(patchApplicationStatus)
);

export default router;
