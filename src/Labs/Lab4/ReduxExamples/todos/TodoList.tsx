import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { Key } from "react";
export default function TodoList() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { todos } = useSelector((state: any) => state.todosReducer);
  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: { id: string; title: string; }, index: Key | null | undefined) => (
          <TodoItem
            key={index}
            todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
