import express from 'express';
import path from 'node:path';
import router from './routes/routes.mjs';
import AppError from './utilities/appError.mjs';
import globalErrorHandle from './middleware/errorMiddleware.mjs';
import cors from 'cors';


const __dirname = import.meta.dirname;
const app = express();
const PORT = 7001;
const filePath = path.join(__dirname, "../client/project");
console.log(filePath)

app.use(express.json());
app.use(express.static(filePath));
app.use("/api", router);
app.use(cors())

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/project/index.html"));
});
app.use((req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
})
app.use(globalErrorHandle);

app.listen(PORT, () => {
    console.log(`server running on : http://localhost:${PORT}`);

})