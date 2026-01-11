import express from "express";
import type { Express } from "express";
import appConfig from "./configs/app.config.js";
import appRoutes from "./routes/app.routes.js";

class App {
    private app: Express;

    constructor() {
        this.app = express()
        this.initRoutes();
    }

    private initRoutes() {
        this.app.use("/api", appRoutes);
    }

    public start() {
        const { port } = appConfig;

        this.app.listen(port, () => {
            console.log(`server is running on http://localhost:${port}`);

        })
    }
}

export default App;