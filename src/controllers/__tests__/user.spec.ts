import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { Server } from "../../server";

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

      expect(typeof response.body).toEqual("array");
    });
  });
});
