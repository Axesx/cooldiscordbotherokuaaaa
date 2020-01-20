var bot = require("discord-music-bot");
 
var serverName = "Balkan Neons";
var textChannelName = "「💬」ᴄʜᴀᴛ";
var voiceChannelName = "「📣」Govornica - 3";
var aliasesFile = "A file the bot will use to store your aliases";
var botToken = "Your bot token here";
 
bot.run(serverName, textChannelName, voiceChannelName, aliasesFile, botToken);

bot.setYoutubeKey("AIzaSyCc0kX1db1N24l83JjJzcyHSHtZFf-dAf8")