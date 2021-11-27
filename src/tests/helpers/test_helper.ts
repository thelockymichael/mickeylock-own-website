import { ITodo, Todo } from "../../models/todo";

const initialTodos = [
  {
    title: "Do the dishes",
    description: "Dishes are in the kitchen",
  },
  {
    title: "Take out the trash",
    description: "Trash can is outside.",
  },
  {
    title: "Destroy all humans II",
    description: "Please don't",
  },
];

const nonExistingId = async () => {
  const todo = new Todo({ content: "willremovethissoon", date: new Date() });
  await todo.save();
  await todo.remove();

  return todo._id.toString();
};

const todosInDb = async () => {
  const todos = await Todo.find({});
  return todos.map((todo) => todo.toJSON());
};

export { initialTodos, nonExistingId, todosInDb };
