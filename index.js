const { Collection } = require("@discordjs/collection");
const { Client } = require("guilded.js");
const fs = require('fs')
const config = require("./config.json");
require("dotenv").config();

const client = new Client({
  token: process.env["TOKEN"],
});

client.commands = new Collection();
client.aliases = new Collection();
client.prefix = config.prefix || process.env["PREFIX"];
client.config = config;

client.on("ready", () => {
  console.log(`Bot is successfully logged in as ${client.user.name}`);
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.log("Could not find any commands!");
  const jsFiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) return console.log("Could not find any commands!");
  jsFiles.forEach((file) => {
    const cmd = require(`./commands/${file}`);
    console.log(`Loaded ${file}`);
    client.commands.set(cmd.name, cmd);
    if (cmd.aliases)
      cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
  });
});

client.on("messageCreated", async (message) => {
  const prefix = config.prefix || process.env["PREFIX"];
  const member = await client.members.fetch(
    message.serverId,
    message.createdById
  );
  if (!message.content.startsWith(prefix) || member.user.type == "bot") return;

  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));
  if (!cmd) return;
  try {
    cmd.run(client, message, args);
  } catch (e) {
    console.error(e);
    message.reply(`There was an error trying to execute that command!`);
  }
  
});

client.login();
