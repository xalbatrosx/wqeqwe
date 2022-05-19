const Discord = require("discord.js");
const db = require("nrc.db")
const ayarlar = require("../ayarlar.json")


module.exports = {
    calistir: async(client, message, args) => {












    if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Bu Komudu Kullanabilmek İçin Sunucuyu Yönet Yetkisine Sahip Olmanız Gerekmekte.")



const muteyardım = new Discord.MessageEmbed()
.setDescription(`
**${ayarlar.prefix}mute-ayar rol** : Mute Atılan Kişiye Verilecek Rolü Belirtlersiniz.
**${ayarlar.prefix}mute-ayar log** : Mute Atılınca Logun Tutulacağı Yeri Ayarlarsın.
**${ayarlar.prefix}mute-ayar mute-yetkilisi** : Mute Atabilecek Rolü Ayarlarsın.


`)


if(!args[1]) return message.reply({embeds:[muteyardım]})

if(args[0] == "rol") {

let rol = message.mentions.roles.first();


if(!rol) return message.reply(`Lütfen Bir **Mute** Rolü Belirleyiniz`)

db.set(`mute_rol_${message.guild.id}`, rol.id)

message.reply(`Mute Atıldığında Kişinin Tüm Rollerini Alıp ${rol} İsimli Rolü Vericeğim.`)




}

if(args[0] == "mute-yetkilisi"){

    let rol = message.mentions.roles.first();
    
    
    if(!rol) return message.reply(`Lütfen Bir **Mute Yetkilisi** Rolü Belirleyiniz`)
    
    db.set(`mute_yetkilirol_${message.guild.id}`, rol.id)
    
    message.reply(`Sadece ${rol} İsimli Rolü Olan Kişiler Mute Atabilecek.`)

    
    }
    

    if(args[0] == "log"){

        let kanal = message.mentions.channels.first();
        
        
        if(!kanal) return message.reply(`Lütfen Bir **Mute Log** Kanalı Belirleyiniz`)
        
        db.set(`mute_kanal_${message.guild.id}`, kanal.id)
        
        message.reply(`Mute Atıldığında Artık ${kanal} İsimli Kanalda Log Tutucam`)
    
        
        }


},

name: "mute-ayar",
description: "Mute Ayarlarını Yaparsınız",
aliases: [""],
kategori: "moderasyon",
usage: "",
}