// import dotenv from "dotenv";
// import { sign } from "jsonwebtoken";
// import getDb from "../src/helpers/getDb";
// import { expect } from "./helper";
// import stripBearerToken from "../src/helpers/stripBearerToken";

// dotenv.config();
// describe("Get Database Function", () => {
//   it("should get database for test", (done) => {
//     const db = getDb("test");
//     expect(db).to.equal("mongodb://localhost/brightly-test");
//     done();
//   });
//   it("should get database for development", (done) => {
//     const db = getDb("development");
//     expect(db).to.equal("mongodb://localhost/brightly-dev");
//     done();
//   });
//   it("should get database for production", (done) => {
//     const db = getDb("production");
//     expect(db).to.equal("mongodb://localhost/brightly");
//     done();
//   });
//   it("should get throw error if nothing is supplied", (done) => {
//     // const db = getDb("nothing");
//     expect(() => getDb("nothing")).to.throw("wrong env");
//     done();
//   });
// });
// describe("StripBearerToken Function", () => {
//   it("should get token without bearer", (done) => {
//     const inToken = sign(
//       {
//         // eslint-disable-next-line no-underscore-dangle
//         _id: "5fa996a0ec9008047ccaa1bd",
//         isAdmin: false,
//       },
//       process.env.SEC_KEY,
//       { expiresIn: "24h" }
//     );
//     const token = stripBearerToken(inToken);
//     expect(token).to.be.a("string");
//     done();
//   });
// });
