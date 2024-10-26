import { useState } from "react";
import { Todo } from "./types";
import { initTodos } from "./initTodo";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs"; // ◀◀ 追加

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null); // ◀◀ 追加

  const uncompletedCount = initTodos.filter(
    (todo: Todo) => !todo.isDone
  ).length;

  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    // あとでバリデーションなどの処理をここに追加する
    setNewTodoName(e.target.value);
  };

  const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoPriority(Number(e.target.value));
  };

  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value; // UIで日時が未設定のときは空文字列 "" が dt に格納される
    console.log(`UI操作で日時が "${dt}" (${typeof dt}型) に変更されました。`);
    setNewTodoDeadline(dt === "" ? null : new Date(dt));
  };

  const addNewTodo = () => {
    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName,
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline, // ◀◀ 追加
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null); // ◀◀ 追加
  };

  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <div className="mb-4">
        <WelcomeMessage
          name="寝屋川タヌキ"
          uncompletedCount={uncompletedCount}
        />
      </div>
      <TodoList todos={todos} />

      <div className="mt-5 space-y-2 rounded-md border p-3">
        <h2 className="text-lg font-bold">新しいタスクの追加</h2>
        <div className="flex items-center space-x-2">
          <label className="font-bold" htmlFor="newTodoName">
            名前
          </label>
          <input
            id="newTodoName"
            type="text"
            value={newTodoName}
            onChange={updateNewTodoName}
            className="grow rounded-md border p-2"
            placeholder="2文字以上、32文字以内で入力してください"
          />
        </div>

        <div className="flex gap-5">
          <div className="font-bold">優先度</div>
          {[1, 2, 3].map((value) => (
            <label key={value} className="flex items-center space-x-1">
              <input
                id={`priority-${value}`}
                name="priorityGroup"
                type="radio"
                value={value}
                checked={newTodoPriority === value}
                onChange={updateNewTodoPriority}
              />
              <span>{value}</span>
            </label>
          ))}
        </div>

        {/* DateTimeUIの実装 ここから... */}
        <div className="flex items-center gap-x-2">
          <label htmlFor="deadline" className="font-bold">
            期限
          </label>
          <input
            type="datetime-local"
            id="deadline"
            value={
              newTodoDeadline
                ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm")
                : ""
            }
            onChange={updateDeadline}
            className="rounded-md border border-gray-400 px-2 py-0.5"
          />
        </div>
        {/* ...ここまで */}

        <button
          type="button"
          onClick={addNewTodo}
          className="rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600"
        >
          追加
        </button>
      </div>
      <div className="mt-5"></div>
    </div>
  );
};

export default App;
