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
const express_1 = __importDefault(require("express"));
const requestCount_1 = require("./monitoring/requestCount");
const prom_client_1 = __importDefault(require("prom-client"));
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.cli(),
    transports: [new winston_1.default.transports.Console()],
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(requestCount_1.requestCount);
app.get("/user", (req, res) => {
    logger.error('yuvraj');
    res.status(200).json({
        name: "yuvraj",
    });
});
app.post("/user", (req, res) => {
    res.json({
        name: "yuvraj",
    });
});
app.get("/metrics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const metrics = yield prom_client_1.default.register.metrics();
    res.set("Content-Type", prom_client_1.default.register.contentType);
    res.end(metrics);
    logger.info(metrics);
}));
app.listen(3000, () => {
    console.log("server is listening at 3000");
});
