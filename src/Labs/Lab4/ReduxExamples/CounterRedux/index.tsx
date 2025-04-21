import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterReducer";
import { Button } from "react-bootstrap";

export default function CounterRedux() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { count } = useSelector((state: any) => state.counterReducer);
  const dispatch = useDispatch();
  return (
    <div id="wd-counter-redux">
      <h2>Counter Redux</h2>
      <h3>{count}</h3>
      <div className="d-flex gap-3">
        <Button onClick={() => dispatch(increment())}
          id="wd-counter-redux-increment-click"> Increment
        </Button>
        <Button onClick={() => dispatch(decrement())}
          id="wd-counter-redux-decrement-click"> Decrement
        </Button>
      </div>
      <hr />
    </div>
  );
}
