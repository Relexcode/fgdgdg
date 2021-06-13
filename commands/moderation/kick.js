
const { Client, Message, MessageEmbed } = require('discord.js');
const sendError = require('../../mores/error.js');

module.exports = {
    name: 'kick',
    description: 'kick a user from the guild',
    usage: 'kick [user] [reason]',
    category: '🔨 moderation', 
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.guild.me.permissions.has("KICK_MEMBERS")){
            return sendError("I Don't Have Permission To kick Members!", message.channel)
        }
        if(!message.member.permissions.has("KICK_MEMBERS")){
            return sendError("You Dont Have Permission To kick Members!", message.channel)
        }
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let reason = args.slice(1).join(" ")

        if(!target){
            return sendError("Please Mention A User", message.channel)
        }
        if(!reason){
            return sendError("Please Enter A Reason...", message.channel)
        }
        if(target === message.guild.owner){
            return sendError("What? You Can't Kick Owner!", message.channel)
        }
        if(target === message.author){
            return sendError("I Will Kick You Sometimes")
        }
        if(target.kickable){
            let embed = new MessageEmbed()
            .setTitle("kicked")
            .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`kicked:\n**__USER:__** ${target}
            **__REASON:__** \`${reason}\`
            **__AUTHOR__:** <@${message.author.id}>`)
            .setColor("RANDOM")
            .setFooter("KICK_MEMBER COMMAND")

            message.channel.send(embed)
            target.kick()
        } else {
            return sendError("Please Check My Role, Or Make My Role Higher Than Everyone.", message.channel)
        }
    }
}