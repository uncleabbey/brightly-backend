import mongoose from "mongoose";
// import { sign } from "jsonwebtoken";
import { app, chai, expect, sinon } from "./helper";
import { Student, Teacher } from "../src/models";

const studentSingupUrl = "/api/v1/auth/signup/student";
const teacherSingupUrl = "/api/v1/auth/signup/teacher";
const loginUrl = "/api/v1/auth/login";

before(async () => {
  const data = {
    email: "davido@example.com",
    password: "buhariole",
    firstName: "Davido",
    lastName: "Davido",
    grade: "2",
  };
  const data2 = {
    email: "burna@example.com",
    password: "buhariole",
    firstName: "Burna",
    lastName: "Boy",
    subject: "English Language",
  };
  await chai.request(app).post(studentSingupUrl).send(data);
  await chai.request(app).post(teacherSingupUrl).send(data2);
  // validToken = res.body.data.token;
  // inToken = await sign(
  //   {
  //     // eslint-disable-next-line no-underscore-dangle
  //     _id: "5fa996a0ec9008047ccaa1bd",
  //     isAdmin: false,
  //   },
  //   process.env.SEC_KEY,
  //   { expiresIn: "24h" }
  // );
});

describe("POST /auth/signup/student", () => {
  it("Should register student with valid input", (done) => {
    const userData = {
      firstName: "adebanke",
      lastName: "adebank",
      password: "12345678",
      email: "student1@email.com",
      grade: "1",
    };
    chai
      .request(app)
      .post(studentSingupUrl)
      .set("Accept", "application/json")
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        const { status, message, data } = res.body;
        const { token, user } = data;
        expect(status).to.equal("success");
        expect(message).to.equal("student created successfully");
        expect(token).to.be.a("string");
        expect(user).to.be.an("object");
        expect(user).to.have.property("_id");
        expect(user).to.have.property("email");
        expect(user).to.have.property("firstName");
        expect(user).to.have.property("lastName");
        expect(user).to.have.property("isAdmin");
        expect(user).to.have.property("isTeacher");
        expect(user).to.have.property("grade");
        done(err);
      });
  });
  it("Should return error for invalid student input", (done) => {
    const data = {
      firstName: "",
      lastName: "adebank",
      password: "12345678",
      email: "student1@email.com",
      grade: "1",
    };
    chai
      .request(app)
      .post(studentSingupUrl)
      .set("Accept", "application/json")
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done(err);
      });
  });

  it("Should return error if student has registered before", (done) => {
    const data = {
      email: "davido@example.com",
      password: "buhariole",
      firstName: "Davido",
      lastName: "Davido",
      grade: "2",
    };
    chai
      .request(app)
      .post(studentSingupUrl)
      .set("Accept", "application/json")
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.equal("Sorry User already exist");
        done(err);
      });
  });
  it("Should return internal server error when there is a problem creating student", (done) => {
    const stub = sinon
      .stub(Student.prototype, "save")
      .callsFake(() =>
        Promise.reject(new Error("Internal server error"))
      );
    const data = {
      email: "davidopopo@example.com",
      password: "buhariole",
      firstName: "Davido",
      lastName: "Davido",
      grade: "2",
    };
    chai
      .request(app)
      .post(studentSingupUrl)
      .set("Accept", "application/json")
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        const { status } = res.body;
        expect(status).to.equal("error");
        done(err);
        stub.restore();
      });
  });
});
describe("POST /auth/signup/teacher", () => {
  it("Should register teacher with valid input", (done) => {
    const userData = {
      firstName: "adebanke",
      lastName: "adebank",
      password: "12345678",
      email: "teacher1@email.com",
      subject: "Computer education",
    };
    chai
      .request(app)
      .post(teacherSingupUrl)
      .set("Accept", "application/json")
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        const { status, message, data } = res.body;
        const { token, user } = data;
        expect(status).to.equal("success");
        expect(message).to.equal("Teacher created successfully");
        expect(token).to.be.a("string");
        expect(user).to.be.an("object");
        expect(user).to.have.property("_id");
        expect(user).to.have.property("email");
        expect(user).to.have.property("firstName");
        expect(user).to.have.property("lastName");
        expect(user).to.have.property("isAdmin");
        expect(user).to.have.property("isTeacher");
        expect(user).to.have.property("subject");
        done(err);
      });
  });
  it("Should return error for invalid teacher input", (done) => {
    const data = {
      firstName: "",
      lastName: "adebanke",
      password: "12345678",
      email: "teacher3@email.com",
      subject: "Computer education",
    };
    chai
      .request(app)
      .post(teacherSingupUrl)
      .set("Accept", "application/json")
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done(err);
      });
  });

  it("Should return error if teacher has registered before", (done) => {
    const data = {
      email: "burna@example.com",
      password: "buhariole",
      firstName: "Burna",
      lastName: "Boy",
      subject: "English Language",
    };
    chai
      .request(app)
      .post(teacherSingupUrl)
      .set("Accept", "application/json")
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.equal("Sorry User already exist");
        done(err);
      });
  });
  it("Should return internal server error when there is a problem creating teacher", (done) => {
    const stub = sinon
      .stub(Teacher.prototype, "save")
      .callsFake(() =>
        Promise.reject(new Error("Internal server error"))
      );
    const data = {
      email: "davidopopu@example.com",
      password: "buhariole",
      firstName: "Davido",
      lastName: "Davido",
      subject: "Computer education",
    };
    chai
      .request(app)
      .post(teacherSingupUrl)
      .set("Accept", "application/json")
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        const { status } = res.body;
        expect(status).to.equal("error");
        done(err);
        stub.restore();
      });
  });
});

