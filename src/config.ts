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
    let cfg = readConfig(); // rawConfig
    if (!cfg) {
        throw new Error("read config failed");
    }

    cfg.currentUserName = user;
    writeConfig(cfg);
}

export function readConfig(): Config | undefined {
    const data = fs.readFileSync(getConfigFilePath(), {encoding: "utf-8"});
    const rawConfig: RawConfig = JSON.parse(data) as RawConfig;

    if (validateConfig(rawConfig)) {
        return {
            dbUrl: rawConfig.db_url,
            currentUserName: rawConfig.user,
        };
    }

    return undefined;
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

function validateConfig(rawConfig: any): boolean {
    if (!rawConfig) {
        return false;
    }

    if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
        return false;
    }

    if (!rawConfig.user || typeof rawConfig.user !== "string") {
        return false;
    }

    return true;
}
