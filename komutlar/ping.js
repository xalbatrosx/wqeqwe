const Discord = require("discord.js");



module.exports = {
    calistir: async(client, message, args) => {


const embed = new Discord.MessageEmbed()
.setColor("BLUE")
.setAuthor("Harlex ❤️")
.setDescription(`Botun Pingi: ${Math.round(message.client.ws.ping)} MS`)

message.reply({embeds: [embed]})


},

name: "ping",
description: "Botun Anlık Pingini Görürsünüz.",
aliases: [],
kategori: "bot",
usage: "",
}