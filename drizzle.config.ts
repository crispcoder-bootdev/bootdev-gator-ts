import {defineConfig} from "drizzle-kit";

export default defineConfig({
    schema: "src/schema.ts",
    out: "src/drizzle-data",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgres://postgres:@localhost:5432/gator?sslmode=disable",
    },
});
