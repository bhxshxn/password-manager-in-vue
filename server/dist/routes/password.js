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
exports.passRoute = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const password_1 = __importDefault(require("../model/password"));
exports.passRoute = express_1.default.Router();
exports.passRoute.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.query.user ", req.query.user);
    const user = req.query.user;
    const passwords = yield password_1.default.find({ username: user });
    console.log("password", passwords);
    return res.send({ passwords }).status(http_status_codes_1.default.OK);
}));
exports.passRoute.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, hint, password, username } = req.body;
    const newPassword = new password_1.default({ title, hint, password, username });
    yield newPassword.save();
    return res.status(http_status_codes_1.default.CREATED).send({ newPassword });
}));
exports.passRoute.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    yield password_1.default.findByIdAndDelete({ id })
        .then(() => {
        return res.status(http_status_codes_1.default.OK).send({ msg: "deleted" });
    })
        .catch(() => {
        return res.status(http_status_codes_1.default.NOT_FOUND).send({ msg: "deleted" });
    });
}));
// passRoute.post("/create", async (req: Request, res: Response) => {
//   const { title, hint, password, username } = req.body;
//   const newPassword = new Password({ title, hint, password, username });
//   await newPassword.save();
//   return res.status(HttpStatusCodes.CREATED).send({ newPassword });
// });
