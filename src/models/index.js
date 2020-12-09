/* eslint-disable no-console */
import mongoose from "mongoose";
import { Student, User, Teacher } from "./users";
import {
  Class,
  Lesson,
  Resources,
  TimeTable,
  Comment,
} from "./class";

/* istanbul ignore if */
if (process.env.NODE_ENV === "development") {
  mongoose.set("debug", true);
}
mongoose.Promise = global.Promise;
const connectDatabase = (dbUrl) => {
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected to database"))
    .catch(
      /* istanbul ignore next */
      (err) => {
        /* istanbul ignore next */
        return err;
      }
    );
};

export {
  Student,
  User,
  connectDatabase,
  Teacher,
  Class,
  Lesson,
  Resources,
  TimeTable,
  Comment,
};
