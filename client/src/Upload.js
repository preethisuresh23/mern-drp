import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const token = localStorage.getItem("token");

  // File icon logic
  const getFileIcon = (filePath) => {
    if (!filePath) return "📁";

    const ext = filePath.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "🖼️";
    if (ext === "pdf") return "📄";
    if (["doc", "docx"].includes(ext)) return "📘";
    if (["ppt", "pptx"].includes(ext)) return "📊";
    if (["xls", "xlsx"].includes(ext)) return "📑";
    if (["zip", "rar", "7z"].includes(ext)) return "🗂️";

    return "📁";
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    background: "#007bff",
    border: "none",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  };

  const fetchResources = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/resources", {
        headers: { Authorization: token },
      });
      setResources(res.data);
    } catch (err) {
      console.log("Error fetching resources:", err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/resources/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      alert("Upload successful!");
      setTitle("");
      setDescription("");
      setCategory("");
      setFile(null);
      fetchResources();
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/resources/${id}`, {
        headers: { Authorization: token },
      });

      alert("Resource deleted!");
      fetchResources();
    } catch (err) {
      console.error(err);
      alert("Delete failed!");
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: 20,
          maxWidth: "800px",
          margin: "0 auto",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Upload Resource
        </h2>

        {/* Upload Form */}
        <form
          onSubmit={handleUpload}
          style={{
            padding: 20,
            border: "1px solid #ddd",
            borderRadius: 15,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            background: "#fff",
            marginBottom: 40,
          }}
        >
          <input
            type="text"
            placeholder="Title"
            style={inputStyle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            style={inputStyle}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            style={inputStyle}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <button type="submit" style={buttonStyle}>
            Upload
          </button>
        </form>

        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Uploaded Files</h2>

        {/* 🔍 Search Bar */}
        <input
          type="text"
          placeholder="Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #bbb",
            marginBottom: "20px",
            fontSize: "16px",
          }}
        />

        {/* 🟦 Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #bbb",
            marginBottom: "20px",
            fontSize: "16px",
          }}
        >
          <option value="All">All Categories</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="IT">IT</option>
          <option value="MATHS">Maths</option>
          <option value="NOTES">Notes</option>
          <option value="SYLLABUS">Syllabus</option>
        </select>

        {resources.length === 0 ? (
          <p style={{ textAlign: "center" }}>No files uploaded yet.</p>
        ) : (
          resources
            .filter((r) => {
              const text = search.toLowerCase();

              const matchesSearch =
                r.title.toLowerCase().includes(text) ||
                r.description.toLowerCase().includes(text) ||
                r.category.toLowerCase().includes(text);

              const matchesCategory =
                categoryFilter === "All" ||
                r.category.toLowerCase() === categoryFilter.toLowerCase();

              return matchesSearch && matchesCategory;
            })
            .map((r) => (
              <div
                key={r._id}
                 className="card"
                style={{
                  padding: 20,
                  border: "1px solid #ddd",
                  borderRadius: 15,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  background: "#fff",
                  marginBottom: 25,
                }}
              >
                <h3 style={{ margin: 0 }}>{r.title}</h3>
                <p style={{ margin: "8px 0" }}>{r.description}</p>
                <p>
                  <strong>Category:</strong> {r.category}
                </p>

                <p style={{ fontSize: "45px", margin: "10px 0" }}>
                  {getFileIcon(r.filePath)}
                </p>

                <a
                  href={`http://localhost:5000/${r.filePath}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: "8px 15px",
                    background: "green",
                    color: "#fff",
                    borderRadius: 8,
                    textDecoration: "none",
                    marginRight: 10,
                  }}
                >
                  Download
                </a>

                <button
                  onClick={() => handleDelete(r._id)}
                  style={{
                    padding: "8px 15px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            ))
        )}
      </div>
    </>
  );
}

export default Upload;
