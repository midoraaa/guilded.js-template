const { Embed } = require("guilded.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Show the bot latency",
  run: async (client, message, args) => {
    const embed = new Embed()
      .setTitle(`Help Panel - ${client.user.name}`)
      .setDescription(
        `The bot prefix is: **\`${
          client.prefix
        }\`**\n\n**❯ Commands [${client.commands.size}]**\n${client.commands
          .map((cmd) => `\`${cmd.name} (${cmd.aliases})\``)
          .join(" | ")}`
      )
            .setFooter(`© midora`)
      .setTimestamp()
      .setColor([24, 72, 160]); //RGB code
    message.reply(embed);
  },
};
