/*
 * KETIH-KAZOOIE
 *
 * Author: Kevin "Krazy-Stew" Stewart
 */

const Discord = require('discord.js');
const {keys} = require("./discord-keys.js");

const bot = new Discord.Client();

//8-Ball Responses
var answerBank = [
    "hm. I wouldn\'t count on it.",
    "it says yes!",
    "sorry, it says no.",
    "Wow! I've never seen it so sure of anything before!",
    "Wow. That is the clearest \"no\" I\'ve seen in a long time.",
    "That\'s weird. It didn\'t give me a response."
]; 

//'Based' easter egg responses
var basedResponses = [
    "...on a true story!",
    "...on facts and logic!",
    "...on eyewitness accounts.",
    "...on indisputable evidence.",
    "...based on what?"
];

var role, username;
var SK4Smash = keys.skServID; //Certain commands will be exclusive to the server with this name
var clockTower = keys.clockTowerID; //Certain commands will be exclusive to Clockwork Tower channel

console.log('KEITH-KAZOOIE v1.2.6');

function favorite(message, fav) {
    role = message.guild.roles.cache.find(role => role.name === fav);
    message.member.roles.add(role);
    message.channel.send('Ta-daaa! You now have the ' + fav + '  role.');
}

function unfavorite(message, fav) {
    role = message.guild.roles.cache.find(role => role.name === fav);
    if (message.member.roles.cache.find(r => r === role)) {
        message.member.roles.remove(role);
        message.channel.send('Good-bye, old friend... you no longer have the ' + fav + '  role.');
    } else {
        message.channel.send('BRZZZZT! Sorry, I don\'t think you have that role.');
    }
}

function roll(sides) {
    var rand = Math.random() * sides; //Generate a random number from 1 to the amount of sides the die has
    console.log(rand);
    console.log(Math.ceil(rand));
    return Math.ceil(rand);
}

bot.on("guildMemberAdd", (member) => { //Looking for new members
    console.log("new user found");
    if (member.guild.id = SK4Smash) {
        username = "" + member.user.tag + " (" + member.nickname + ")"; //For easier logging
        console.log(username + " has joined the server.");
        if (member.guild.channels.cache.find(c => c.id === keys.plainsChannelID)) {
            member.guild.channels.cache.find(c => c.id === keys.plainsChannelID).send(`
                "Welcome, "${member.user.username}", to the server! I'll give you a proper role soon, so in the meantime be sure to read #the-code-of-shovelry for the server rules. Enjoy your stay!"
            `);
            setTimeout(function () {
                member.roles.add(member.guild.roles.cache.find(role => role.name === "Wandering Traveler"));
            }, 300000); //Wait 5 minutes after sending the message to actually give the role - you can use this time to read the rules - before giving the standard user role

        }
    }
});

