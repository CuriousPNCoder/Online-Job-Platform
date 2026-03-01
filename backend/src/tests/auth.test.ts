import request from "supertest";
import app from "../app";

describe("Auth APIs", () => {
  it("registers and logs in a jobseeker", async () => {
    const registerRes = await request(app).post("/auth/register").send({
      name: "Alice",
      email: "alice@example.com",
      password: "Password123",
      role: "jobseeker"
    });

    expect(registerRes.status).toBe(201);
    expect(registerRes.body.success).toBe(true);
    expect(registerRes.body.token).toBeDefined();

    const loginRes = await request(app).post("/auth/login").send({
      email: "alice@example.com",
      password: "Password123"
    });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.success).toBe(true);
    expect(loginRes.body.token).toBeDefined();
  });
});
