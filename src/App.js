import { useState } from "react";

const initialItems = [
  { id: 1, description: "Pasport", quantity: 2, packed: false },
  { id: 2, description: "dfg", quantity: 21, packed: true },
  { id: 31, description: "sd", quantity: 21, packed: true },
];
const App = () => {
  return (
    <div className="app">
      <Logo />
      <Form />
      <List />
      <Stats />
    </div>
  );
};

const Logo = () => {
  return <h1>🌴Far Away💼</h1>;
};
const Form = () => {
  const [input, setInput] = useState("");
  const [quantity, setQuantity] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input) return;

    const newItem = {
      description: input,
      quantity,
      packed: false,
      id: Date.now(),
    };

    setInput("");
    setQuantity(1);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do ou need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={input}
        onChange={handleChange}
      />
      <button>Add</button>
    </form>
  );
};
const List = () => {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};
const handleDelete = () => {};
const Item = ({ item }) => {
  return (
    <li style={item.packed ? { textDecoration: "line-through" } : {}}>
      <span>
        {item.quantity} {item.description}
      </span>
      <button onClick={handleDelete}>&times;</button>
    </li>
  );
};
const Stats = () => {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X(X %)</em>
    </footer>
  );
};

export default App;
