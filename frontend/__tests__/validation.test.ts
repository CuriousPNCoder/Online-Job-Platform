import { jobSchema, registerSchema } from "@/lib/validation/schemas";

describe("validation schemas", () => {
  it("rejects short password", () => {
    const result = registerSchema.safeParse({
      name: "A",
      email: "test@example.com",
      password: "123",
      role: "jobseeker"
    });

    expect(result.success).toBe(false);
  });

  it("requires mandatory job fields", () => {
    const result = jobSchema.safeParse({
      title: "",
      description: "short",
      skillsRequired: "",
      location: "",
      salaryMin: 0,
      salaryMax: 0,
      category: "",
      jobType: ""
    });

    expect(result.success).toBe(false);
  });
});
