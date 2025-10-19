const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('paypal')
    .setDescription('Affiche ton adresse PayPal enregistrée'),

  async execute(interaction) {
    const filePath = path.join(__dirname, '../database/users.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(rawData);

    const userId = interaction.user.id;
    if (!users[userId] || !users[userId].paypal) {
      return interaction.reply(`❌ Tu n'as pas encore enregistré ton PayPal. Fais \`/setpaypal\`.`);
    }

    await interaction.reply(`${users[userId].paypal}`);
  },
};
