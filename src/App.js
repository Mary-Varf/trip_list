import { useState, useRef, useEffect } from "react";

const App = () => {
  const [items, setItems] = useState([]);

  const addNewItem = (newItem) => {
    setItems((currentState) => [...currentState, newItem]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={addNewItem} />
      <List items={items} />
      <Stats />
    </div>
  );
};

const Logo = ({ items }) => {
  return <h1>🌴Far Away💼</h1>;
};
const Form = ({ onAddItems }) => {
  const inputRef = useRef();
  const [input, setInput] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input) return;

    onAddItems({
      description: input,
      quantity,
      packed: false,
      id: Date.now(),
    });

    setInput("");
    setQuantity(1);
  };

  useEffect(() => {
    const inputArea = inputRef.current;
    inputArea.focus();
  }, []);
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
        ref={inputRef}
        type="text"
        placeholder="Item..."
        value={input}
        onChange={handleChange}
      />
      <button>Add</button>
    </form>
  );
};
const List = ({ items }) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
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
