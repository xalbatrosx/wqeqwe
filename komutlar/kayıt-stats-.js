const Discord = require("discord.js");
const db = require("nrc.db")
const ayarlar = require("../ayarlar.json")


module.exports = {
    calistir: async(client, message, args) => {





   let kayıt_ytk     =    db.fetch(`kayıt_yetkili_${message.guild.id}`)
   let kayıt_erkek   =    db.fetch(`kayıt_erkek_rol_${message.guild.id}`)
   let kayıt_kız     =      db.fetch(`kayıt_kız_rol_${message.guild.id}`)
   let kayıtsız      =     db.fetch(`kayıt_kayıtsız_rol_${message.guild.id}`)
   let kayıt_log     =     db.fetch(`kayıt_kayıt_log_${message.guild.id}`)
   let kayıt_kanal   =     db.fetch(`kayıt_kayıt_kanal_${message.guild.id}`)




if(!kayıt_ytk) return message.reply(`**Kayıt Yetkilisi** Rolü Ayarlanmamış.`)
if(!message.member.roles.cache.has(kayıt_ytk)) return message.reply(`Bu Komudu Sadece Ayarlanan **Kayıt Yetkilisi** Rolüne Sahip Olan Kişiler Kullanabilir`)
if(!kayıt_erkek) return message.reply(`**Erkek** Rolü Ayarlanmamış.`)
if(!kayıt_kız) return message.reply(`**Kız** Rolü Ayarlanmamış.`)
if(!kayıtsız) return message.reply(`**Kayıtsız** Rolü Ayarlanmamış.`)
if(!kayıt_log) return message.reply(`**Kayıt Log** Kanalı Ayarlanmamış.`)
if(!kayıt_kanal) return message.reply(`**Kayıt** Kanalı Ayarlanmamış.`)


let member = message.mentions.users.first() && message.author.id
let kayıt = db.fetch(`kayıt_yetkilisi_${message.guild.id}_${member}`)
const embed = new Discord.MessageEmbed()
.setDescription(`
Yaptığı Kayıt Sayısı: **${kayıt ? kayıt : "0"}**


`)
message.reply({embeds:[embed]})


},

name: "kayıt-stats",
description: "Kayıt Yetkilisinin Bilgilerine Bakarsın.",
aliases: ["me"],
kategori: "kayıt",
usage: "",
}