bot.on('message', (message) => {
    //Ignore the message if it is a DM
    if (message.guild === null) return; 

    //Recording username for easier logging
    username = "" +
    message.member.user.tag +
    " (" +
    message.member.nickname +
    ") at " +
    message.guild.name +
    "; " +
    message.channel.name;

    switch (message.content.substring(0, 1)) {

        //Commands Start
        case '!':
            if(message.guild.id == SK4Smash && message.channel.id != clockTower) {
                message.channel.send('BRZZZZT! I can\'t use commands here! Try in Clockwork Tower!');
                break;
            }
            var args = message.content.substring(1).split(' ');
            var cmd = args[0];
            switch (cmd) {
                case 'help': //!help
                    console.log('!help triggered by ' + username);
                    message.reply('Don\'t worry! I\'m here to help!');
                    message.channel.send('- Use \'!8ball\' to ask a question to my magical 8-ball of fortune. It never fails! ...Probably.');
                    message.channel.send('- Use \'!dice-roll [sides per die] [amount of dice]\' to roll some dice. May lady luck be on your side!')
                    if (message.guild.id == SK4Smash) { //SK4Smash-exclusive commands
                        message.channel.send('- Use \'!fav\' to request a username color based on one of the Knights! (e.g. \'!fav Shovel Knight\' for blue)');
                    }
                    break;
                case 'fav': //!fav 

                    //This version of the command only works in the SK4Smash Server
                    if (message.guild.id == SK4Smash) {
                        if (args[1] != null) {
                            console.log('!fav triggered by ' + username + '; requested role: ' + args[1]);
                            switch (args[1].toLowerCase()) { //which character color does user want?
                                case "the": case "enchanter": case "enchantress": //covering multiple spellings
                                    favorite(message, 'The Enchanter/Enchantress');
                                    break;
                                case "propeller":
                                    favorite(message, 'Propeller Knight');
                                    break;
                                case "tinker":
                                    favorite(message, 'Tinker Knight');
                                    break;
                                case "polar":
                                    favorite(message, 'Polar Knight');
                                    break;
                                case "treasure":
                                    favorite(message, 'Treasure Knight');
                                    break;
                                case "mole":
                                    favorite(message, 'Mole Knight');
                                    break;
                                case "baz":
                                    favorite(message, 'Baz!');
                                    break;
                                case "king":
                                    favorite(message, 'King Knight');
                                    break;
                                case "specter":
                                    favorite(message, 'Specter Knight');
                                    break;
                                case "plague":
                                    favorite(message, 'Plague Knight');
                                    break;
                                case "black":
                                    favorite(message, 'Black Knight');
                                    break;
                                case "shield":
                                    favorite(message, 'Shield Knight');
                                    break;
                                case "shovel":
                                    favorite(message, 'Shovel Knight');
                                    break;
                                case "mr.": case "mr": //Some people just type "Mr." without the '.' and while they're mad we have to respect them
                                    favorite(message, 'Mr. Hat');
                                    break;
                                case "phantom":
                                    favorite(message, 'Phantom Striker');
                                    break;
                                case "reize":
                                    favorite(message, 'Reize');
                                    break;
                                case "fleck":
                                    favorite(message, 'Fleck');
                                    break;
                                case "liquid": case "chief":
                                    message.channel.send("BRRRZT! Sorry, I can't mess with that role!");
                                    break;
                                default: //Role not found
                                    message.channel.send('BRRRZT! Sorry, I couldn\'t find that role. Is it typed correctly?');
                                    break;
                            }
                        } else {
                            message.channel.send('BRZZZZT! Please enter a knight!');
                        }
                    } else {
                        message.channel.send('BRZZZZT! Sorry, that command doesn\'t work here!');
                        console.log('!fav attempted by ' + username + '; requested role: ' + args[1]);
                        console.log(message.guild.name + " " + message.channel.name); //Where was the command attempted from?
                    }
                    break;
                case 'unfav': //!unfav
                    if (message.guild.id == SK4Smash) { //This version of the command only works in the SK4Smash Server
                        if (args[1] != null) {
                            console.log('!unfav triggered by ' + username + '; requested role: ' + args[1]);
                            switch (args[1].toLowerCase()) { //which character color does user want to remove?
                                case "the": case "enchanter": case "enchantress":
                                    unfavorite(message, 'The Enchanter/Enchantress');
                                    break;
                                case "propeller":
                                    unfavorite(message, 'Propeller Knight');
                                    break;
                                case "tinker":
                                    unfavorite(message, 'Tinker Knight');
                                    break;
                                case "polar":
                                    unfavorite(message, 'Polar Knight');
                                    break;
                                case "treasure":
                                    unfavorite(message, 'Treasure Knight');
                                    break;
                                case "mole":
                                    unfavorite(message, 'Mole Knight');
                                    break;
                                case "baz":
                                    unfavorite(message, 'Baz!');
                                    break;
                                case "king":
                                    unfavorite(message, 'King Knight');
                                    break;
                                case "specter":
                                    unfavorite(message, 'Specter Knight');
                                    break;
                                case "plague":
                                    unfavorite(message, 'Plague Knight');
                                    break;
                                case "black":
                                    unfavorite(message, 'Black Knight');
                                    break;
                                case "shield":
                                    unfavorite(message, 'Shield Knight');
                                    break;
                                case "shovel":
                                    unfavorite(message, 'Shovel Knight');
                                    break;
                                case "mr.": case "mr":
                                    unfavorite(message, 'Mr. Hat');
                                    break;
                                case "phantom":
                                    unfavorite(message, 'Phantom Striker');
                                    break;
                                case "reize":
                                    unfavorite(message, 'Reize');
                                    break;
                                case "fleck":
                                    unfavorite(message, 'Fleck');
                                    break;
                                case "liquid": case "chief":
                                    message.channel.send("BRRRZT! Sorry, I can't mess with that role!");
                                    break;
                                default: //Role not found
                                    message.channel.send('BRRRZT! Sorry, I couldn\'t find that role. Is it typed correctly?');
                                    break;
                            }
                        } else {
                            message.channel.send('BRZZZZT! Please enter a knight!');
                        }
                    } else {
                        message.channel.send('BRZZZZT! Sorry, that command doesn\'t work here!');
                        console.log('!fav attempted outside of SK4Smash by ' + username + '; requested role: ' + args[1]); //Logging failed attempts in case one is in the SK4Smash server; if so, something is wrong
                    }
                    break;
                case '8ball': //!8ball
                    var ans = answerBank[Math.floor(Math.random() * answerBank.length)];
                    console.log('!8ball triggered by ' + username + "; response: " + ans);
                    message.reply('Let me look into my magical 8-ball... ' + ans);
                    break;
                case 'dice-roll': //!dice-roll [sides] [amount]
                    if (args[1] != null && args[2] != null &&
                        Number(args[1]) && Number(args[2])) { //Make sure you're using valid numbers

                        if(args[2] > 255)  {
                            message.channel.send('BRZZZZT! I don\'t have that many dice!');
                            break;
                        }

                        var sides = args[1], amount = args[2],
                        totalDice = 0, rolls = new Array();

                        for(var i = 0; i < amount; i++) {
                            var die = roll(sides);
                            rolls.push(die);
                            totalDice += die;
                        }
                        console.log('!dice-roll triggered by ' + username + "; sides: " + sides + "; amount: " + amount + "; response: " + totalDice + " <-> " + rolls);
                        message.reply('Let\'s see what you rolled!');
                        message.channel.send('Total roll: ' + totalDice);
                        if(amount > 1) { //List multiple dice individually
                            message.channel.send('Individual rolls: ' + rolls);
                        }
                    } else {
                        console.log('!dice-roll triggered by ' + username + "; invalid arguments");
                        message.channel.send('BRZZZZT! You didn\'t use the command properly. It goes like this: !dice-roll [sides] [amount]');
                        message.channel.send('Be sure not to put the numbers in brackets.')
                    }
                    break;

                /*case 'roles': //!roles - debugging; list the server roles to the console - not needed now
                    console.log(message.guild.roles);
                    message.reply('I sent a list of roles to the console log.');
                    console.log(message.guild.available);
                    break;*/
            }
            break;
        default:
            /* switch (message.content.toLowerCase()) { //easter eggs (commented out due to abuse clogging the server)
                case 'hey':
                    console.log('Navi triggered by ' + username);
                    message.channel.send('Listen!');
                    break;
                case 'based':
                    var basedRes = basedResponses[Math.floor(Math.random() * basedResponses.length)];
                    console.log('Based triggered by ' + username + "; result: " + basedRes);
                    message.channel.send(basedRes);
                    break;
            } */

    }
});

bot.login(keys.discordToken); //Code for the bot to log into its account and access the servers it is in; should not be touched