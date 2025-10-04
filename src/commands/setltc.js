const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setltc')
    .setDescription('Enregistre ton adresse LTC')
    .addStringOption(option =>
      option
        .setName('adresse')
        .setDescription('Ton adresse Litecoin (LTC)')
        .setRequired(true)
    ),

  async execute(interaction) {
    const ltc = interaction.options.getString('adresse');
    const filePath = path.join(__dirname, '../database/users.json');
    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const userId = interaction.user.id;
    if (!users[userId]) users[userId] = {};
    users[userId].ltc = ltc;

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');

    // ✅ Message éphémère pour confirmer l’enregistrement
    await interaction.reply({
      content: `✅ Adresse LTC enregistrée : \`${ltc}\``,
      ephemeral: true
    });
  }
};
