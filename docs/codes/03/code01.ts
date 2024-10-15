export {};
import { Todo } from "./types";
import { printTodo } from "./utils/printTodo";
import assert from "assert";

const todo: Todo = {
  name: "Learn TypeScript",
  priority: 3,
  isDone: false,
  deadline: new Date(2024, 9, 11, 9, 45),
};

const updatedTodo: Todo = {
  ...todo,
  isDone: true,
  deadline: new Date(2024, 9, 30),
};

// todo と updatedTodo の参照が「異なること」を念のために確認
assert.notEqual(todo, updatedTodo);

// updatedTodo の内容を確認
printTodo(updatedTodo);
