import request from "supertest";
import app from "../src/app.js";
import { pool } from "../src/config/db";

afterAll(async () => {
  await pool.end();
});

describe("POST /api/cafes/addCafe", () => {
  it("Should validate input via Zod and create a new cafe", async () => {
    const payload = {
      name: "Brewlabs",
      description:
        "A place to experience the best coffee has to offer in ireland",
      latitude: "53.33824631274385",
      longitude: "-6.265785753638034",
    };

    const response = await request(app).post("/v1/cafes/addCafe").send(payload);

    console.log(response);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Cafe added to database");
  });

  it("Should fail validation and return 400 if properties are missing", async () => {
    const badPayload = { name: "" };

    const response = await request(app)
      .post("/v1/cafes/addCafe")
      .send(badPayload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toBe("fail");
  });
});
