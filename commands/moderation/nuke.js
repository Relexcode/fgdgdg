const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'nuke',
    run: async(client, message, args) => {
        const member = message.mentions.members.first()  || message.author;
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('Stop IT Get Some Help You Need Permissions For This');

        await message.channel.clone().then((ch) => {
            ch.setParent(message.channel.parent.id);
            ch.setPosition(message.channel.position);
            message.channel.delete();

            ch.send(
                new MessageEmbed()
                .setTitle(`Nuked`)
                .setDescription(`**This Channel Has Been Nuked By : ${member} ... Well i Hope IT Nuked SuccessFully:nerd:!**`)
                .setColor('RED')
            )
        })
    }
}