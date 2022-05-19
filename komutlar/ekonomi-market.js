const Discord = require("discord.js");
const db = require("nrc.db")
const ayarlar = require("../ayarlar.json")


module.exports = {
    calistir: async(client, message, args) => {


const menu = new Discord.MessageEmbed()
.setDescription(`
> Alınabilirler;
Balta : **100**
Kazma : **150**
Odun  : **30**
Elmas : **60**
Altın : **50**
Demir : **40**
Kömür : **15**

> Satılabilirler;
Odun  : **20**
Elmas : **40**
Altın : **30**
Demir : **20**
Kömür : **5**
${ayarlar.prefix}market al/sat <ÜRÜN> `)

if(!args[0]) return message.reply({embeds:[menu]})

if(args[0] === "sat"){

    if(args[1] === "odun"){
        let urun = "odun"
        let urun2= "Odun"
        let fıyat = 20
        let odun = db.fetch(`${urun}_${message.author.id}`)
        if(!odun) return message.reply(`${urun2} Hiç Yok.`)
        let miktar = args[2]
        if(!miktar) return message.reply(`Satılacak Miktarı Belirtiniz.`)
        if(isNaN(miktar))return message.reply(`Miktar Sayı İle Olmalıdır.`) 
        if(miktar > odun) message.reply(`Bu Kadar ${urun2} Sahip Değilsiniz.`)
        let kontrol = db.fetch(`coin_${message.author.id}`)
        if(!kontrol) db.set(`coin_${message.author.id}`, 0)
        var son = miktar*fıyat
        db.add(`${urun}_${message.author.id}`, -miktar)
        db.add(`coin_${message.author.id}`, son)
        message.reply(`Başarılı Bir Şekilde **${miktar}** Adet ${urun2} Satıldı.`)
    }
    if(args[1] === "elmas"){
        let urun = "elmas"
        let urun2= "Elmas"
        let fıyat = 40
        let odun = db.fetch(`${urun}_${message.author.id}`)
        if(!odun) return message.reply(`${urun2} Hiç Yok.`)
        let miktar = args[2]
        if(!miktar) return message.reply(`Satılacak Miktarı Belirtiniz.`)
        if(isNaN(miktar))return message.reply(`Miktar Sayı İle Olmalıdır.`) 
        if(miktar > odun) message.reply(`Bu Kadar ${urun2} Sahip Değilsiniz.`)
        let kontrol = db.fetch(`coin_${message.author.id}`)
        if(!kontrol) db.set(`coin_${message.author.id}`, 0)
        var son = miktar*fıyat
        db.add(`${urun}_${message.author.id}`, -miktar)
        db.add(`coin_${message.author.id}`, son)
        message.reply(`Başarılı Bir Şekilde **${miktar}** Adet ${urun2} Satıldı.`)
    }
    if(args[1] === "altın"){
        let urun = "altın"
        let urun2= "Altın"
        let fıyat = 30
        let odun = db.fetch(`${urun}_${message.author.id}`)
        if(!odun) return message.reply(`${urun2} Hiç Yok.`)
        let miktar = args[2]
        if(!miktar) return message.reply(`Satılacak Miktarı Belirtiniz.`)
        if(isNaN(miktar))return message.reply(`Miktar Sayı İle Olmalıdır.`) 
        if(miktar > odun) message.reply(`Bu Kadar ${urun2} Sahip Değilsiniz.`)
        let kontrol = db.fetch(`coin_${message.author.id}`)
        if(!kontrol) db.set(`coin_${message.author.id}`, 0)
        var son = miktar*fıyat
        db.add(`${urun}_${message.author.id}`, -miktar)
        db.add(`coin_${message.author.id}`, son)
        message.reply(`Başarılı Bir Şekilde **${miktar}** Adet ${urun2} Satıldı.`)
    }
    if(args[1] === "kömür"){
        let urun = "kömür"
        let urun2= "Kömür"
        let fıyat = 5
        let odun = db.fetch(`${urun}_${message.author.id}`)
        if(!odun) return message.reply(`${urun2} Hiç Yok.`)
        let miktar = args[2]
        if(!miktar) return message.reply(`Satılacak Miktarı Belirtiniz.`)
        if(isNaN(miktar))return message.reply(`Miktar Sayı İle Olmalıdır.`) 
        if(miktar > odun) message.reply(`Bu Kadar ${urun2} Sahip Değilsiniz.`)
        let kontrol = db.fetch(`coin_${message.author.id}`)
        if(!kontrol) db.set(`coin_${message.author.id}`, 0)
        var son = miktar*fıyat
        db.add(`${urun}_${message.author.id}`, -miktar)
        db.add(`coin_${message.author.id}`, son)
        message.reply(`Başarılı Bir Şekilde **${miktar}** Adet ${urun2} Satıldı.`)
    }
    if(args[1] === "demir"){
        let urun = "demir"
        let urun2= "Demir"
        let fıyat = 20
        let odun = db.fetch(`${urun}_${message.author.id}`)
        if(!odun) return message.reply(`${urun2} Hiç Yok.`)
        let miktar = args[2]
        if(!miktar) return message.reply(`Satılacak Miktarı Belirtiniz.`)
        if(isNaN(miktar))return message.reply(`Miktar Sayı İle Olmalıdır.`) 
        if(miktar > odun) message.reply(`Bu Kadar ${urun2} Sahip Değilsiniz.`)
        let kontrol = db.fetch(`coin_${message.author.id}`)
        if(!kontrol) db.set(`coin_${message.author.id}`, 0)
        var son = miktar*fıyat
        db.add(`${urun}_${message.author.id}`, -miktar)
        db.add(`coin_${message.author.id}`, son)
        message.reply(`Başarılı Bir Şekilde **${miktar}** Adet ${urun2} Satıldı.`)
    }

}



if(args[0] === "al"){
    
if(args[1] === "balta"){
    let urun = "balta"
    let urun2 = "Balta"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak Miktarı Belirtiniz`)
    if(isNaN(miktar)) return message.reply(`Belirtlilen Miktar Sayı İle Olmalıdır.`)
    var son = miktar*100
    if(coin < son) return message.reply(`${son-coin} Miktar Coine İhtiyacınız Var.`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde **${son}** ${urun2} Aldınız.`)
    }
   if(args[1] === "kazma"){
    let urun = "kazma"
    let urun2 = "Kazma"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak Miktarı Belirtiniz`)
    if(isNaN(miktar)) return message.reply(`Belirtlilen Miktar Sayı İle Olmalıdır.`)
    var son = miktar*150
    if(coin < son) return message.reply(`${son-coin} Miktar Coine İhtiyacınız Var.`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde **${son}** ${urun2} Aldınız.`)
    }
    if(args[1] === "elmas"){
    let urun = "elmas"
    let urun2 = "Elmas"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak Miktarı Belirtiniz`)
    if(isNaN(miktar)) return message.reply(`Belirtlilen Miktar Sayı İle Olmalıdır.`)
    var son = miktar*60
    if(coin < son) return message.reply(`${son-coin} Miktar Coine İhtiyacınız Var.`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde **${son}** ${urun2} Aldınız.`)
    }
    if(args[1] === "altın"){
    let urun = "altın"
    let urun2 = "Altın"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak Miktarı Belirtiniz`)
    if(isNaN(miktar)) return message.reply(`Belirtlilen Miktar Sayı İle Olmalıdır.`)
    var son = miktar*50
    if(coin < son) return message.reply(`${son-coin} Miktar Coine İhtiyacınız Var.`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde **${son}** ${urun2} Aldınız.`)
    }
    if(args[1] === "demir"){
    let urun = "demir"
    let urun2 = "Demir"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak Miktarı Belirtiniz`)
    if(isNaN(miktar)) return message.reply(`Belirtlilen Miktar Sayı İle Olmalıdır.`)
    var son = miktar*40
    if(coin < son) return message.reply(`${son-coin} Miktar Coine İhtiyacınız Var.`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde **${son}** ${urun2} Aldınız.`)
    }
    if(args[1] === "kömür"){
    let urun = "kömür"
    let urun2 = "Kömür"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak Miktarı Belirtiniz`)
    if(isNaN(miktar)) return message.reply(`Belirtlilen Miktar Sayı İle Olmalıdır.`)
    var son = miktar*15
    if(coin < son) return message.reply(`${son-coin} Miktar Coine İhtiyacınız Var.`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde **${son}** ${urun2} Aldınız.`)
    }
    if(args[1] === "odun"){
    let urun = "odun"
    let urun2 = "Odun"
    let coin = db.fetch(`coin_${message.author.id}`)
    let miktar = args[2]
    if(!miktar) return message.reply(`Alınacak Miktarı Belirtiniz`)
    if(isNaN(miktar)) return message.reply(`Belirtlilen Miktar Sayı İle Olmalıdır.`)
    var son = miktar*30
    if(coin < son) return message.reply(`${son-coin} Miktar Coine İhtiyacınız Var.`)
    let kontrol = db.fetch(`${urun}_${message.author.id}`)
    if(!kontrol) db.set(`${urun}_${message.author.id}`, 0)
    db.add(`${urun}_${message.author.id}`, 1)
    db.add(`coin_${message.author.id}`, -son)
    message.reply(`Başarılı Bir Şekilde **${son}** ${urun2} Aldınız.`)
    }
}

},

name: "market",
description: "Marketi Gösterir",
aliases: [""],
kategori: "ekonomi",
usage: "",
}