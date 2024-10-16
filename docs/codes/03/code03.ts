export {};
import { Todo } from "./types";
import { initTodos } from "./initTodos";

const targetId = 3;
const newName = "電気電子回路1の課題";
const updatedTodos: Todo[] = initTodos.map((todo) =>
  todo.id === targetId ? { ...todo, name: newName } : todo
);

console.log(JSON.stringify(updatedTodos, null, 2));
