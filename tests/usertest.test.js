const request = require("supertest");

const req = request("https://cometcontacts4331.com");


// THESE 4 ARE API TESTS

describe("GET /api/user", () => {
  it("should respond with 401 for unauthorized requests", async () => {
    const res = await req.get("/api/user");
    expect(res.statusCode).toBe(401);
    expect(res.body).toBeDefined();
    // Optionally, check for expected properties in the response
    // expect(res.body).toHaveProperty('username');
  });
});

let userToken = "";
describe("POST /api/login", () => {
  it("should login and return user information", async () => {
    const res = await req.post("/api/login").send({
      username: "trevordemo",
      password: "password"
    });
    expect(res.statusCode).toBe(200);
    // expect 'token' to be in res.body
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    userToken = res.body.token; // Store the token for later use
   });
});

describe("GET /api/user with token", () => {
  it("should respond with user information when authenticated", async () => {
    const res = await req.get("/api/user").set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    // Optionally, check for expected properties in the response
    expect(res.body).toHaveProperty("user");
  });
});

describe("GET /api/goals/all with token", () => {
  it("should respond with all goals belonging to authenticated user", async () => {
    const res = await req
      .get("/api/goals/all")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    // Optionally, check for expected properties in the response
    expect(res.body).toHaveProperty("goals");
  });
});


// LUKE'S EXTRA TESTS, ATTEMPT WAS MADE...

describe("GET /api/metrics/screentime with token", () => {
  it("should respond with screen time data", async () => {
    const res = await req
      .get("/api/metrics/screentime")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("screentime");
  });
});

describe("GET /api/metrics/weeklygoals with token", () => {
  it("should respond with weekly goals data", async () => {
    const res = await req
      .get("/api/metrics/weeklygoals")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("weeklyGoals");
  });
});
