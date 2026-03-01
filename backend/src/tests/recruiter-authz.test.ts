import request from "supertest";
import app from "../app";

const registerAndGetToken = async (payload: {
  name: string;
  email: string;
  password: string;
  role: "jobseeker" | "recruiter";
}): Promise<string> => {
  const res = await request(app).post("/auth/register").send(payload);
  return res.body.token as string;
};

describe("Recruiter authorization", () => {
  it("blocks recruiter from editing another recruiter's job", async () => {
    const recruiterOneToken = await registerAndGetToken({
      name: "Recruiter One",
      email: "r1@example.com",
      password: "Password123",
      role: "recruiter"
    });

    const recruiterTwoToken = await registerAndGetToken({
      name: "Recruiter Two",
      email: "r2@example.com",
      password: "Password123",
      role: "recruiter"
    });

    const createJobRes = await request(app)
      .post("/recruiter/jobs")
      .set("Authorization", `Bearer ${recruiterOneToken}`)
      .send({
        title: "QA Engineer",
        description: "Testing APIs and automation flows in CI/CD.",
        skillsRequired: ["Testing", "Postman"],
        location: "Bangalore",
        salaryRange: { min: 40000, max: 70000, currency: "USD" },
        category: "QA",
        jobType: "Full-time"
      });

    const jobId = createJobRes.body.data._id as string;

    const updateRes = await request(app)
      .put(`/recruiter/jobs/${jobId}`)
      .set("Authorization", `Bearer ${recruiterTwoToken}`)
      .send({ title: "Updated title" });

    expect(updateRes.status).toBe(403);
    expect(updateRes.body.errorCode).toBe("JOB_OWNERSHIP_ERROR");
  });
});
