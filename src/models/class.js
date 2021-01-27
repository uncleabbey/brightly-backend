import { Schema, model } from "mongoose";

const classesSchema = new Schema(
  {
    grade: {
      type: String,
      enum: ["1", "2", "3", "4", "5"],
      default: "1",
    },
    subject: {
      type: String,
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    lessons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    schedules: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Class = model("Class", classesSchema);

const lessonSchema = new Schema(
  {
    week: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
    resources: [
      {
        type: Schema.Types.ObjectId,
        ref: "Resources",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    objective: {
      type: String,
      required: true,
      default: "The lesson will enable the students to"
    },
     startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },
  },
  { timestamps: true }
);

const Lesson = model("Lesson", lessonSchema);

const resourcesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    lesson: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
  },
  { timestamps: true }
);
const Resources = model("Resources", resourcesSchema);

const timeTableSchema = new Schema({
  grade: {
    type: String,
    enum: ["1", "2", "3", "4", "5"],
    default: "1",
  },
  day: {
    type: String,
    required: true,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: "Class",
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const TimeTable = model("TimeTable", timeTableSchema);

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    lesson: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);
export { Lesson, Class, Resources, TimeTable, Comment };
