import mongoose from "mongoose";

// TODO User Model
/*
* name


*/

interface ITodo {
  title: string;
  description: string;
}

interface TodoModelInterface extends mongoose.Model<TodoDoc> {
  build(attr: ITodo): TodoDoc;
}

interface TodoDoc extends mongoose.Document {
  title: string;
  description: string;
}

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

todoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

todoSchema.statics.build = (attr: ITodo) => new Todo(attr);

const Todo = mongoose.model<TodoDoc, TodoModelInterface>("Todo", todoSchema);

Todo.build({
  title: "Terve",
  description: "Hello",
});

export { Todo };
