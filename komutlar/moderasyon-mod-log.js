const Discord = require("discord.js");
const db = require("nrc.db")
const ayarlar = require("../ayarlar.json")


module.exports = {
    calistir: async(client, message, args) => {

        let kanal = message.mentions.channels.first();
        if(!kanal) return message.reply(`Lütfen Modlog Kanalı Belirtiniz.`)
        db.set(`modlog_${message.guild.id}`, kanal.id)
        message.reply(`Modlog Kanalı Başarılı Bir Şekilde ${kanal} Olarak Ayarlandı.`)



},

name: "mod-log",
description: "Modlog Tutarsınız",
aliases: [""],
kategori: "mpderasyon",
usage: "",
}