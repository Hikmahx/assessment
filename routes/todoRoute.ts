const express = require("express");
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController';
import { body } from "express-validator";

const router = express.Router();

router.post('/todos', 
body("todo", "Todo is required").not().isEmpty(),
body("completed", "completed is required").not().isEmpty(),

createTodo);
router.get('/todos', getTodos);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

module.exports = router;