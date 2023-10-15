"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//define mongoose schema
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    todos: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Todo' }]
});
const todoSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    completed: Boolean
});
//define mongoose model
exports.User = mongoose_1.default.model('User', userSchema);
exports.Todo = mongoose_1.default.model('Todo', todoSchema);
