/* eslint-disable no-console */
import mongoose from "mongoose";

mongoose.set("debug", true);
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

export default connectDatabase;
