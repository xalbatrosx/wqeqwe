const { Client, Intents, Collection, MessageAttachment, MessageEmbed, Permissions, Constants, ApplicationCommandPermissionsManager } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_BANS,Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,Intents.FLAGS.GUILD_INTEGRATIONS,Intents.FLAGS.GUILD_WEBHOOKS,Intents.FLAGS.GUILD_INVITES,Intents.FLAGS.GUILD_VOICE_STATES,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Intents.FLAGS.GUILD_MESSAGE_TYPING,Intents.FLAGS.DIRECT_MESSAGES,Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,Intents.FLAGS.DIRECT_MESSAGE_TYPING] });
const ayarlar = require("./ayarlar.json");
const Discord = require("discord.js")
const db = require("nrc.db");
const ms = require("ms")
const message = require("./events/message");
const { DiscordFivemApi } = require('discord-fivem-api');
let prefix = ayarlar.prefix;

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
  require(`./komutcalistirici`)(client);
}); 

client.on("ready", () => {
  require("./events/eventLoader")(client);
});

///// `saas_${message.guild.id}`

client.on("messageCreate", async msg => {

  let saas = db.fetch(`saas_${msg.guild.id}`)

if(saas == true) {

var sa = ["sa","SA","Sa","Sea","sea","Selamın Aleyküm","selamın aleyküm", "SELAMIN ALEKYÜM","Selam","selam","SELAM"]

if(sa.includes(msg.content.toLowerCase())){
msg.reply(`Aleyküm Selam Hoşgeldin Dostum.`)



}



}


})

client.on("guildMemberAdd", async member => {

/*

    db.delete(`otorol_kanal_${message.guild.id}`)
    db.delete(`otorol_rol_${message.guild.id}`)
*/


let kanal = db.fetch(`otorol_kanal_${member.guild.id}`)
let rol   = db.fetch(`otorol_rol_${member.guild.id}`)

if(!kanal) return;
if(!rol) return;

member.roles.add(rol)

client.channels.cache.get(kanal).send(`${member} Sunucuya Katıldı Ve Başarılı Bir Şekilde <@&${rol}> İsimli Rol Verildi.`)

})
client.on("guildMemberAdd", async member => {


let hgbb = db.fetch(`hg_bb_kanal_${member.guild.id}`)

if(!hgbb) return;

const hg = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`${member}, Aramıza Hoşgeldin`)
client.channels.cache.get(hgbb).send({embeds: [hg]})
})

client.on("guildMemberRemove", async member => {


  let hgbb = db.fetch(`hg_bb_kanal_${member.guild.id}`)
  
  if(!hgbb) return;
  
  const bb = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`${member}, Aramıza Ayrıldı`)
  client.channels.cache.get(hgbb).send({embeds: [bb]})
  })


  client.on("guildMemberAdd", async member => {


    let kontrol1 = db.fetch(`sayaç_log_${member.guild.id}`)
    let kontrol2 = db.fetch(`sayaç_hedef_${member.guild.id}`)

   if(!kontrol1) return;

   if(kontrol2){
   
   let kalan = kontrol2 - member.guild.memberCount

   if(kalan === 0) {
     client.channels.cache.get(kontrol1).send(`Yeni Biri Katıldı, ${member} Hoşgeldin. Seninle Beraber **${member.guild.memberCount}** Kişiyiz Sayaç Hedefimize Ulaştık.`)
     db.delete(`sayaç_hedef_${member.guild.id}`)
   }else{

    client.channels.cache.get(kontrol1).send(`Yeni Biri Katıldı, ${member} Hoşgeldin. Seninle Beraber **${member.guild.memberCount}** Kişiyiz Sayaç Hedefimize **${kalan}** Kişi Kaldı.`)

   }

   }else{

    client.channels.cache.get(kontrol1).send(`Yeni Biri Katıldı, ${member} Hoşgeldin. Seninle Beraber **${member.guild.memberCount}** Kişiyiz Sayaç Hedefimize Şu Anda Bulunmamaktadır..`)
   }

  })

