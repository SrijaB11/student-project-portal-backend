const Project = require("../models/Project");

// Add Project (Student)
exports.addProject = async (req, res) => {
  try {
    const { name, githubLink, deploymentLink, description } = req.body;

    const project = await Project.create({
      studentId: req.user.id,
      name,
      githubLink,
      deploymentLink,
      description,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Logged In Student Projects
exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ studentId: req.user.id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Project (Only Owner)
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.studentId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    const { name, githubLink, deploymentLink, description } = req.body;

    project.name = name;
    project.githubLink = githubLink;
    project.deploymentLink = deploymentLink;
    project.description = description;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Project (Only Owner)
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.studentId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await project.deleteOne();
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Projects (For Showcase)
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("studentId", "name email")
      .sort({ priority: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "studentId",
      "name email",
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
