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
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../model/user"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.authRoute = express_1.default.Router();
exports.authRoute.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    let isUsername = yield user_1.default.findOne({ username });
    if (!isUsername) {
        return res.status(http_status_codes_1.default.BAD_REQUEST).json({
            errors: [
                {
                    msg: "User does not exists",
                },
            ],
        });
    }
    const isMatch = yield bcryptjs_1.default.compare(password, isUsername.password);
    if (!isMatch) {
        return res.status(http_status_codes_1.default.BAD_REQUEST).json({
            errors: [
                {
                    msg: "Invalid Credentials",
                },
            ],
        });
    }
    res.send({ msg: "Logged", user: isUsername }).status(http_status_codes_1.default.OK);
}));
exports.authRoute.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    let user = yield user_1.default.findOne({ username });
    if (user) {
        return res.status(http_status_codes_1.default.BAD_REQUEST).json({
            errors: [
                {
                    msg: "User already exists",
                },
            ],
        });
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashed = yield bcryptjs_1.default.hash(password, salt);
    // Build user object based on TUser
    const userFields = {
        email,
        password: hashed,
        username,
    };
    user = new user_1.default(userFields);
    yield user.save();
    res.send({ msg: "Registered", user: user }).status(http_status_codes_1.default.CREATED);
}));
