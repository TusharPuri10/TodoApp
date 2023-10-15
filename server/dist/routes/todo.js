"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const auth_1 = __importDefault(require("../middleware/auth"));
const express_1 = require("express");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
// interface CreateTodoRequest<id> {
//   _id: id,
//   title: string,
//   description: string,
//   completed: boolean
// }
const CreateTodoRequest = zod_1.z.object({
    title: zod_1.z.string().max(20),
    description: zod_1.z.string().max(100),
    completed: zod_1.z.boolean()
});
// 1. Retrieve all todo items ( according to user )
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to view todo of particular user
    const user = yield db_1.User.findOne({ _id: req.headers["userId"] }).populate('todos');
    if (user) {
        res.json({ todos: user.todos });
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
}));
// 2. Get a todo item
router.get("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield db_1.Todo.findById(req.params.id);
    if (todo) {
        res.json({ todo });
    }
    else {
        res.status(404).json({ message: 'todo not found' });
    }
}));
// 3. Create a todo item ( according to user )
router.post("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // the as keyword is used to cast the type of the object
    // as keyword in not considered type safe in typescript because it can be used to cast any type to any other type
    // const todo = new Todo(req.body) as mongoose.Document & {
    //   _id: mongoose.Types.ObjectId;
    // };
    // const inputs: CreateTodoRequest<mongoose.Types.ObjectId> = req.body;
    const inputs = CreateTodoRequest.safeParse(req.body);
    if (!inputs.success) {
        const errorMessage = JSON.parse(inputs.error.message);
        // console.log(errorMessage[0].message);
        return res.status(411).json({ message: errorMessage[0].message });
    }
    const todo = new db_1.Todo({ title: inputs.data.title, description: inputs.data.description, completed: inputs.data.completed });
    yield todo.save();
    const user = yield db_1.User.findOne({ _id: req.headers["userId"] });
    if (user) {
        user.todos.push(todo._id);
        yield user.save();
        res.json({ message: 'Todo created successfully', todoId: todo.id });
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
}));
// 4. Update a todo item
router.put("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield db_1.Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (todo) {
        res.json({ message: 'todo updated successfully' });
    }
    else {
        res.status(404).json({ message: 'todo not found' });
    }
}));
//5. Delete a todo item
router.delete("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield db_1.Todo.findByIdAndDelete(req.params.id);
    if (todo) {
        res.json({ message: 'todo deleted successfully' });
    }
    else {
        res.status(404).json({ message: 'todo not found' });
    }
}));
exports.default = router;
