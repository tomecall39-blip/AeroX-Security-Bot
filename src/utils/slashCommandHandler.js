'use strict';

const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

/**
 * Converts a prefix command to a slash command
 */
function convertToSlashCommand(cmd) {
    const slashCmd = {
        name: cmd.name,
        description: cmd.description || "No description provided",
        dm_permission: false,
    };

    // Add options if the command uses arguments
    if (cmd.options && Array.isArray(cmd.options)) {
        slashCmd.options = cmd.options;
    }

    return slashCmd;
}

/**
 * Register slash commands with Discord
 */
async function registerSlashCommands(token, clientId, guildId = null) {
    const rest = new REST({ version: "10" }).setToken(token);

    try {
        console.log("🔄 Refreshing slash commands...");

        const commands = [];
        const path = require("path");
        const basePath = path.join(__dirname, "..", "commands");
        const { readdirSync } = require("fs");

        // Load all commands
        for (const dir of readdirSync(basePath)) {
            const files = readdirSync(path.join(basePath, dir)).filter((f) => f.endsWith(".js"));
            for (const file of files) {
                const cmd = require(path.join(basePath, dir, file));
                if (cmd?.name) {
                    commands.push(convertToSlashCommand(cmd));
                }
            }
        }

        const route = guildId
            ? Routes.applicationGuildCommands(clientId, guildId)
            : Routes.applicationCommands(clientId);

        const data = await rest.put(route, { body: commands });

        console.log(`✅ Successfully registered ${data.length} slash commands!`);
        return data;
    } catch (error) {
        console.error("❌ Error registering slash commands:", error);
        throw error;
    }
}

module.exports = { registerSlashCommands, convertToSlashCommand };