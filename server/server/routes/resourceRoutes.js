const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Resource = require("../models/Resource");

// ADD RESOURCE (UPLOAD)
router.post("/add", upload.single("file"), async (req, res) => {
  try {
    console.log("FILE OBJECT:", req.file); // DEBUG

    const resource = new Resource({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      filePath: "uploads/" + req.file.filename,   // FIXED
    });

    await resource.save();
    res.json({ message: "Resource uploaded successfully", resource });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error uploading", error: err.message });
  }
});

// GET ALL RESOURCES
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: "Error fetching resources" });
  }
});

// DELETE RESOURCE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Resource.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.json({ message: "Resource deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting resource" });
  }
});

module.exports = router;