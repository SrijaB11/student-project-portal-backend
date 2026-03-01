// const User = require("../models/User");
// const Project = require("../models/Project");

// // Get All Students
// exports.getAllStudents = async (req, res) => {
//   try {
//     const students = await User.find({ role: "student" });
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Approve Student

// // Approve Student
// exports.approveStudent = async (req, res) => {
//   try {
//     const student = await User.findByIdAndUpdate(
//       req.params.id,
//       { gotPermission: true },
//       { new: true },
//     );

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.json({
//       message: "Student approved successfully",
//       student,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };
// // Delete Student
// exports.deleteStudent = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     await Project.deleteMany({ studentId: req.params.id });

//     res.json({ message: "Student deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Set Project Priority
// exports.setProjectPriority = async (req, res) => {
//   try {
//     const { priority } = req.body;

//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: "Project not found" });

//     project.priority = priority;
//     await project.save();

//     res.json({ message: "Priority updated" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const User = require("../models/User");
const Project = require("../models/Project");

// Get All Students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve Student
exports.approveStudent = async (req, res) => {
  try {
    const student = await User.findByIdAndUpdate(
      req.params.id,
      { gotPermission: true },
      { new: true },
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student approved", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Project.deleteMany({ studentId: req.params.id });

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Set Project Priority
exports.setProjectPriority = async (req, res) => {
  try {
    const { priority } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.priority = priority;
    await project.save();

    res.json({ message: "Priority updated", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Project (Admin)
exports.deleteProjectByAdmin = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
