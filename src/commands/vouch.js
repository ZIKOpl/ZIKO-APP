const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vouch')
    .setDescription('Envoie le lien du serveur vouch'),

  async execute(interaction) {
    const serverLink = 'https://discord.gg/fastshopfr'; // 🔗 Remplace par ton vrai lien d’invitation

    await interaction.reply(`${serverLink}`);
  },
};
