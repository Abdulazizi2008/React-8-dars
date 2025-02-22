import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddItem = ({ item, setItem, handleSubmit }) => {
  const inputRef = useRef();

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Item</label>
      <input
        autoFocus
        ref={inputRef}
        id="addItem"
        type="text"
        placeholder="Add Item"
        required
        onChange={(e) => setItem(e.target.value)}
        value={item}
      />
      <button type="submit" aria-label="Add Item">
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
