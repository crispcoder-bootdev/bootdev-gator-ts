import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
    dbUrl: string;
    currentUserName: string;
};

type RawConfig = {
    db_url: string;
    user: string;
};

export function setUser(user: string): void {
    let cfg = readConfig();
    cfg.currentUserName = user;
    writeConfig(cfg);
}

export function readConfig(): Config {
    const data = fs.readFileSync(getConfigFilePath(), {encoding: "utf-8"});
    const rawConfig: RawConfig = JSON.parse(data) as RawConfig;

    // Throws on failure
    validateConfig(rawConfig);
    return {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.user,
    };
}

function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {
    let rawConfig: RawConfig = {
        db_url: "",
        user: "",
    };

    rawConfig.db_url = cfg.dbUrl;
    rawConfig.user = cfg.currentUserName;

    const data = JSON.stringify(rawConfig);
    fs.writeFileSync(getConfigFilePath(), data);
}

function validateConfig(rawConfig: any): void {
    if (!rawConfig) {
        throw new Error("Config is null or empty");
    }

    if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
        throw new Error("Config db_url is missing");
    }

    if (!rawConfig.user || typeof rawConfig.user !== "string") {
        throw new Error("Config user is missing");
    }
}
