const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
const bot = new Discord.Client();
const {Client, RichEmbed} = require('discord.js')
const ms = require("ms");
const ytdl = require("ytdl-core");
const fs = require("fs");
const superagent = require("superagent");
const search = require("yt-search");
const token = process.env.arcadia

var servers ={};

//LOGOVI

const PREFIX = '!'

var servers = {};

bot.on('ready', () =>{
  bot.user.setActivity('💙 ʙᴀʟᴋᴀɴ  💙', { type: 'WATCHING'}).catch(console.error);
  console.log('Spreman!')

})

bot.on('guildMemberAdd', member =>{
  const channel = member.guild.channels.find('name', 'welcome-😄');
  if (!channel) return;
  channel.send(`${member}, welcome to the Dark discord server! Check the rules :)`);
});


bot.on("messageUpdate", async(oldMessage, newMessage) =>{
  if(oldMessage.content === newMessage.content){
    return;
  }

      let logEmbed = new Discord.RichEmbed()
      .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
      .setThumbnail(oldMessage.author.avatarURL)
      .setColor("00FF45")
      .setDescription("Edit Poruka")
      .addField("Pre Edit-a", oldMessage.content, true)
      .addField("Posle Edit-a", newMessage.content, true)
      .setTimestamp()
      .setFooter("Edit poruka by Luka");

      let loggingChannel = newMessage.guild.channels.find(ch => ch.name === "discord-logovi")
      if(!loggingChannel) return;

      loggingChannel.send(logEmbed);
})

bot.on("messageDelete", async message =>{

      let LoggingEmbed = new Discord.RichEmbed()
      .setTitle("Brisanje Poruka")
      .setColor("RANDOM")
      .setThumbnail(message.author.avatarURL)
      .addField("Obrisano od strane:", message.author.tag)
      .addField("Izbrisano u:", message.channel)
      .addField("Izbrisano u:", message.createdAt)
      .setFooter("Brisanje poruka by Luka");

      let logChannel = message.guild.channels.find(c => c.name === "discord-logovi")
      if(!logChannel) return;


      logChannel.send(LoggingEmbed)


})



bot.on('message', message=>{
  
  let args = message.content.substring(PREFIX.length).split(" ");

  switch(args[0]){
    case 'loziziki' :
      message.react('✅');
      message.channel.sendMessage('```Gej!```')
      break
      case 'milox' :
        message.react('✅');
        message.channel.sendMessage('Najjaci 💪')
        break
    case 'stajeluka?' :
      message.react('✅');
      message.channel.sendMessage('```Car!```')
      break

    case 'help' :
      message.react('✅');
      message.channel.sendMessage('```Komande: !stajeluka, !loziziki, !milox, !ip, !discord```')
      message.channel.sendMessage('```MILOX JE GEJ```')
      break                        
   
    case 'obrisi':
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('```Nemas premisiju za to!```'),message.react('❌'); 
      if(!args[1]) return message.replay('-obrisi ')
      message.react('✅');
      message.channel.bulkDelete(args[1]);
      break
      
    case 'ip' :
        message.channel.sendMessage('```IP: Uskoro!```')
        break
      
    case 'discord' :
          message.channel.sendMessage('https://discord.gg/PY7fVxq')
          break
    
    case "say" :
      
        if (message.deletable) message.delete();
              if (!message.member.hasPermission("MANAGE_MESSAGES"))
                  return message.reply(`Nista za rec?`).then(m => m.delete(5000));
      
              if (args.length < 0)
                  return message.reply("Nista da kazes?").then(m => m.delete(5000));
      
              const roleColor = message.guild.me.highestRole.hexColor;
      
              if (args[0].toLowerCase() === "embed") {
                const embed = new RichEmbed()
                    .setDescription(args.slice(1).join(" "))
                    .setColor(roleColor === "#000000" ? "#ffffff" :  roleColorv)
                    .setTimestamp()
                    .setImage(client.user.displayAvatarURL)
                    .setAuthor(message.author.username, message.author.displayAvatarURL);
    
                message.channel.send(embed);
            } else {
                message.channel.send(args.join(" ")); 
            }
      break

         case "kick" :
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('```Nemas premisiju za to!```'),message.react('❌');       
            const user = message.mentions.users.first();
            if(user) {
              const member = message.guild.member(user);
    
              if(member) {
                member.kick('Kicked by Luka').then(() => {
                  message.reply("Kickovan!")
                }).catch(err => {
                  message.reply('Ne mogu ga kick');
                  console.log(err);
                });
              } else {
                message.reply('Nije clan discorda!')
              }
            }else {
              message.reply('Upisi ime clana!')
            }
            break;


            case "ban" :
              if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('```Nemas premisiju za to!```'),message.react('?');      
              const igrac = message.mentions.users.first();
              if(igrac) {
                const member = message.guild.member(igrac);
    
                if(member) {
                  member.ban('Banned by Luka bot!').then(() => {
                    message.reply(`${igrac.tag} je banovan!`)
                  }).catch(err => {
                    message.reply(`Ne mogu ga ban`)
                    console.log(err);
                  });
                } else {
                  message.reply('Nije clan discorda!')
                }
              } else {
                message.reply('Upisi ime clana!')
              }
              break;
  }
});

bot.login(token)
