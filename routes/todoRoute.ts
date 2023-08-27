const express = require("express");
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";
import { body } from "express-validator";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post(
  "/",
  body("todo", "Todo is required").not().isEmpty(),
  body("completed", "completed is required").not().isEmpty(),
  verifyToken,
  createTodo
);
router.get("/", verifyToken, getTodos);
router.put("/:id", verifyToken, updateTodo);
router.delete("/:id", verifyToken, deleteTodo);

module.exports = router;
