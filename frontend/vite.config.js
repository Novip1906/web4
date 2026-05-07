import { defineConfig } from "vite";

export default defineConfig({
    server: {
        port: 5173,
        proxy: {
            "/products": "http://localhost:3000",
        },
    },
    build: {
        outDir: "./public",
        emptyOutDir: true,
    },
});
