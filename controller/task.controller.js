const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isCompleted, category } = req.body;
    const newTask = new Task({ task, isCompleted, category });
    await newTask.save();
    res.status(200).json({ status: "success", data: newTask, message: "할 일이 성공적으로 생성되었습니다." });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

taskController.getTasks = async (req, res) => {
  try {
    const taskList = await Task.find({}).select("-__v");
    res.status(200).json({ status: "success", data: taskList, message: "할 일이 성공적으로 조회되었습니다." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error: error.message });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, isCompleted, category } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { task, isCompleted, category }).select("-__v");
    res.status(200).json({ status: "success", data: updatedTask, message: "할 일이 성공적으로 수정되었습니다." });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ status: "success", message: "할 일이 삭제되었습니다." });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

module.exports = taskController;
