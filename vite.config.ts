import { defineConfig } from "vite";
import * as fs from "fs";
import * as path from "path";

export default defineConfig(({ mode }) => {
    console.log(mode);
    const isDevelopment = mode === "development";
    const config = {
        base: isDevelopment ? "/" : "/webar/", // 開発環境ではルート、本番環境ではサブディレクトリ
    };

    if (isDevelopment) {
        return {
            ...config,
            server: {
                host: '0.0.0.0',
                https: {
                    key: fs.readFileSync(path.resolve(__dirname, "key.pem")),
                    cert: fs.readFileSync(path.resolve(__dirname, "cert.pem")),
                },
            },
        }
    } else {
        return config;
    }
});