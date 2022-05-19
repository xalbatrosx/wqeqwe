const Discord = require("discord.js");
const db = require("nrc.db")
const ayarlar = require("../ayarlar.json")


module.exports = {
    calistir: async(client, message, args) => {


const menu = new Discord.MessageEmbed()
.setDescription(`
${ayarlar.prefix}çalış maden : Madende Çalışırsın 
${ayarlar.prefix}çalış odun  : Odun Toplarsın`)

if(!args[0]) return message.reply({embeds:[menu]})


if(args[0] === "odun"){
    

let kontrol = db.fetch(`balta_${message.author.id}`)
if(!kontrol) return message.reply(`Yeterince Baltanız Yok.`)

let miktarlar = [
    "2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","3","3","3","3","3","3","3","3","4","4","4","4","4","4","5","5","5","5","5",
]

let son = miktarlar[Math.floor(Math.random() * miktarlar.length)]

let kontrol2 = db.fetch(`odun_${message.author.id}`)
if(!kontrol2) db.set(`odun_${message.author.id}`, 0)
db.add(`odun_${message.author.id}`, Number(son))

let kontrol3 = db.fetch(`balta_hak_${message.author.id}`)
if(!kontrol3) db.set(`balta_hak_${message.author.id}`, 0)
db.add(`balta_hak_${message.author.id}`, 1)

if(db.fetch(`balta_hak_${message.author.id}`) >= 5){
    db.set(`balta_hak_${message.author.id}`, 0)
    db.add(`balta_${message.author.id}`, -1)
    message.reply(`Bir Adet Baltanın Ne Yazıkki Kullanım Hakkı Bitti.`)
}

message.reply(`Başarılı Bir Şekilde **${son}** Adet Odun Topladın.`)
}






if(args[0] === "maden"){


    let kontrol = db.fetch(`kazma_${message.author.id}`)
    if(!kontrol) return message.reply(`Yeterince Kazman Yok.`)


let madentur = [
   "kömür","kömür","kömür","kömür","kömür","kömür","kömür","kömür","kömür","kömür","kömür","kömür","demir","demir","demir","demir","demir","demir","demir","demir","demir","demir","altın","altın","altın","altın","altın","altın","altın","elmas","elmas","elmas","elmas","elmas",
]

let son = madentur[Math.floor(Math.random() * madentur.length)]


if(son === "kömür"){
    let miktarlar = [
        "2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","3","3","3","3","3","3","3","3","4","4","4","4","4","4","5","5","5","5","5",
    ]
    let son = miktarlar[Math.floor(Math.random() * miktarlar.length)]
    let kontrol = db.fetch(`kömür_${message.author.id}`)
    if(!kontrol) db.set(`kömür_${message.author.id}`, 0)
    db.add(`kömür_${message.author.id}`, Number(son))
    message.reply(`Başarılı Bir Şekilde Maden Yapıldı Ve **${son}** Adet Kömür Çıkardınız.`)



}else if(son === "demir"){
    let miktarlar = [
        "2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","3","3","3","3","3","3","3","3","4","4","4","4","4","4","5","5","5","5","5",
    ]
    let son = miktarlar[Math.floor(Math.random() * miktarlar.length)]
    let kontrol = db.fetch(`demir_${message.author.id}`)
    if(!kontrol) db.set(`demir_${message.author.id}`, 0)
    db.add(`demir_${message.author.id}`, Number(son))
    message.reply(`Başarılı Bir Şekilde Maden Yapıldı Ve **${son}** Adet Demir Çıkardınız.`)
}else if(son === "altın"){
    let miktarlar = [
        "2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","3","3","3","3","3","3","3","3","4","4","4","4","4","4","5","5","5","5","5",
    ]
    let son = miktarlar[Math.floor(Math.random() * miktarlar.length)]
    let kontrol = db.fetch(`altın_${message.author.id}`)
    if(!kontrol) db.set(`altın_${message.author.id}`, 0)
    db.add(`altın_${message.author.id}`, Number(son))
    message.reply(`Başarılı Bir Şekilde Maden Yapıldı Ve **${son}** Adet Altın Çıkardınız.`)
}else{
    let miktarlar = [
        "2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","3","3","3","3","3","3","3","3","4","4","4","4","4","4","5","5","5","5","5",
    ]
    let son = miktarlar[Math.floor(Math.random() * miktarlar.length)]
    let kontrol = db.fetch(`elmas_${message.author.id}`)
    if(!kontrol) db.set(`elmas_${message.author.id}`, 0)
    db.add(`elmas_${message.author.id}`, Number(son))
    message.reply(`Başarılı Bir Şekilde Maden Yapıldı Ve **${son}** Adet Elmas Çıkardınız.`)
}

let kontrol3 = db.fetch(`kazma_hak_${message.author.id}`)
if(!kontrol3) db.set(`kazma_hak_${message.author.id}`, 0)
db.add(`kazma_hak_${message.author.id}`, 1)

if(db.fetch(`kazma_hak_${message.author.id}`) >= 5){
    db.set(`kazma_hak_${message.author.id}`, 0)
    db.add(`kazma_${message.author.id}`, -1)
    message.reply(`Bir Adet Kazma'nın Ne Razıkki Kullanım Hakkı Bitti.`)
}
}
},

name: "çalış",
description: "Maden Veya Ormanda Çalışırsınız",
aliases: [""],
kategori: "ekonomi",
usage: "",
}