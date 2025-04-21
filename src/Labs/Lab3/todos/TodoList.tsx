import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { Key } from "react";

export default function TodoList() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { todos } = useSelector((state: any) => state.todosReducer);
  return (
    <>
      <h3>Todo List</h3>
      <ul className="list-group">
        {todos.map((todo: { done: boolean; title: string; status: string; } | undefined, index: Key | null | undefined) => {
          return (<TodoItem key={index} todo={todo} />);
        })}
      </ul><hr />
    </>
  );
}
