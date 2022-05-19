const Discord = require("discord.js");
const db = require("nrc.db")
const ayarlar = require("../ayarlar.json")


module.exports = {
    calistir: async(client, message, args) => {


let coin = db.fetch(`coin_${message.author.id}`)
let miktar = args[1]

let user = message.mentions.users.first();

if(!user) return message.reply(`Lütfen Gönderilecek Kişiyi Belirtiniz.`)
if(message.author.id === user.id) return message.reply(`Kendine Para Gönderemezsin.`)
if(user.bot === true) return message.reply(`Bir Bota Coin Gönderemezsiniz.`)
if(!miktar) return message.reply(`Lütfen Gönderilecek Miktarı Giriniz.`)
if(isNaN(miktar)) return message.reply(`Gönderilecek Miktar Sayı İle Olmalıdır.`)
if(coin < miktar) return message.reply(`Gönderilecek Miktar Cüzdanınızda Yok.`)

db.add(`coin_${message.author.id}`, -Number(miktar))
let kontrol = db.fetch(`coin_${user.id}`)
if(!kontrol) db.set(`coin_${user.id}`,0)
db.add(`coin_${user.id}`, Number(miktar))
message.reply(`Başarılı Bir Şekilde **${miktar}** Miktar Coin ${user} İsimli Kişiye Gönderildi.`)


},

name: "coin-gönder",
description: "Etiketlediğiniz Kişiye Coin Gönderir",
aliases: [""],
kategori: "ekonomi",
usage: "",
}