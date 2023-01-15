"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PasswordSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    hint: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});
const Password = (0, mongoose_1.model)("Password", PasswordSchema);
exports.default = Password;
