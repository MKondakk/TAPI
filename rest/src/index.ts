import express, { Response } from "express";

import { ValidateError } from "tsoa";
import cors from "cors";
import dotenv from "dotenv";
import { serve, setup } from "swagger-ui-express";
import * as swaggerDoc from "../build/swagger.json"
import { RegisterRoutes } from "../build/routes";
import "./services/dbService";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(cors())

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use('/docs', serve, setup(swaggerDoc));

RegisterRoutes(app);

app.use((_req, res: Response) => {
    res.status(404).send({
        message: "Not Found",
    });
});

app.use((err, req, res, next) => {
    if (err instanceof ValidateError) {
        return res.status(422).json({
            message: "Validation Failed",
            details: JSON.stringify(err?.fields),
        });
    }
    if (err instanceof Error) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

    next();
})

app.get('/', (req, res) => {
    res.send("I'm alive!");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    console.log(`[server]: Swagger documentation available at http://localhost:${port}/docs`);
});