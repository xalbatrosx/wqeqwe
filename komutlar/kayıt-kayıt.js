const Discord = require("discord.js");
const db = require("nrc.db")
const ayarlar = require("../ayarlar.json")


module.exports = {
    calistir: async(client, message, args) => {


const menu = new Discord.MessageEmbed()
.setDescription(`

**${ayarlar.prefix}kayıt kayıt-yetkilisi** : Kayıt Yetkilisi Rolünü Ayarlarsın.
**${ayarlar.prefix}kayıt erkek-rol**       : Erkek Üye Rolünü Ayarlarsın
**${ayarlar.prefix}kayıt kız-rol**         : Kız Üye Rolünü Ayarlarsın
**${ayarlar.prefix}kayıt kayıtsız-rol**    : Kayıtsız Rolünü Ayarlarsın.
**${ayarlar.prefix}kayıt kayıt-log**       : Kayıt Log Kanalını Ayarlarsın.
**${ayarlar.prefix}kayıt kayıt-kanal**     : Kayıt Kanalını Ayarlarsın.
`)

if(!args[0]) return message.reply({embeds: [menu]})

if(args[0] === "kayıt-yetkilisi"){
let rol = message.mentions.roles.first()

if(!rol) return message.reply(`Lütfen **Kayıt Yetkilisi** Rolünü Etiketleyiniz.`)
db.set(`kayıt_yetkili_${message.guild.id}`, rol.id)
message.reply(`Başarılı Bir Şekilde **Kayıt Yetkilisi** Rolü ${rol} Olarak Ayarlandı.`)
}

if(args[0] === "erkek-rol"){
let rol = message.mentions.roles.first()

if(!rol) return message.reply(`Lütfen **Erkek** Rolünü Etiketleyiniz.`)
db.set(`kayıt_erkek_rol_${message.guild.id}`, rol.id)
message.reply(`Başarılı Bir Şekilde **Erkek** Rolü ${rol} Olarak Ayarlandı.`)
}
if(args[0] === "kız-rol"){
let rol = message.mentions.roles.first()

if(!rol) return message.reply(`Lütfen **Kız** Rolünü Etiketleyiniz.`)
db.set(`kayıt_kız_rol_${message.guild.id}`, rol.id)
message.reply(`Başarılı Bir Şekilde **Kız** Rolü ${rol} Olarak Ayarlandı.`)
}
if(args[0] === "kayıtsız-rol"){
let rol = message.mentions.roles.first()

if(!rol) return message.reply(`Lütfen **Kayıtsız** Rolünü Etiketleyiniz.`)
db.set(`kayıt_kayıtsız_rol_${message.guild.id}`, rol.id)
message.reply(`Başarılı Bir Şekilde **Kayıtsız** Rolü ${rol} Olarak Ayarlandı.`)
}

if(args[0] === "kayıt-log"){
let kanal = message.mentions.channels.first()

if(!kanal) return message.reply(`Lütfen **Kayıt Log** Kanalını Etiketleyiniz.`)
db.set(`kayıt_kayıt_log_${message.guild.id}`, kanal.id)
message.reply(`Başarılı Bir Şekilde **Kayıt Log** Kanalı ${kanal} Olarak Ayarlandı.`)
}


if(args[0] === "kayıt-kanal"){
let kanal = message.mentions.channels.first()

if(!kanal) return message.reply(`Lütfen **Kayıt Kanal** Kanalını Etiketleyiniz.`)
db.set(`kayıt_kayıt_kanal_${message.guild.id}`, kanal.id)
message.reply(`Başarılı Bir Şekilde **Kayıt Kanal** Kanalı ${kanal} Olarak Ayarlandı.`)
}
},

name: "kayıt",
description: "Kayıt Sistemini Ayarlarsın.",
aliases: [],
kategori: "kayıt",
usage: "kayıt",
}