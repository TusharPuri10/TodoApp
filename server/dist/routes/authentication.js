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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../middleware/auth"));
const auth_2 = require("../middleware/auth");
const express_1 = require("express");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const CreateUsernameRequest = zod_1.z.object({
    username: zod_1.z.string().min(3).max(20),
    password: zod_1.z.string().min(3).max(20)
});
//0. get username
router.get("/username", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.User.findOne({ _id: req.headers["userId"] });
    if (user) {
        res.json({ username: user.username });
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
}));
// 1. User Signup
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to sign up 
    const inputs = CreateUsernameRequest.safeParse(req.body);
    if (!inputs.success) {
        const errorMessage = JSON.parse(inputs.error.message);
        // console.log(errorMessage[0].message);
        return res.status(411).json({ message: errorMessage[0].message });
    }
    // const { username, password } = req.body;
    const user = yield db_1.User.findOne({ username: inputs.data.username });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    }
    else {
        const obj = { username: inputs.data.username, password: inputs.data.password };
        const newUser = new db_1.User(obj);
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, auth_2.SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
    }
}));
// 2. User login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = CreateUsernameRequest.safeParse(req.body);
    if (!inputs.success) {
        const errorMessage = JSON.parse(inputs.error.message);
        // console.log(errorMessage[0].message);
        return res.status(411).json({ message: errorMessage[0].message });
    }
    const user = yield db_1.User.findOne({ username: inputs.data.username });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, auth_2.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}));
exports.default = router;
