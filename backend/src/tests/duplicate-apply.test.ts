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

describe("Duplicate job application", () => {
  it("prevents applying twice to same job", async () => {
    const recruiterToken = await registerAndGetToken({
      name: "Recruiter A",
      email: "ra@example.com",
      password: "Password123",
      role: "recruiter"
    });

    const createJobRes = await request(app)
      .post("/recruiter/jobs")
      .set("Authorization", `Bearer ${recruiterToken}`)
      .send({
        title: "Node Developer",
        description: "Need strong backend skills and API development.",
        skillsRequired: ["Node.js", "MongoDB"],
        location: "Remote",
        salaryRange: { min: 50000, max: 80000, currency: "USD" },
        category: "Engineering",
        jobType: "Full-time"
      });

    const jobId = createJobRes.body.data._id as string;
    const seekerToken = await registerAndGetToken({
      name: "Seeker A",
      email: "sa@example.com",
      password: "Password123",
      role: "jobseeker"
    });

    const firstApply = await request(app)
      .post(`/jobs/${jobId}/apply`)
      .set("Authorization", `Bearer ${seekerToken}`);

    const secondApply = await request(app)
      .post(`/jobs/${jobId}/apply`)
      .set("Authorization", `Bearer ${seekerToken}`);

    expect(firstApply.status).toBe(201);
    expect(secondApply.status).toBe(409);
    expect(secondApply.body.errorCode).toBe("DUPLICATE_APPLICATION");
  });
});