setTimeout(() => {
  let liste = db.fetch(`vadeli_hesaplar`)
liste.forEach(elem => {
  
    
let coin = db.fetch(`banka_coin_vadeli_${elem}`)
let miktar = Number(coin)
if(!miktar) return;
if(miktar === 0) return;

var son = (miktar*5)/100
db.add(`banka_coin_vadeli_${elem}`, son)
message.reply(`<@${elem}> İsimli Kişinin Vadeli Kazancı **${son}** miktar coindir. `)
});

}, ms("4h"));

client.on("messageCreate", async message => {

  if(message.author.bot == true) return;

  let kontrol = db.fetch(`level_log_${message.guild.id}`)
  if(!kontrol) return;

  let xpmesaj = Number(db.fetch(`xp_mesaj_${message.guild.id}`))
  let kontrol2 = Number(db.fetch(`xp_${message.guild.id}_${message.author.id}`))
  if(!kontrol2) db.set(`xp_${message.guild.id}_${message.author.id}`, 0)
  db.add(`xp_${message.guild.id}_${message.author.id}`, xpmesaj)

  let kontrol3 = Number(db.fetch(`xp_${message.guild.id}_${message.author.id}`))
  let xplevel = Number(db.fetch(`xp_level_${message.guild.id}`))
  if(kontrol3 >= xplevel){
    console.log(db.fetch(`xp_${message.guild.id}_${message.author.id}`))
    console.log(db.fetch(`xp_level_${message.guild.id}`))
    let kontrol4 = db.fetch(`lvl_${message.guild.id}_${message.author.id}`)
    if(!kontrol4) db.set(`lvl_${message.guild.id}_${message.author.id}`, 0)
    db.add(`lvl_${message.guild.id}_${message.author.id}`, 1)
    let kontrol5 = db.fetch(`level_tebrik_${message.guild.id}`)

    db.set(`xp_${message.guild.id}_${message.author.id}`, 0)
    if(kontrol5 == true){
      message.reply(`Tebrikler Başarılı Bir Şekilde Yeni Level Atladınız. Yeni Leveliniz **${db.fetch(`lvl_${message.guild.id}_${message.author.id}`)}**`)
    }
  } 



})

//////////////  Modlog Başlangıc
client.on("channelCreate", async channel => {
  let kanal = db.fetch(`modlog_${channel.guild.id}`)
  if(!kanal) return;
  let user = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_CREATE' }).then(audit => audit.entries.first())

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Kanal Oluşturuldu")
  .setDescription(`
  
  Kanal İd : **${channel.id}**
  Kanal İsmi : **${channel.name}**
  Oluşturan Kişi: ${user.executor} **(${user.executor.id})**
  `)
  client.channels.cache.get(kanal).send({embeds:[embed]})

})

client.on("channelDelete", async channel => {
  let kanal = db.fetch(`modlog_${channel.guild.id}`)
  if(!kanal) return;
  let user = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' }).then(audit => audit.entries.first())

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Kanal Silindi")
  .setDescription(`
  
  Kanal İd : **${channel.id}**
  Kanal İsmi : **${channel.name}**
  Silen Kişi: ${user.executor} **(${user.executor.id})**
  `)
  client.channels.cache.get(kanal).send({embeds:[embed]})

})

client.on("channelUpdate", async (oldChannel, newChannel) => {
  let kanal = db.fetch(`modlog_${oldChannel.guild.id}`)
  if(!kanal) return;
  let user = await oldChannel.guild.fetchAuditLogs({ type: 'CHANNEL_UPDATE' }).then(audit => audit.entries.first())

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Kanal Güncellendi")
  .setDescription(`
  
  Kanal İd : **${oldChannel.id}**
  Eski Kanal İsmi : **${oldChannel.name}**
  Yeni Kanal İsmi : **${newChannel.name}**
  Güncelleyen Kişi: ${user.executor} **(${user.executor.id})**
  `)
  client.channels.cache.get(kanal).send({embeds:[embed]})

})  

client.on("emojiDelete", async emoji => {
  let kanal = db.fetch(`modlog_${emoji.guild.id}`)
  if(!kanal) return;
  let user = await emoji.guild.fetchAuditLogs({ type: 'EMOJİ_DELETE' }).then(audit => audit.entries.first())

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Emoji Silindi")
  .setDescription(`
  
  Emoji İd : **${emoji.id}**
  Emoji İsmi : **${emoji.name}**
  Silen Kişi: ${user.executor} **(${user.executor.id})**
  `)
  client.channels.cache.get(kanal).send({embeds:[embed]})

})  

