import React, { useEffect, useState } from "react";
function App() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.customers || []);
        setLoading(false);
      });
  }, []);
  const filtered = customers.filter(
    (c) =>
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.name?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <h3>Customer list</h3>
      <input
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filtered.map((c, index) => (
            <li key={index}>
              <p>{c.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default App;