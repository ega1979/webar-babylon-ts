import { defineConfig } from "vite";
import * as fs from "fs";
import * as path from "path";

export default defineConfig({
    server: {
        host: '0.0.0.0',
        https: {
            key: fs.readFileSync(path.resolve(__dirname, "key.pem")),
            cert: fs.readFileSync(path.resolve(__dirname, "cert.pem")),
        },
    },
});