const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isCompleted, category } = req.body;
    const newTask = new Task({ task, isCompleted, category });
    await newTask.save();
    res.status(200).json({ status: "success", data: newTask, message: "Task created successfully" });
  } catch (error) {
    res.status(400).json({ status: "error", error: error });
  }
};

taskController.getTasks = async (req, res) => {
  try {
    const taskList = await Task.find({}).select("-__v");
    res.status(200).json({ status: "success", data: taskList, message: "Tasks fetched successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error: error });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, isCompleted, category } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { task, isCompleted, category }).select("-__v");
    res.status(200).json({ status: "success", data: updatedTask, message: "Task updated successfully" });
  } catch (error) {
    res.status(400).json({ status: "error", error: error });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ status: "success", message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ status: "error", error: error });
  }
};

module.exports = taskController;
