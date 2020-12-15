// import { uploader } from "cloudinary";
import { uploader } from "../middlewares/multer";
import successResponse from "../helpers/successResponse";
import { Lesson, Resources } from "../models";

export const addResources = async (req, res, next) => {
  const { title, type } = req.body;
  const { lessonId } = req.params;

  try {
    if (req.file) {
      if (req.file.mimetype === "video/mp4") {
        const file = await uploader.uploadVideo(req.file);
        const resources = new Resources({
          title,
          type,
          lesson: lessonId,
          link: file.uploadedFile.url,
        });
        resources.lesson = lessonId;
        await resources.save();
        await Lesson.findByIdAndUpdate(
          lessonId,
          { $addToSet: { resources: resources._id } },
          { useFindAndModify: false }
        );
        const message = "resources added successfully";
        return successResponse(res, 201, message, { resources });
      }
      const file = await uploader.upload(req.file);
      const resources = new Resources({
        title,
        type,
        lesson: lessonId,
        link: file.uploadedFile.url,
      });
      resources.lesson = lessonId;
      await resources.save();
      await Lesson.findByIdAndUpdate(
        lessonId,
        { $addToSet: { resources: resources._id } },
        { useFindAndModify: false }
      );
      const message = "resources added successfully";
      return successResponse(res, 201, message, { resources });
    }
    return next({
      status: 400,
      error: "No files in the request",
    });
  } catch (error) {
    // console.log(error);
    return next({
      status: 400,
      error,
    });
  }
};
export const getResourcesById = async (req, res, next) => {
  try {
    const resources = await Resources.findById(req.params.id);
    if (resources) {
      const message = "resources retrieved successfully";
      return successResponse(res, 200, message, { resources });
    }
    return next({
      status: 404,
      error: "resource not found",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

export const getResources = async (req, res, next) => {
  try {
    const { grade } = req.user;
    console.log(grade)
    // const resources = await Resources.find().populate("lesson");
    const resources = await Resources.find().populate({
      path: "lesson",
      select: ["-body", "-resources", "-schedule", "-title", ],
      populate: {
        path: "class"
      }
    })
      const resourcesByGrade = resources.filter(resource => resource.lesson.class.grade === grade)
      const message = "resources retrieved successfully";
      return successResponse(res, 200, message, { resourcess: resourcesByGrade });
  
  } catch (error) {
    console.log(error)
    return next({
      status: 500,
      error,
    });
  }
};