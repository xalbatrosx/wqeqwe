const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const moment = require("moment")
moment.locale("tr")
const db = require("nrc.db")
module.exports = {
    calistir: async(client, message, args) => {

const menu = new Discord.MessageEmbed()
.setDescription(`
**${ayarlar.prefix}hesap Kur** : Ekonomi Sistemi İçin Hesap Kurarsın.
**${ayarlar.prefix}hesap Sil** : Ekonimi Sistemindeki Hesabınızı Silersiniz.
`)

if(!args[0]) return message.reply({embeds: [menu]})

if(args[0] === "kur"){
let isim = args[1]

if(!isim) return message.reply(`Lütfen Hesap Adı Belirtiniz`)

db.set(`hesap_${message.author.id}`, isim)
db.set(`coin_${message.author.id}`, 0)
message.reply(`Hesabınız Başarılı Bir Şekilde Kurulmuştur.`)
}


if(args[0] === "sil"){

let kontrol = db.fetch(`hesap_${message.author.id}`)

if(!kontrol) return message.reply(`Zaten Hesabınız Yok`)
db.delete(`hesap_${message.author.id}`)
let kontrol2 = db.fetch(`coin_${message.author.id}`)

if(kontrol2) db.delete(`coin_${message.author.id}`)

message.reply(`Hesabınız Başarılı Bir Şekilde Sıfırlanmıştır.`)
}



},

name: "hesap",
description: "Hesap Kurarsın",
aliases: [],
kategori: "ekonomi",
usage: "",
}