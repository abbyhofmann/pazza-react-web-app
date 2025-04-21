import { Button } from "react-bootstrap";

export default function ChildStateComponent({
  counter,
  setCounter
}: {
  counter: number;
  setCounter: (counter: number) => void;
}) {
  return (
    <div id="wd-child-state">
      <h3>Counter {counter}</h3>
      <div className="d-flex gap-3">
        <Button onClick={() => setCounter(counter + 1)} id="wd-increment-child-state-click">
          Increment</Button>
        <Button onClick={() => setCounter(counter - 1)} id="wd-decrement-child-state-click">
          Decrement</Button>
      </div>
      <hr />
    </div>
  );
}
