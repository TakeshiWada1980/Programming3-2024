import React from "react";
import { Todo } from "./types";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faClock,
  faFaceGrinWide,
} from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

type Props = {
  todos: Todo[];
};

const num2star = (n: number): string => "★".repeat(4 - n);

const TodoList = (props: Props) => {
  const todos = props.todos;

  if (todos.length === 0) {
    return (
      <div className="text-red-500">
        現在、登録されているタスクはありません。
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={twMerge(
            "rounded-md border border-slate-500 bg-white px-3 py-2 drop-shadow-md",
            todo.isDone && "bg-blue-50 opacity-50"
          )}
        >
          {todo.isDone && (
            <div className="mb-1 rounded bg-blue-400 px-2 py-0.5 text-center text-xs text-white">
              <FontAwesomeIcon icon={faFaceGrinWide} className="mr-1.5" />
              完了済み
              <FontAwesomeIcon icon={faFaceGrinWide} className="ml-1.5" />
            </div>
          )}
          <div className="flex items-baseline text-slate-700">
            <FontAwesomeIcon icon={faFile} flip="horizontal" className="mr-1" />
            <div
              className={twMerge(
                "text-lg font-bold",
                todo.isDone && "line-through decoration-2"
              )}
            >
              {todo.name}
            </div>
            <div className="ml-2">優先度 </div>
            <div className="ml-2 text-orange-400">
              {num2star(todo.priority)}
            </div>
          </div>
          {todo.deadline && (
            <div className="ml-4 flex items-center text-sm text-slate-500">
              <FontAwesomeIcon
                icon={faClock}
                flip="horizontal"
                className="mr-1.5"
              />
              <div className={twMerge(todo.isDone && "line-through")}>
                期限: {dayjs(todo.deadline).format("YYYY年M月D日 H時m分")}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
