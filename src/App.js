import "./App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const handleSubmit = () => {
    const itemsClone = [...items];
    const obj = {
      id: uuidv4(),
      value: item,
    };
    itemsClone.push(obj);
    setItems(itemsClone);
    setItem("");
  };

  return (
    <div className="App">
      <h2>Add the item</h2>
      <input type="text" value={item} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <h2>List of Items</h2>
      <ul>
        {items.map((item) => {
          return <li key={item.id}>{item.value}</li>;
        })}
      </ul>
    </div>
  );
}
