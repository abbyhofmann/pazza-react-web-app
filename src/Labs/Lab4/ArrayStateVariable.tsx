import { useState } from "react";
import { Button } from "react-bootstrap";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <Button variant="success" onClick={addElement}>Add Element</Button>
      <div>
        {array.map((item, index) => (
          <div className="border p-3 m-4 d-flex gap-5" key={index}>
            {item}
            <Button
              onClick={() => deleteElement(index)}
              variant="danger"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