describe("Login User Routes", () => {
  it("Login user with valid inputs", (done) => {
    const userData = {
      email: "davido@example.com",
      password: "buhariole",
    };
    chai
      .request(app)
      .post(loginUrl)
      .set("Accept", "application/json")
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        const { status, message, data } = res.body;
        const { token, user } = data;
        expect(status).to.equal("success");
        expect(message).to.equal("login was successful");
        expect(token).to.be.a("string");
        expect(user).to.be.an("object");
        expect(user).to.have.property("_id");
        expect(user).to.have.property("email");
        expect(user).to.have.property("firstName");
        expect(user).to.have.property("lastName");
        expect(user).to.have.property("isAdmin");
        expect(user).to.have.property("isTeacher");
        done();
      });
  });
  it("should return error for invalid password", (done) => {
    const data = {
      email: "davido@example.com",
      password: "buhariol",
    };
    chai
      .request(app)
      .post(loginUrl)
      .set("Accept", "application/json")
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.equal("Invalid email or Password");
        done();
      });
  });
  it("should return error for invalid email", (done) => {
    const data = {
      email: "david@example.com",
      password: "buhariole",
    };
    chai
      .request(app)
      .post(loginUrl)
      .set("Accept", "application/json")
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.equal("Invalid email or Password");
        done();
      });
  });
  it("should error for invalid inputs", (done) => {
    const data = {
      email: "",
      password: "buhariol",
    };
    chai
      .request(app)
      .post(loginUrl)
      .set("Accept", "application/json")
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { status, error } = res.body;
        expect(status).to.equal("error");
        expect(error).to.be.a("string");
        done();
      });
  });
  it("Should return internal server error when there is a problem logging in user", (done) => {
    const stub = sinon
      .stub(mongoose.Model, "findOne")
      .callsFake(() =>
        Promise.reject(new Error("Internal server error"))
      );
    const data = {
      email: "davidor@example.com",
      password: "buhariole",
    };
    chai
      .request(app)
      .post(loginUrl)
      .set("Accept", "application/json")
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        const { status } = res.body;
        expect(status).to.equal("error");
        done(err);
        stub.restore();
      });
  });
});
