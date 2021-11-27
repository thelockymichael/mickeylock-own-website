import mongoose from "mongoose";

// User User Model
/*
About:
* fullName: string
* CV Image: uploads (sharp)
* About text
Projects:
projects: [project: IProject]



*/

interface IUser {
  fullName: string;
  passwordHash: string;
  about: string;
  profileImage: string;
}

interface UserModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}

interface UserDoc extends mongoose.Document {
  fullName: string;
  passwordHash: string;
  about: string;
  profileImage: string;
  // projects: [Project];
}

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

userSchema.statics.build = (attr: IUser) => new User(attr);

const User = mongoose.model<UserDoc, UserModelInterface>("User", userSchema);

export { User };
