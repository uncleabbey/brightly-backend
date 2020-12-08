import { Comment, Lesson } from "../models";
import successResponse from "../helpers/successResponse";

const addComment = async (req, res, next) => {
  try {
    const comment = new Comment({
      body: req.body.body,
    });
    comment.author = req.user._id;
    comment.lesson = req.params.lessonId;
    await comment.save();
    await Lesson.findByIdAndUpdate(
      req.params.lessonId,
      { $addToSet: { comments: comment._id } },
      { useFindAndModify: false }
    );
    const message = "comment added successfully";
    return successResponse(res, 201, message, { comment });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

export default addComment;
