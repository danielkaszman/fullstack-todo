const express = require("express");
const router = express.Router();
const TodoModel = require("../models/TodoModel");

router.post("/getTodos", (req, res) => {
  TodoModel.find({ email: req.body.email }, (error, result) => {
    if (error) {
      res.json(error);
    } else {
      res.json(result);
    }
  });
});

router.post("/saveTodo", async (req, res) => {
  try {
    const newTodo = new TodoModel(req.body);
    await newTodo.save();

    res.send("Saved!");
  } catch (error) {
    res.json(error);
  }
});

router.delete("/deleteTodo/:id", async (req, res) => {
  try {
    await TodoModel.findByIdAndDelete(req.params.id);

    res.send("Deleted!");
  } catch (error) {
    res.json(error);
  }
});

router.put("/updateTodo/:id", async (req, res) => {
  try {
    await TodoModel.findByIdAndUpdate(req.params.id, req.body);

    res.send("Updated!");
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
