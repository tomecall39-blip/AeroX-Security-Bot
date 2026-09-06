const { ContainerBuilder, TextDisplayBuilder, MessageFlags } = require("discord.js");

module.exports = (client) => {
    client.on("interactionCreate", async (interaction) => {
        // Slash commands are disabled - only prefix commands are supported
        if (interaction.isChatInputCommand()) {
            return interaction.reply({
                content: "Slash commands are not supported. Please use the prefix command instead.",
                flags: 64 // Ephemeral
            }).catch(() => {});
        }

        if (!interaction.isButton()) return;

        if (interaction.customId === "cmd_delete") {
            if (interaction.message.interaction?.user?.id !== interaction.user.id) {
                return interaction.reply({ content: "You cannot delete this message!", flags: 64 });
            }
            await interaction.message.delete().catch(() => {});
        }
    });
};
