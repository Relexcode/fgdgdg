const db = require("quick.db");
const successs = require("../../mores/success")

module.exports = {
  name: "warns",
  description: "Get The Warnings OF The Mentioned User",
  category: "moderation",
  run: (client, message, args) => {
    const user = message.mentions.members.first() || message.author;
    const reason = args.slice(1).join(" ");
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) warnings = 0;

    if(warnings < 1) return successs(`${user} Have Total : **${warnings}** Warnings`)

    if(warnings > 1) return successs(`${user} Have Total : **${warnings}** Warnings`)
    return;
  }
};