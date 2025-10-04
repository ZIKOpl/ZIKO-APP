const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rep')
    .setDescription('Créer un rapport de vente en une seule ligne')
    .addUserOption(option =>
      option.setName('vendeur')
        .setDescription('Utilisateur qui vend')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('item')
        .setDescription('Choisir l’item')
        .setRequired(true)
        .addChoices(
          { name: 'Nitro Boost (1 mois)', value: 'Nitro Boost (1 mois)' },
          { name: '14 Server Boost', value: '14 Server Boost' }
        ))
    .addIntegerOption(option =>
      option.setName('quantite')
        .setDescription('Quantité de l’item')
        .setRequired(true))
    .addNumberOption(option =>
      option.setName('prix')
        .setDescription('Prix en euros')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('paiement')
        .setDescription('Moyen de paiement')
        .setRequired(true)
        .addChoices(
          { name: 'PayPal', value: 'PayPal' },
          { name: 'LTC', value: 'LTC' }
        )),

  async execute(interaction) {
    const vendeur = interaction.options.getUser('vendeur');
    const item = interaction.options.getString('item');
    const quantite = interaction.options.getInteger('quantite');
    const prix = interaction.options.getNumber('prix');
    const paiement = interaction.options.getString('paiement');

    const message = `+rep <@${vendeur.id}> x${quantite} ${item} ${prix}€ via ${paiement}`;

    await interaction.reply({ content: message });
  }
};
