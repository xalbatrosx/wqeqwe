const Discord = require("discord.js");
const db = require("nrc.db")
const ayarlar = require("../ayarlar.json")
const {MessageActionRow, MessageButton} = require("discord.js")
const ms = require("ms")


module.exports = {
    calistir: async(client, message, args) => {





    let kontrol = db.fetch(`mute_rol_${message.guild.id}`)
    let kontrolkanal = db.fetch(`mute_kanal_${message.guild.id}`)
    let kontrolmuteytkrol = db.fetch(`mute_yetkilirol_${message.guild.id}`)
    
    
    if(!kontrol) return message.reply(`Mute Rolü Ayarlanmamış. Ayarlamak için **${ayarlar.prefix}mute-ayar rol @mute**`)
    if(!kontrolkanal) return message.reply(`Mute Log Ayarlanmamış. Ayarlamak için **${ayarlar.prefix}mute-ayar log #kanal**`)
    if(!kontrolmuteytkrol) return message.reply(`Mute Yetkilisi Rolünü Ayarlayınız. Ayarlamak için **${ayarlar.prefix}mute-ayar mute-yetkilisi @yetkili** `)
    
    
if(!message.member.roles.cache.has(db.fetch(`mute_yetkilirol_${message.guild.id}`))) return message.reply(`Bu Komudu Sadece Ayarlanan **Mute Yetkilisi** Rolü Olan Kişiler Kullanabilir.`)

    let user = message.mentions.users.first();


    if(!user) return message.reply(`Lütfen Bir Kişi Etiketleyiniz`)

let mutesebep = args[1]



const butonlar = new MessageActionRow()
.addComponents(
    new MessageButton()
    .setCustomId('mute_red')
    .setLabel('İptal')
    .setStyle('DANGER'),
    new MessageButton()
        .setCustomId('mute_onay')
        .setLabel('Onayla')
        .setStyle('SUCCESS'),
      

);



const muteembed = new Discord.MessageEmbed()
.setDescription(`
${user}, isimli Kişiye Mute Atmak İstiyormusunz Mute Sebebi ${mutesebep ? mutesebep : "YOK"}
`)


    message.reply({embeds:[muteembed] , components: [butonlar] }).then(async function(mesaj) {

        setTimeout(async () => {
    mesaj.delete().catch(err =>  console.log("Mesaj Bulunamadığı İçin Silemedim"))
          }, ms('20s'));
    
        mesaj.createMessageComponentCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {


if(button.user.id !== message.author.id) return message.channel.send({ content: "Lütfen Başkasının Panelindeki Butona Erişmeye Çalışmayın", ephemeral: true})
let üye = message.guild.members.cache.get(user.id)
if(button.customId === "mute_onay"){

    let muterol = db.fetch(`mute_rol_${message.guild.id}`)
    üye.roles.set([ muterol ])
mesaj.delete().catch(err => console.log(`Mesajı Silemedim Silinmiş Olabilir`))
message.channel.send(`Başarılı Bir Şekilde ${user} İsimli Kişiye Mute Atıldı.`)
}


console.log(button.customId)

if(button.customId ===  "mute_red"){
    mesaj.delete().catch(err => console.log(`Mesajı Silemedim Silinmiş Olabilir`))
    message.channel.send(`Başarılı Bir Şekilde Mute İptal Edildi.`)
}



})

    }) 
    
},

name: "mute",
description: "Etiket Attığınız Kişiye Mute Atarsınız",
aliases: [""],
kategori: "moderasyon",
usage: "",
}