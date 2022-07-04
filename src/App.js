import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";
import List from "./components/List";

const initialUsers = [
  { id: 1, name: "Luis" },
  { id: 2, name: "Maria" },
];

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // console.log("App Render");
  });

  const printUsers = useCallback(() => {
    console.log("Changed Users", users);
  }, [users]);

  useEffect(() => {
    printUsers();
  }, [users, printUsers]);

  const handleAdd = () => {
    const newUser = { id: Date.now(), name: text };
    setUsers([...users, newUser]);
  };

  const handleSearch = () => {
    setSearch(text);
  };

  const handleDelete = useCallback(
    (userId) => {
      console.log("delete");
      setUsers(users.filter((user) => user.id !== userId));
    },
    [users]
  );

  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        // console.log("filter process");
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search, users]
  );

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleAdd}>Add</button>
      <List users={filteredUsers} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
