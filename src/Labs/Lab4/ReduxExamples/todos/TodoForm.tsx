import { ListGroup, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";


export default function TodoForm() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroup.Item className="d-flex gap-3">
      <FormControl value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} />
      <Button variant="success" onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click"> Add </Button>
      <Button variant="warning" onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"> Update </Button>
    </ListGroup.Item>
  );
}
