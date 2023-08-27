const express = require("express");
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  body("todo", "Todo is required").not().isEmpty(),
  body("completed", "completed is required").not().isEmpty(),

  createTodo
);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
