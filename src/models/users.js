import { Schema, model } from "mongoose";
import { sign } from "jsonwebtoken";
// import extendSchema from "mongoose-extend-schema";

const options = {
  discriminatorKey: "kind",
};
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    email: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    password: {
      type: String,
      minlength: 3,
      maxlength: 1024,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/kayode/image/upload/v1607679190/TransAll/avatar_nw45k6.svg",
    },
  },
  options
);
// eslint-disable-next-line func-names
userSchema.methods.generateAuthKey = function () {
  const token = sign(
    {
      // eslint-disable-next-line no-underscore-dangle
      _id: this._id,
      isAdmin: this.isAdmin,
      isTeacher: this.isTeacher,
    },
    process.env.SEC_KEY,
    { expiresIn: "24h" }
  );
  return token;
};

const User = model("User", userSchema);

const Student = User.discriminator(
  "Student",
  new Schema(
    {
      grade: {
        type: String,
        enum: ["1", "2", "3", "4", "5"],
        default: "1",
      },
    },
    options
  )
);
const Teacher = User.discriminator(
  "Teacher",
  new Schema(
    {
      subject: {
        type: String,
        required: true,
      },
    },
    options
  )
);

// export const Student = model("Student", studentSchema);
export { User, Student, Teacher };
