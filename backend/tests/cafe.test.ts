import request from "supertest";
import app from "../src/app.js";
import { pool, query } from "../src/config/db.js";


const seedCafe = async () => {
  const payload = {
    name: "Brewlabs",
    description:
      "A place to experience the best coffee has to offer in ireland",
    latitude: "53.33824631274385",
    longitude: "-6.265785753638034",
  };

  return await request(app).post("/v1/cafes").send(payload);
}

afterAll(async () => {
  await pool.end();
});

beforeEach(async () => {
  await query("TRUNCATE TABLE cafes RESTART IDENTITY CASCADE");
});

describe("POST /api/cafes", () => {
  it("Validates input via Zod and create a new cafe", async () => {
    const payload = {
      name: "Brewlabs",
      description:
        "A place to experience the best coffee has to offer in ireland",
      latitude: "53.33824631274385",
      longitude: "-6.265785753638034",
    };

    const response = await request(app).post("/v1/cafes").send(payload);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Cafe added to database");
  });

  it("Fails validation and return 400 if properties are missing", async () => {
    const badPayload = { name: "" };

    const response = await request(app)
      .post("/v1/cafes")
      .send(badPayload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toBe("fail");
  });
});

describe("PATCH /api/cafes", () => {
  it("Updates previously seeded cafe", async () => {

    await seedCafe()

    const body = {
      name: "Brewlabs",
      description: "An amazing place to experience the best coffee has to offer in ireland",
      latitude: "53.33824631274385",
      longitude: "-6.265785753638034"
    }
    const response = await request(app).patch('/v1/cafes/1').send(body)

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Succesfully updated cafe");
  })
})

describe("GET /api/cafes", () => {

  it("Returns a list of cafes", async () => {
    await seedCafe()

    const response = await request(app).get("/v1/cafes")
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.status).toBe("success");
    expect(response.body.data).toStrictEqual([{
      id: 1,
      name: "brewlabs",
      description:
        "A place to experience the best coffee has to offer in ireland",
      latitude: 53.33824631274385,
      longitude: -6.265785753638034,
    }])
  })
}
)


describe("DELETE /api/cafes", () => {

  it("Removes previously seeded cafe", async () => {
    await seedCafe()

    let response = await request(app).delete("/v1/cafes/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Cafe deleted from database")

    response = await request(app).get("/v1/cafes")
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.status).toBe("success");
    expect(response.body.data).toStrictEqual([])
  })
})

