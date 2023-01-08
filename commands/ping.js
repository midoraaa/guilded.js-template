const { Embed } = require("guilded.js");

module.exports = {
  name: "ping",
  aliases: ["p"],
  description: "Show the bot latency",
  run: async (client, message, args) => {
    const embed = new Embed()
      .setTitle("🏓 Ping pong")
      .setDescription(
        `**Latency: \`${
          Date.now() - message.createdAt
        }ms\`**\n\n**API Latency: \`${Math.round(client.ws.ping)}ms\`**`
      )
      .setColor([24, 72, 160]); //RGB code
    message.reply(embed);
  },
};
