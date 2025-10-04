const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// ------------------ Serveur Express ------------------
const app = express();
const PORT = process.env.PORT || 3000;

// Simple route pour vérifier si le serveur est alive
app.get('/', (req, res) => {
  res.send('Bot Discord en ligne ✅');
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`🌐 Serveur web en ligne sur le port ${PORT}`);
});

// ------------------ Bot Discord ------------------
client.once('ready', () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // Ici tu peux charger tes commandes depuis ./commands
  try {
    const command = require(`./commands/${interaction.commandName}.js`);
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Une erreur est survenue', ephemeral: true });
  }
});

// Lancer le bot
client.login(process.env.TOKEN);
