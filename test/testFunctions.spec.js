import dotenv from "dotenv";
import getDb from "../src/helpers/getDb";
import { expect } from "./helper";

dotenv.config();
describe("Get Database Function", () => {
  it("should get database for test", (done) => {
    const db = getDb("test");
    expect(db).to.equal("mongodb://localhost/brightly-test");
    done();
  });
  it("should get database for development", (done) => {
    const db = getDb("development");
    expect(db).to.equal("mongodb://localhost/brightly-dev");
    done();
  });
  it("should get database for production", (done) => {
    const db = getDb("production");
    expect(db).to.equal("mongodb://localhost/brightly");
    done();
  });
  it("should get throw error if nothing is supplied", (done) => {
    // const db = getDb("nothing");
    expect(() => getDb("nothing")).to.throw("wrong env");
    done();
  });
});
