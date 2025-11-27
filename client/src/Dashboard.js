import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Dashboard() {
  const [resources, setResources] = useState([]);

  const token = localStorage.getItem("token");

  const fetchResources = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/resources", {
        headers: { Authorization: token },
      });
      setResources(res.data);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const categoryCounts = resources.reduce((acc, item) => {
    const cat = item.category || "Others";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: 20,
          maxWidth: "900px",
          margin: "0 auto",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 30 }}>Dashboard</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Total Files */}
          <div
            className="card"
            style={{
              padding: 20,
              background: "#4c6ef5",
              color: "white",
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            <h3>Total Files</h3>
            <h1>{resources.length}</h1>
          </div>

          {/* Unique Categories */}
          <div
            className="card"
            style={{
              padding: 20,
              background: "#40c057",
              color: "white",
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            <h3>Unique Categories</h3>
            <h1>{Object.keys(categoryCounts).length}</h1>
          </div>

          {/* Latest Upload */}
          <div
            className="card"
            style={{
              padding: 20,
              background: "#f76707",
              color: "white",
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            <h3>Latest Upload</h3>
            <h4 style={{ margin: 0 }}>
              {resources.length > 0
                ? resources[resources.length - 1].title
                : "-"}
            </h4>
          </div>
        </div>

        {/* Category Breakdown */}
        <h2 style={{ marginTop: 40 }}>Category Breakdown</h2>

        <div
          className="card"
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
          }}
        >
          {Object.entries(categoryCounts).map(([cat, count]) => (
            <p key={cat} style={{ fontSize: "18px", marginBottom: 10 }}>
              <b>{cat}</b>: {count} file(s)
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;