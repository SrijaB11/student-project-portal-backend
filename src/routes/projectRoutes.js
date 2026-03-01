const express = require("express");
const auth = require("../middleware/authMiddleware");
const { isStudent } = require("../middleware/roleMiddleware");
const {
  addProject,
  getMyProjects,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectById,
} = require("../controllers/projectController");

const router = express.Router();

router.post("/", auth, isStudent, addProject);
router.get("/mine", auth, isStudent, getMyProjects);
router.put("/:id", auth, isStudent, updateProject);
router.delete("/:id", auth, isStudent, deleteProject);
router.get("/:id", getProjectById);
// Showcase route (public)
router.get("/", getAllProjects);

module.exports = router;