client.on("emojiCreate", async emoji => {
  let kanal = db.fetch(`modlog_${emoji.guild.id}`)
  if(!kanal) return;
  let user = await emoji.guild.fetchAuditLogs({ type: 'EMOJİ_CREATE' }).then(audit => audit.entries.first())

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Emoji Oluşturuldu")
  .setDescription(`
  
  Emoji İd : **${emoji.id}**
  Emoji İsmi : **${emoji.name}**
  Oluşturan Kişi: ${user.executor} **(${user.executor.id})**
  `)
  client.channels.cache.get(kanal).send({embeds:[embed]})

})  

client.on("emojiUpdate", async (oldEmoji, newEmoji) => {
  let kanal = db.fetch(`modlog_${oldEmoji.guild.id}`)
  if(!kanal) return;
  let user = await oldEmoji.guild.fetchAuditLogs({ type: 'EMOJİ_UPDATE' }).then(audit => audit.entries.first())

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Emoji Güncellendi")
  .setDescription(`
  
  Emoji İd : **${oldEmoji.id}**
  Eski Emoji İsmi : **${oldEmoji.name}**
  Yeni Emoji İsmi : **${newEmoji.name}**
  Güncelleyen Kişi: ${user.executor} **(${user.executor.id})**
  `)
  client.channels.cache.get(kanal).send({embeds:[embed]})

})  

////////////// Modlog Bitiş



// Slash Başlangıç

