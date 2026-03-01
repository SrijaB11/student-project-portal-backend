// const express = require("express");
// const auth = require("../middleware/authMiddleware");
// const { isAdmin } = require("../middleware/roleMiddleware");
// const {
//   getAllStudents,
//   approveStudent,
//   deleteStudent,
//   setProjectPriority,
// } = require("../controllers/adminController");

// const router = express.Router();

// router.get("/students", auth, isAdmin, getAllStudents);
// router.put("/students/:id/approve", auth, isAdmin, approveStudent);
// router.delete("/students/:id", auth, isAdmin, deleteStudent);

// router.put("/projects/:id/priority", auth, isAdmin, setProjectPriority);

// module.exports = router;
const express = require("express");
const auth = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");
const {
  getAllStudents,
  approveStudent,
  deleteStudent,
  setProjectPriority,
  deleteProjectByAdmin,
} = require("../controllers/adminController");

const router = express.Router();

// Students
router.get("/students", auth, isAdmin, getAllStudents);
router.put("/students/:id/approve", auth, isAdmin, approveStudent);
router.delete("/students/:id", auth, isAdmin, deleteStudent);

// Projects (Admin Control)
router.put("/projects/:id/priority", auth, isAdmin, setProjectPriority);
router.delete("/projects/:id", auth, isAdmin, deleteProjectByAdmin);

module.exports = router;
