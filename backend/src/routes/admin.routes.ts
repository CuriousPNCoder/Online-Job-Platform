import { Router } from "express";
import { deleteJobById, disableUserById, getJobs, getSummary, getUsers } from "../controllers/admin.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/rbac.middleware";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { adminIdParamSchema, adminJobsQuerySchema, adminUsersQuerySchema } from "../validators/admin.validators";

const router = Router();

router.use(authenticate, allowRoles("admin"));

router.get("/users", validate(adminUsersQuerySchema), asyncHandler(getUsers));
router.patch("/users/:id/disable", validate(adminIdParamSchema), asyncHandler(disableUserById));
router.get("/jobs", validate(adminJobsQuerySchema), asyncHandler(getJobs));
router.delete("/jobs/:id", validate(adminIdParamSchema), asyncHandler(deleteJobById));
router.get("/reports/summary", asyncHandler(getSummary));

export default router;