client.on("ready", async() =>{
   
   
  // client.guilds.cache.get("975878166180663436").commands.set([]) // slash temizleme
  
   })
  
   client.on("ready", async() =>{
    let commands = client.guilds.cache.get("975878166180663436").commands;
  
    commands.create({
      name : "ping",
      description: "Botun Pingine Bakarsın."
    })
    commands.create({
      name : "ban",
      description: "İstediğiniz Kişiye Ban Atarsınız",
      options:[{
        name: "kullanıcı",
        description: "Banlanacak Kişiyi Yazınız",
        type: "USER",
      },
      {
        name: "sebep",
        description: "Banlama Sebebinizi Yazınız",
        type: "STRING",
      }]
    })
  
    commands.create({
      name : "kick",
      description: "İstediğiniz Kişiye Kick Atarsınız",
      options:[{
        name: "kullanıcı",
        description: "Kicklenecek Kişiyi Yazınız",
        type: "USER",
      },
      {
        name: "sebep",
        description: "Kick Sebebinizi Yazınız",
        type: "STRING",
      }]
    })
  
  
    commands.create({
      name : "rol",
      description: "Rol ver-al Komududur",
      options:[{
        name: "ver",
        description: "Rol Verirsin",
        type: "SUB_COMMAND",
        options:[{
          name: "kullanıcı",
          description: "Rol Verilecek Kullanıcıyı Velirtiniz.",
          type: "USER",
        },
        {        
          name: "rol",
          description: "Verilecek Olan Rolü Belirtiniz",
          type: "ROLE",
          }
          
      ]
      },
      {        
        name: "al",
        description: "Rol Alırsın",
        type: "SUB_COMMAND",
        options:[{
          name: "kullanıcı",
          description: "Rol Alınacak Kullanıcıyı Belirtiniz.",
          type: "USER",
        },
        {        
          name: "rol",
          description: "Alınacak Rolü Belirtiniz",
          type: "ROLE",
          }
          
      ]
        }
        
    ]
    })
      ////// otorol slash ayar
  
      commands.create({
        name : "otorol",
        description: "Otorol Ayarlarsınız",
        type: "SUB_COMMAND_GROUP",
        options:[{
          name: "log",
          description: "Otorol Log Ayarlarsınız.",
          type: "CHANNEL",
        },
        {
          name: "rol",
          description: "Verilecek Olan Rolü Seçiniz.",
          type: "ROLE",
        }
        ]
      })
    ////// hg-bb slash ayar
  
    commands.create({
      name : "hg-bb",
      description: "hg-bb Ayarlarsınız",
      type: "SUB_COMMAND",
      options:[{
        name: "log",
        description: "hg-bb Kanalını Belirtiniz",
        type: "CHANNEL",
      }
      ]
    })
      
    ////// mod-log slash ayar
  
    commands.create({
      name : "mod-log",
      description: "Mod-log Ayarlarsınız",
      type: "SUB_COMMAND",
      options:[{
        name: "log",
        description: "Mod-log Kanalını Belirtiniz",
        type: "CHANNEL",
      }
      ]
    })
    ////// sayaç slash ayar
  
    commands.create({
      name : "sayaç",
      description: "Sayaç Ayarlarsınız",
      type: "SUB_COMMAND_GROUP",
      options:[{
        name: "log",
        description: "Sayaç Log Ayarlarsınız",
        type: "CHANNEL",
      },
      {
        name: "hedef",
        description: "Sayaç Hedefinizi Belirlersiniz.",
        type: "NUMBER",
      }
      ]
    })
  
  /////// sa-as slah ayar
  
  
  commands.create({
    name : "sa-as",
    description: "sa-as Kapatıp / Açarsın",
    type: "",
  })
  // nuke slash ayar
  commands.create({
    name : "nuke",
    description: "Kanalı Sıfırlarsın",
    type: "INTAGER",
  })
  
  
  // hg-bb kapat slash ayar
  commands.create({
    name : "kapat-hg-bb",
    description: "hg-bb Sistemini Sıfırlarsın",
    type: "INTAGER",
  })
  
  // mod-log kapat slash ayar
  commands.create({
    name : "kapat-mod-log",
    description: "Mod-log Sistemini Sıfırlarsın",
    type: "INTAGER",
  })
  
  // otorol kapat slash ayar
  commands.create({
    name : "kapat-otorol",
    description: "Otorol Sistemini Sıfırlarsın",
    type: "INTAGER",
  })
  
  // sayaç kapat slash ayar
  commands.create({
    name : "kapat-sayaç",
    description: "Sayaç Sistemini Sıfırlarsın",
    type: "INTAGER",
  })
  })
  
  
  
  client.on("interactionCreate", async(interaction) => {
    const { commandName, options } = interaction;
  
  // hg-bb-sıfırla komutları
  
  if(commandName == "kapat-hg-bb"){
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("Bu Komudu Kullanabilmek İçin Sunucuyu Yönet Yetkisine Sahip Olmanız Gerekmekte.")
    let kontrol = db.fetch(`hg_bb_kanal_${interaction.guild.id}`)
    if(!kontrol) return interaction.reply("Zaten Sistem Kapalı")
    db.delete(`hg_bb_kanal_${interaction.guild.id}`)
    interaction.reply("Başarılı bir şekilde sıfırlandı")
  }
  // mod-log-sıfırla komutları
  
  if(commandName == "kapat-hg-bb"){
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("Bu Komudu Kullanabilmek İçin Sunucuyu Yönet Yetkisine Sahip Olmanız Gerekmekte.")
    let kontrol = db.fetch(`modlog_${interaction.guild.id}`)
    if(!kontrol) return interaction.reply("Zaten Sistem Kapalı")
    db.delete(`modlog_${interaction.guild.id}`)
    interaction.reply("Başarılı Bir Şekilde Sıfırlandı")
  }
  
  // otorol-sıfırla komutları
  
  if(commandName == "kapat-otorol"){
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("Bu Komudu Kullanabilmek İçin Sunucuyu Yönet Yetkisine Sahip Olmanız Gerekmekte.")
    let kontrol = db.fetch(`otorol_kanal_${interaction.guild.id}`)
    let kontrol2 = db.fetch(`otorol_rol_${interaction.guild.id}`)
    if(!kontrol && !kontrol2) return interaction.reply("Zaten Sistem Kapalı")
    db.delete(`otorol_kanal_${interaction.guild.id}`)
    db.delete(`otorol_rol_${interaction.guild.id}`)
    interaction.reply("Başarılı Bir Şekilde Sıfırlandı")
  }
  
  // sayaç-sıfırla komutları
  
  if(commandName == "kapat-sayaç"){
    
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("Bu Komudu Kullanabilmek İçin Sunucuyu Yönet Yetkisine Sahip Olmanız Gerekmekte.")
    let kontrol = db.fetch(`sayaç_log_${interaction.guild.id}`)
    let kontrol2 = db.fetch(`sayaç_hedef_${interaction.guild.id}`)
    if(!kontrol && !kontrol2) return interaction.reply("Zaten Sistem Kapalı")
    db.delete(`sayaç_log_${interaction.guild.id}`)
    db.delete(`sayaç_hedef_${interaction.guild.id}`)
    interaction.reply("Başarılı Bir Şekilde Sıfırlandı")
  }
  
  
  
    // nuke slash komutları
  
  if(commandName == "nuke"){
    
  if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("Bu Komudu Kullanabilmek İçin Sunucuyu Yönet Yetkisine Sahip Olmanız Gerekmekte.")
  
  
  interaction.channel.clone().then(channel => {
  channel.setPosition(interaction.channel.position)
  channel.send("https://cdn.discordapp.com/attachments/927885582221312010/927887159787139092/hidrojen-bombasi_1786815.gif")
  channel.send(`Kanal Başarılı Bir Şekilde Sıfırlandı.`)
  })
  interaction.channel.delete()
  }
  
  
  // mod-log slash komutları
  
  if(commandName == "hg-bb"){
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("Bu Komudu Kullanabilmek İçin Sunucuyu Yönet Yetkisine Sahip Olmanız Gerekmekte.")
    let log = options.getChannel("log")
  
  
    if(!log) return interaction.reply("hg-bb Kanalını Belirtiniz")
  
    db.set(`hg_bb_kanal_${interaction.guild.id}`, log.id)
    interaction.reply("Başarılı Bir Şşekilde Ayarlandı")
  
  }
  
  
  // mod-log slash komutları
  
  if(commandName == "mod-log"){
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("Bu Komudu Kullanabilmek İçin Sunucuyu Yönet Yetkisine Sahip Olmanız Gerekmekte.")
    let log = options.getChannel("log")
  
  
    if(!log) return interaction.reply("Mod-log Kanalını Belirtiniz")
  
    db.set(`modlog_${interaction.guild.id}`, log.id)
    interaction.reply("Başarılı Bir Şekilde Ayarlandı")
  
  }
  
  // otorol slash komutları
  
  if(commandName == "otorol"){
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("Bu Komudu Kullanabilmek İçin Sunucuyu Yönet Yetkisine Sahip Olmanız Gerekmekte.")
    let log = options.getChannel("log")
    let rol = options.getRole("rol")
  
    if(!log && !hedef) return interaction.reply("Verilecek Olan Rol Veya Log Belirtilmemiş")
  
    db.set(`otorol_kanal_${interaction.guild.id}`, log.id)
    db.set(`otorol_rol_${interaction.guild.id}`, rol.id)
  
    interaction.reply("Başarılı Bir Şekilde Ayarlandı")
  
  }
  
  
  
  ////// sayaç slash komutları
    if(commandName == "sayaç"){
      if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("Bu Komudu Kullanabilmek İçin Sunucuyu Yönet Yetkisine Sahip Olmanız Gerekmekte.")
      let log = options.getChannel("log")
      let hedef = options.getNumber("hedef")
  
      if(!log && !hedef) return interaction.reply("Hedef Veya Log Belirtilmemiş")
  
      db.set(`sayaç_log_${interaction.guild.id}`, log.id)
      db.set(`sayaç_hedef_${interaction.guild.id}`,hedef)
      interaction.reply("Başarılı Bir Şekilde Ayarlandı")
  
    }
  
    //// sa as slash komutları
    if(commandName == "sa-as"){
      if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("Bu Komudu Kullanabilmek İçin Sunucuyu Yönet Yetkisine Sahip Olmanız Gerekmekte.")
      let saas = db.fetch(`saas_${interaction.guild.id}`)
  
  
      if(!saas) {
      db.set(`saas_${interaction.guild.id}`, true)
      interaction.reply(`Sa As Sistemi Başarılı Bir Şekilde Aktif Edildi.`)
      return;
      }
      db.delete(`saas_${interaction.guild.id}`)
  
      interaction.reply(`Sa As Sistemi Başarılı Bir Şekilde Kapatıldı.`)
    } 
  
  
    /// rol-ver al slash komutları
    if(commandName == "rol"){
      let user = options.getUser('kullanıcı');
      let rol = options.getRole('rol');
      if(options.getSubcommand() == "ver"){
        
        if(!interaction.member.permissions.has("MANAGE_ROLES")) return message.reply("Rolleri Yönet Yetkiniz Bulunmamakta.")
  
  
        if(!user) return interaction.reply("Lütfen Rolün Verileceği Kişiyi Belirtiniz.")
        if(!rol) return interaction.reply("Lütfen Verilecek Rolü Belirtiniz.")
  
  
        interaction.guild.members.cache.get(user.id).roles.add(rol)
  
        const embed = new Discord.MessageEmbed()
        .setColor("GOLD")
        .setAuthor("Harlex ❤️")
        .setDescription(`${user}, İsimli Kişiye ${rol} İsimli Rol Verildi.`)
  
  
        interaction.reply({embeds:[embed]})
      }
      if(options.getSubcommand() == "al"){
        
        if(!interaction.member.permissions.has("MANAGE_ROLES")) return message.reply("Rolleri Yönet Yetkiniz Bulunmamakta.")
  
  
        if(!user) return message.reply("Lütfen Rolün Verileceği Kişiyi Belirtiniz.")
        if(!rol) return message.reply("Lütfen Verilecek Rolü Belirtiniz.")
  
  
        interaction.guild.members.cache.get(user.id).roles.remove(rol)
  
        const embed = new Discord.MessageEmbed()
        .setColor("GOLD")
        .setAuthor("Harlex ❤️")
        .setDescription(`${user}, İsimli Kişiden ${rol} İsimli Rol Alındı.`)
  
        interaction.reply({embeds:[embed]})
      }
    }
  
  
  
  
  
   
    if(commandName == "ping"){
      
  const embed = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setAuthor({ name: "Harlex ❤️" })
  .setDescription(`Botun Pingi: ${Math.round(interaction.client.ws.ping)} MS`)
  
  
      interaction.reply({embeds: [embed]})
    }
   //// ban komudu
    if(commandName == "ban"){
      let user = options.getUser('kullanıcı');
      let sebep = options.getString('sebep');
      
      if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply("Üyeleri Banla Yetkiniz Yok.")
      
      if(user){
        if(!sebep) return interaction.reply("Lütfen Sebep Belirtiniz")
        
        
        const üye = interaction.guild.members.cache.get(user.id)
        
        üye.ban({reason: sebep})
        
        
        const ban = new Discord.MessageEmbed()
        .setAuthor("Harlex ❤️")
        .setColor("GOLD")
        .setDescription(`${user}, İsimli Kişi Başarılı Bir Şekilde Banlandı.
        Banlanma Sebebi: **${sebep}**`)
        interaction.reply({embeds:[ban]})
      }else{
        interaction.reply("Lütfen Banlanacak Kişiyi Belirtiniz.")
      }
    }
  
    /// kick komudu
    if(commandName == "kick"){
      let user = options.getUser('kullanıcı');
      let sebep = options.getString('sebep');
      
      if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply("Üyeleri Kickleme Yetkiniz Yok.")
      
      if(user){
        if(!sebep) return interaction.reply("Lütfen Sebep Belirtiniz")
        
        
        const üye = interaction.guild.members.cache.get(user.id)
        
        üye.kick({reason: sebep})
        
        
        const kick = new Discord.MessageEmbed()
        .setAuthor("Harlex ❤️")
        .setColor("GOLD")
        .setDescription(`${user}, İsimli Kişi Başarılı Bir Şekilde Sunucudan Atıldı.
        Atılma sebebi: **${sebep}**`)
        interaction.reply({embeds:[kick]})
      }else{
        interaction.reply("Lütfen Banlanacak Kişiyi Belirtiniz.")
      }
    }
  
  
    // Rol VER-AL komudu
    if(commandName == "kick"){
      let secenek = options.getString('sebep');
    }
  
  })
  
  
  
  // Slash Bitiş
  

client.login(ayarlar.token);