const {
    PermissionFlagsBits,
    ContainerBuilder,
    TextDisplayBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    MessageFlags,
} = require("discord.js");

const commandCooldowns = new Map();

const sep = () => new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small);

module.exports = async (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            return interaction.reply({
                content: "Command not found.",
                ephemeral: true,
            });
        }

        try {
            // Cooldown check
            const uid = interaction.user.id;
            const now = Date.now();
            const cooldownAmount = (command.cooldown || 3) * 1000;
            const cooldownKey = `${uid}-${command.name}`;

            if (commandCooldowns.has(cooldownKey)) {
                const expirationTime = commandCooldowns.get(cooldownKey);
                if (now < expirationTime) {
                    const remaining = Math.ceil((expirationTime - now) / 1000);
                    return interaction.reply({
                        content: `${client.emoji.error} Please wait **${remaining}** seconds to use **${command.name}** again.`,
                        ephemeral: true,
                    });
                }
            }

            commandCooldowns.set(cooldownKey, now + cooldownAmount);
            setTimeout(() => commandCooldowns.delete(cooldownKey), cooldownAmount);

            // Convert slash command interaction to message-like format for compatibility
            const fakeMessage = {
                author: interaction.user,
                member: interaction.member,
                guild: interaction.guild,
                channel: interaction.channel,
                mentions: {
                    users: new Map(),
                    members: new Map(),
                },
                reply: async (content) => {
                    if (interaction.replied) {
                        return interaction.followUp(content);
                    }
                    return interaction.reply(content);
                },
            };

            // Extract arguments from slash command options
            const args = [];
            if (interaction.options) {
                for (let i = 0; i < 25; i++) {
                    const arg = interaction.options.get(`arg${i}`);
                    if (arg) args.push(arg.value);
                }
            }

            // Run the command
            await command.run(client, fakeMessage, args, "/");
        } catch (error) {
            console.error(`Error executing slash command ${interaction.commandName}:`, error);

            const response = {
                content: "An error occurred while executing this command.",
                ephemeral: true,
            };

            if (interaction.replied || interaction.deferred) {
                return interaction.followUp(response);
            }
            return interaction.reply(response);
        }
    });
};