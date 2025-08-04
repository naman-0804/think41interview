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
      })
      .catch((err) => {
        console.error("Error fetching customers:", err);
        setLoading(false);
      });
  }, []);

  const filtered = customers.filter((c) => {
    const fullName = `${c.first_name || ""} ${c.Last_name || ""}`;
    return (
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      fullName.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Customer List</h2>
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "0.5rem", marginBottom: "1rem", width: "300px" }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, index) => (
              <tr key={index}>
                <td>{c.id || "-"}</td>
                <td>{c.first_name || "-"}</td>
                <td>{c.Last_name || "-"}</td>
                <td>{c.email || "-"}</td>
                <td>{c.age || "-"}</td>
                <td>{c.gender || "-"}</td>
                <td>{c.state || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
