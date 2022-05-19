const Discord = require("discord.js");
const db = require("nrc.db")
const ayarlar = require("../ayarlar.json")


module.exports = {
    calistir: async(client, message, args) => {


        let bos = args[0]
  

if(!bos) return message.reply(`Lütfen Komudu Doğru Kullanınız. **Doğru Kullanım: ${ayarlar.prefix}hg-bb kanal #kanal **`)


if(args[0] == "kanal") {

    let kanal = message.mentions.channels.first();
    if(!kanal) return message.reply(`Lütfen Bir Kanal Etiketleyiniz ** Doğru Kullanım ${ayarlar.prefix}hg-bb kanal #kanal **`)


    db.set(`hg_bb_kanal_${message.guild.id}`, kanal.id)

    message.reply(`Başarılı Bir Şekilde Hoşgeldin BayBay Kanalı ${kanal} Olarak Ayarlandı.`)

}

if(args[0] == "sıfırla") {

    db.delete(`hg_bb_kanal_${message.guild.id}`)
    message.reply(`Başarılı Bir Şekilde Sıfırlandı.`)
}



},

name: "hg-bb",
description: "Hoşgeldin BayBay Kanalını Ayarlarsınız",
aliases: [],
kategori: "moderasyon",
usage: "",
}
