import { canAccessRole, getRoleRedirect } from "@/lib/rbac";

describe("rbac helpers", () => {
  it("allows matching role", () => {
    expect(canAccessRole(["admin"], "admin")).toBe(true);
  });

  it("rejects non-matching role", () => {
    expect(canAccessRole(["admin"], "jobseeker")).toBe(false);
  });

  it("returns role home", () => {
    expect(getRoleRedirect("recruiter")).toBe("/recruiter/dashboard");
  });
});
