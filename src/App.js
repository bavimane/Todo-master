import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [editedValues, setEditedValues] = useState({});

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const handleSubmit = () => {
    const isFound = items.find((element) => element.value === item);
    if (isFound) {
      alert(`${item} is already exist`);
    } else {
      const itemsClone = [...items];
      const obj = {
        id: uuidv4(),
        value: item,
      };
      itemsClone.push(obj);
      setItems(itemsClone);
    }

    setItem("");
  };

  const handleEdit = (id) => {
    const itemsClone = items.map((item) => {
      if (item.id === id) return { ...item, isEdit: true };
      return item;
    });
    setItems(itemsClone);
    const editedValuesClone = { ...editedValues };
    editedValuesClone[id] = items.find((item) => item.id === id).value;
    setEditedValues(editedValuesClone);
  };

  const handleEditOnChange = (e, id) => {
    const editedValuesClone = { ...editedValues };
    editedValuesClone[id] = e.target.value;
    setEditedValues(editedValuesClone);
  };

  const handleEditSubmit = (id) => {
    const itemsClone = items.map((item) => {
      if (item.id === id)
        return { ...item, isEdit: false, value: editedValues[id] };
      return item;
    });
    setItems(itemsClone);
  };

  const handleDelete = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

  const handleCancel = (id) => {
    const itemsClone = items.map((item) => {
      if (item.id === id) return { ...item, isEdit: false };
      return item;
    });
    setItems(itemsClone);
  };

  return (
    <div>
      <h2>Add the item</h2>
      <input type="text" value={item} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <h2>List of Items</h2>
      <ul>
        {items.map((item) => {
          return item.isEdit ? (
            <div key={item.id}>
              <input
                value={editedValues[item.id]}
                onChange={(e) => handleEditOnChange(e, item.id)}
              />
              <button onClick={() => handleEditSubmit(item.id)}>Submit</button>
              <button onClick={() => handleCancel(item.id)}>Cancel</button>
            </div>
          ) : (
            <li key={item.id}>
              {item.value}{" "}
              <button onClick={() => handleEdit(item.id)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Remove</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
