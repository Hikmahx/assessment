const Todo = require("../models/Todo");
import { Response, Request } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

export const createTodo = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { todo, completed, tags } = req.body;
    const newTodo = new Todo({
      todo,
      completed,
      tags
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err: any) {
    console.error(err.message);
    // res.status(500).send("Server Error");
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { todo, completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { todo, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.status(200).json({ msg: "Todo updated", updatedTodo });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    res.status(200).json({ msg: "Todo is successfully deleted" });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
