var Discord = require('discord.io');
var auth = require('./creds.json');
var cmd = require('node-cmd');

var chID = "296436844885835778";
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function() {
    console.log('Logged in: %s - %s\n', bot.username, bot.id);
});

bot.on('guildMemberAdd', function (member) {
  var name = bot.users[member.id].username;
  var fname = name + ".png";
  console.log("New User: " + name);
  cmd.run("echo \"linear_extrude(2){\ntext(\\\"" + name +"\\\", font=\\\"DejaVu Sans\\\");\n}\" > temp.scad");
  cmd.run("openscad -o temp.stl temp.scad");
  
  bot.uploadFile({
    to: chID,
    file: "temp.png",
    filename: fname,
    message: ""
 });
});
