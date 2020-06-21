import faker from "faker";
import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { Server } from "../../server";
import { UserSchema } from "../../models/user";

describe("Rest", () => {
  // bootstrap your Server to load all endpoints before run your test
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeAll(PlatformTest.bootstrap(Server));
  beforeAll(() => {
    request = SuperTest(PlatformTest.callback());
  });
  afterAll(PlatformTest.reset);

  describe("GET /v1/user", () => {
    it("should return an array", async () => {
      const response = await request.get("/v1/user").expect(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("POST /v1/user", () => {
    it("should create a new user", async () => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email();
      const payload: Partial<UserSchema> = {
        firstName,
        lastName,
        email,
      };

      const response = await request.post("/v1/user").send(payload).expect(200);
      // query the users to see if the email exists
      expect(response.body.firstName).toEqual(firstName);
      expect(response.body.lastName).toEqual(lastName);
      expect(response.body.email).toEqual(email);
    });

    it("should not allow duplicate email IDs", async () => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email();
      const payload: Partial<UserSchema> = {
        firstName,
        lastName,
        email,
      };

      await request.post("/v1/user").send(payload).expect(200);

      const newPayload = {
        ...payload,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      };

      await request.post("/v1/user").send(newPayload).expect(400);
    });
  });
});
