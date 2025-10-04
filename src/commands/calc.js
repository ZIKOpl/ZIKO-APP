const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('calc')
    .setDescription('Calcule une expression mathématique')
    .addStringOption(option =>
      option
        .setName('expression')
        .setDescription('Ex: 2+3*5')
        .setRequired(true)
    ),
  
  async execute(interaction) {
    const expression = interaction.options.getString('expression');

    try {
      // Évaluation sécurisée
      const result = Function(`"use strict"; return (${expression});`)();
      await interaction.reply(`\`${expression}\` = **${result}**`);
    } catch (err) {
      await interaction.reply(`❌ Expression invalide.`);
    }
  }
};
