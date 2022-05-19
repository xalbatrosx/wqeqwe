const Discord = require("discord.js");



module.exports = {
    calistir: async(client, message, args) => {

if(!message.member.permissions.has("MANAGE_ROLES")) return message.reply("Rolleri Yönet Yetkiniz Bulunmamakta.")

let user = message.mentions.users.first();
let rol = message.mentions.roles.first();

if(!user) return message.reply("Lütfen Rolün Verileceği Kişiyi Belirtiniz.")
if(!rol) return message.reply("Lütfen Verilecek Rolü Belirtiniz.")


message.guild.members.cache.get(user.id).roles.remove(rol)

const embed = new Discord.MessageEmbed()
.setColor("GOLD")
.setAuthor("Harlex ❤️")
.setDescription(`${user}, İsimli Kişiden ${rol} İsimli Rol Alındı.`)


message.reply({embeds:[embed]})





},

name: "rol-al",
description: "Belirlediğiniz Kişinin Rolünü Alırsınız.",
aliases: [],
kategori: "moderasyon",
usage: "",
}