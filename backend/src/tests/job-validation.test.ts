import request from "supertest";
import app from "../app";

const registerRecruiter = async (): Promise<string> => {
  const registerRes = await request(app).post("/auth/register").send({
    name: "Recruiter",
    email: "rec@example.com",
    password: "Password123",
    role: "recruiter"
  });
  return registerRes.body.token as string;
};

describe("Recruiter job validation", () => {
  it("blocks invalid job payload", async () => {
    const token = await registerRecruiter();

    const res = await request(app)
      .post("/recruiter/jobs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "short",
        skillsRequired: [],
        location: "NY",
        salaryRange: { min: 50000, max: 70000, currency: "USD" },
        category: "IT",
        jobType: "Full-time"
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
