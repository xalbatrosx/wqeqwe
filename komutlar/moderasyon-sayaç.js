const Discord = require("discord.js");
const db = require("nrc.db")
const ayarlar = require("../ayarlar.json")


module.exports = {
    calistir: async(client, message, args) => {



const menu = new Discord.MessageEmbed()
.setAuthor(`Hatalı Kullanım.`)
.setColor(`RANDOM`)
.setDescription(`
${ayarlar.prefix}sayaç log : Sayaş Logunu Ayaralarsınız.
${ayarlar.prefix}sayaç hedef : Sayaş Hedefini Belirlersiniz.
`)
if(!args[0]) return message.reply({embeds:[menu]})

if(args[0] === "log"){
    let kanal = message.mentions.channels.first();

if(!kanal) return message.reply(`Lütfen Log Kanalını Belirtiniz.`)
db.set(`sayaç_log_${message.guild.id}`, kanal.id)
message.reply(`Başarılı Bir Şekilde Sayaç Log ${kanal} Olarak Belirlendi.`)
}

if(args[0] === "hedef"){
let hedef = args[1]

if(!hedef) return message.reply(`Hedef Üye Sayısını Belirtiniz.`)
if(isNaN(hedef)) return message.reply(`Hedef Sayı İle Olmalıdır.`)

db.set(`sayaç_hedef_${message.guild.id}`,hedef)
message.reply(`Sayaç Hedefi **${hedef}** Olarak Ayarlandı.`)
}

if(args[0] === "sıfırla"){

let kontrol1 = db.fetch(`sayaç_log_${message.guild.id}`)
let kontrol2 = db.fetch(`sayaç_hedef_${message.guild.id}`)

if(!kontrol1 && !kontrol2) return message.reply(`Zaten Ayarlanmamış.`)
if(kontrol1) db.delete(`sayaç_log_${message.guild.id}`)
if(kontrol2) db.delete(`sayaç_hedef_${message.guild.id}`)
message.reply(`Sayaç Ayarlamaları Sıfırlanmıştır.`)
}



},

name: "sayaç",
description: "Sayaç Sistemini Ayarlarsınız.",
aliases: [""],
kategori: "moderasyon",
usage: "",
}