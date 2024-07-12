import Header from "./components/Header";
import SearchItem from "./components/SearchItem";
import AddItem from "./components/AddItem";
import Footer from "./components/Footer";
import Content from "./components/Content";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState("true");
  const [item, setItem] = useState("");
  console.log(item);

  const base_url = "http://localhost:3000";
  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(`${base_url}/items`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    setTimeout(fetchItems, 2000);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      id: item.length + "1",
      item: item,
      checked: false,
    };
    try {
      const response = await fetch(`${base_url}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      const data = await response.json();
      setItems([...items, data]);
      setItem("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`${base_url}/items/${id}`, {
        method: "DELETE",
      });

      const filteredItems = items.filter((item) => item.id !== id);
      setItems(filteredItems);
    } catch (error) {
      console.error(error);
    }
  }
  async function handleCheck(id) {
    try {
      const product = items.find((item) => item.id === id);
      const response = await fetch(`${base_url}/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          checked: !product.checked,
        }),
      });
      const data = await response.json();
      const dataUpdate = items.map((item) =>
        item.id === id ? { ...item, checked: data.checked } : item
      );
      setItems(dataUpdate);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem setItem={setItem} item={item} handleSubmit={handleSubmit} />
      <SearchItem />
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Content
            items={items}
            handleDelete={handleDelete}
            handleCheck={handleCheck}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
