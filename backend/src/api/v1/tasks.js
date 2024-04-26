const express = require("express");
const Task = require("../../models/task");

const API_V1_TASKS = express.Router();

API_V1_TASKS.get("/", (req, res) => {
  res.send("Hello, World!");
});

API_V1_TASKS.post("/new", async (req, res) => {
  try {
    const new_task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      completed: false,
    });
    if (new_task.id) {
      res.status(201).send(new_task);
    }
  } catch (error) {
    if (error) {
      res.status(500).send({
        message: "Unable to create task",
      });
    }
  }
});

API_V1_TASKS.get("/details/:id", async (req, res) => {
  const task_id = req.params.id
  try {
    const task_with_id = await Task.findByPk(task_id)
    if (task_with_id instanceof Task) {
      res.status(200).send(task_with_id)
    }
  } catch (error) {
    if (error) {
      res.status(500).send({
        message: "Unable to find task with id: " + task_id
      })
    }
  }
});

API_V1_TASKS.post("/details/:id", async (req, res) => {
  const task_id = req.params.id
  const update_dict = {}
  if (req.body.title) {
    update_dict.title = req.body.title
  }
  if (req.body.description) {
    update_dict.description = req.body.description
  }
  if (req.body.completed) {
    update_dict.completed = req.body.completed
  }

  try {
    const task_with_id = await Task.update({ ...update_dict }, {
      where: {
        id: task_id
      }
    })
    if (task_with_id instanceof Task) {
      res.status(200).send(task_with_id)
    }
  } catch (error) {
    if (error) {
      res.status(500).send({
        message: "Unable to find task with id: " + task_id
      })
    }
  }
});

API_V1_TASKS.post("/delete/:id", async (req, res) => {
  const task_id = req.params.id
  try {
    await Task.destroy(task_id)
    res.status(200).send({
      message: "Delted"
    })
  } catch (error) {
    if (error) {
      res.status(500).send({
        message: "Unable to find task with id: " + task_id
      })
    }
  }
});

module.exports = API_V1_TASKS;
