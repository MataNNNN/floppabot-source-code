const {
    Client,
    Intents,
    DiscordAPIError,
    Permissions,
    Emoji
} = require('discord.js');
const {
    MessageEmbed
} = require('discord.js');

const fetch = require("node-fetch");

const Scraper = require('images-scraper');

var Filter = require('bad-words'),
    filter = new Filter();

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const prefix = '-';

const google = new Scraper({
    puppeteer: {
        headless: true,
    },
});


client.once('ready', () => {
    console.log('Floppa is online!');
    client.user.setActivity("-help", {});
    client.user.set
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(" ");

    const command = args.shift().toLocaleLowerCase();

    const eBall = ['לא', 'כן', 'כמובן שכן', 'לך תנשק גבר', 'תשאל עוד פעם', 'לא הבנתי', 'לא מאמין שאפילו חשבת על לשאול אותי על זה', 'יא מוזר'];
    const rball = eBall[Math.floor(Math.random() * eBall.length)];

    const dick = (Math.floor(Math.random() * 100));

    // A function that will get a random number between a range that the user has decided
    function getRandNum(firstNum, secondNum) {
        firstNum = parseInt(args[0]);
        secondNum = parseInt(args[1]);
        const rand = Math.floor(Math.random() * (secondNum - firstNum + 1)) + firstNum;
        if (firstNum >= secondNum) {
            message.channel.send("the first number should be smaller than the second one");
        } else if (!firstNum || !secondNum || !firstNum && !secondNum) {
            message.channel.send("How to use: " + prefix + "getrand `<first number> <second number (should be bigger than the first number)`");
        } else {
            message.channel.send("generating a random number between " + firstNum + " - " + secondNum + "...");
            message.channel.send("the number is " + rand);
        }


    }



    const api_urlUSD = 'https://v6.exchangerate-api.com/v6/8ef5d00d7cd770997912b71e/latest/USD';
    const api_urlILS = 'https://v6.exchangerate-api.com/v6/8ef5d00d7cd770997912b71e/latest/ILS';

    // A function that exchanges the currency from Shekels to USD
    async function getCurrencyILS() {
        const count = args[0];
        const response = await fetch(api_urlILS);
        const data = await response.json();
        if (!count) {
            message.channel.send("How to use: " + prefix + "excusdils `<a certain amount of moeny>`")
        } else {
            if (count < 1) {
                message.channel.send("please enter a valid amount of money")
            } else {
                message.channel.send((count * data.conversion_rates.USD) + '$');
            }
        }
    }

    // A function that exchanges the currency from USD to Shekels
    async function getCurrencyUSD() {
        const count = args[0];
        const response = await fetch(api_urlUSD);
        const data = await response.json();
        if (!count) {
            message.channel.send("How to use: " + prefix + "excusdils `<a certain amount of moeny>`")
        } else {
            if (count < 1) {
                message.channel.send("please enter a valid amount of money")
            } else {
                message.channel.send((count * data.conversion_rates.ILS) + '₪');
            }
        }
    }

    // An embed that shows all of the commands,will show when you type the command -help
    const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Commands')
        .setThumbnail('https://img.ifunny.co/images/4473cc23e6516b00026b962421b14eab1829b35e60e7bc072307c6905f65c60a_1.webp')
        .addFields({
            name: '-ping',
            value: 'Latency'
        }, {
            name: '-gosha',
            value: 'A picture of gosha (very handsome)'
        }, {
            name: '-floppacock',
            value: 'Your cock size'
        }, {
            name: '-floppalink',
            value: 'A link to the server'
        }, {
            name: '-8ball',
            value: 'Ask a question and the bot will answer you'
        }, {
            name: '-developer',
            value: 'The sexiest man alive'
        }, {
            name: '-rps',
            value: 'Rock Paper Scissors against me'
        }, {
            name: '-dice',
            value: 'Will roll two dices'
        }, {
            name: '-hot',
            value: 'Heads Or Tails'
        }, {
            name: '-excusdils',
            value: 'Exchanges currency from USD to ILS'
        }, {
            name: '-excilsusd',
            value: 'Exchanges currency from ILS to USD'
        }, {
            name: '-getrand',
            value: 'A random number between a range that the user set'
        }, {
            name: '-google',
            value: 'Shows the first image that appear when you search the keyword that the user typed (no bad words)'
        }, )
        .setImage('')
        .setFooter('FloppaBot', 'https://img.ifunny.co/images/4473cc23e6516b00026b962421b14eab1829b35e60e7bc072307c6905f65c60a_1.webp');

    const mention = message.mentions.users.first();
    // Latency 
    if (command == 'ping') {
        message.channel.send(Math.abs(Date.now() - message.createdTimestamp) + 'ms');

        //Cock mesurer ;)
    } else if (command == 'floppacock') {
        message.channel.send(dick + 'cm');
        if (dick > 50) {
            message.channel.send('very big cock!');
        } else if (dick < 10) {
            message.channel.send('very small penis(((');
        }

        // Gosha image
    } else if (command == 'gosha') {
        message.channel.send({
            files: ["C:/Users/amare/Documents/sldeshow/big floppa gaming.jpg"]
        });

        // Giving the memeber the gosha fan role
    } else if (command == 'floppagoshafan') {
        if (message.member.roles.cache.has('923631528389533716')) {
            message.channel.send('you are already a gosha fan');
        } else if (message.member.roles.cache.has('923635492547887115')) {
            message.channel.send('sorry but you are already a kimbo fan');
        } else {
            message.channel.send('You are a certified gosha fan :sunglasses:');
            message.member.roles.add('923631528389533716').catch(console.error);
        }

        // Giving the memeber the kimbo fan role
    } else if (command == 'floppakimbofan') {
        if (message.member.roles.cache.has('923635492547887115')) {
            message.channel.send('you are already a kimbo fan');
        } else if (message.member.roles.cache.has('923631528389533716')) {
            message.channel.send('sorry but you are already a gosha fan');
        } else {
            message.channel.send('You are a certified kimbo fan :sunglasses:');
            message.member.roles.add('923635492547887115').catch(console.error);
        }

        // A link to the server
    } else if (command == 'floppalink') {
        message.channel.send('https://discord.gg/5df5SrW5KN');

        // A random answer using the rball const from the start of the program
    } else if (command == '8ball') {
        if (!args[0]) {
            message.channel.send("You need to ask a question");
        } else {
            message.channel.send(rball);
        }

        // Tagging the developer (me)
    } else if (command == 'developer') {
        message.channel.send('מי שתכנת אותי הוא הגבר המסוקס <@317615845704728577> ');

        // Sending an embed with all of the commands
    } else if (command == 'help') {
        message.channel.send({
            embeds: [exampleEmbed]
        });
    }

    // Kick command
    if (command == 'kick') {
        if (message.mentions.members.first()) {
            if (message.member.permissions.has('KICK_MEMBERS')) {
                var member = message.mentions.members.first();
                member.kick().then((member) => {
                    message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
                }).catch(() => {
                    message.channel.send("You dont have the right permissions to do that");
                });
            } else {
                message.channel.send("You dont have the right permissions to do that");
            }
        } else {
            message.channel.send("The user is not in this server please tag users from this server");
        }
    }

    // Ban command
    if (command == 'ban') {
        if (message.mentions.members.first()) {
            if (message.member.permissions.has('BAN_MEMBERS')) {
                var member = message.mentions.members.first();
                member.ban().then((member) => {
                    message.channel.send(":wave: " + member.displayName + " has been successfully banned :point_right: ");
                }).catch(() => {
                    message.channel.send("You dont have the right permissions to do that");
                });
            } else {
                message.channel.send("You dont have the right permissions to do that");
            }
        } else {
            message.channel.send("The user is not in this server please tag users from this server");
        }

        // Rock Paper Scissors
    } else if (command === 'rps') {
        const acceptedReplies = ['rock', 'paper', 'scissors'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];

        const choice = args[0];
        if (!choice) return message.channel.send(`How to play: \`${prefix}rps <rock|paper|scissors>\``);
        if (!acceptedReplies.includes(choice)) return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);

        console.log('Bot Result:', result);
        if (result === choice) return message.reply("It's a tie! We had the same choice.");

        switch (choice) {
            case 'rock': {
                if (result === 'paper') return message.reply('I chose ' + result + ' , therefore I have won!');

                else return message.reply('I chose ' + result + ' , therefore you have won!');
            }
            case 'paper': {
                if (result === 'scissors') return message.reply('I chose ' + result + ' , therefore I have won!');

                else return message.reply('I chose ' + result + ' , therefore you have won!');
            }
            case 'scissors': {
                if (result === 'rock') return message.reply('I chose ' + result + ' , therefore I have won!');

                else return message.reply('I chose ' + result + ' , therefore you have won!');
            }
            default: {
                return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
            }
        }
    }
    // Rolling a dice
    if (command == 'dice') {
        const dice1 = (Math.floor(Math.random() * 6) + 1);
        const dice2 = (Math.floor(Math.random() * 6) + 1);

        sum = dice1 + dice2;

        message.channel.send("rolling dices...");
        message.channel.send("The first dice landed on " + dice1 + " and the second one landed on " + dice2 + " making the total to " + sum);

        // If both dices land on six, The bot will send an appropriate message
        if (dice1 == 6 && dice2 == 6) {
            message.channel.send("Both dices landed on 6!");
            message.react('🍀');
        }
        // If both dices are equal, The bot will send an appropriate message        
        if (dice1 == dice2) {
            message.channel.send("Double!")
            message.react('💯')
        }

        // Heads Or Tails
    }
    if (command == 'hot') {
        const validEnters = ['Heads', 'Tails'];
        const flipCoin = Math.floor((Math.random() * validEnters.length));
        const result = validEnters[flipCoin];

        const choice = args[0];
        if (!choice) return message.channel.send("How to play: " + prefix + "HOT `<Heads|Tails>`");
        if (!validEnters.includes(choice)) return message.channel.send(`Only these responses are accepted: \`${validEnters.join(', ')}\``);

        switch (choice) {
            case 'Heads': {
                if (result == "Tails")
                    return message.channel.send("Result was " + result + ". You lost");
                else
                    return message.channel.send("You guessed it right");


            }
            case 'Tails': {
                if (result == "Heads")
                    return message.channel.send("Result was " + result + ". You lost");
                else
                    return message.channel.send("You guessed it right");
            }
        }
    }

    //Exchanges currency from USD to ILS
    if (command == 'excusdils') {
        getCurrencyUSD();
    }

    //Exchanges currency from ILS to USD
    if (command == 'excilsusd') {
        getCurrencyILS();
    }

    // A random number between a range that the user set
    if (command == 'getrand') {
        getRandNum();
    }

    // Clear command    
    if (command == 'clear') {
        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            message.channel.send("You don't have the permission to do that");
        }

        let amount = args[0];

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            message.reply("Please enter numbers only!");
        } else if (parseInt(args[0]) > 100) {
            message.channel.send("The maximus amount of messages I can delete at once is 100");
        } else {
            amount = parseInt(args[0]);
            message.channel.bulkDelete(amount + 1, true);
            message.channel.send("deleted " + amount + " messages");
        }
    }
    // Shows the first image that appear when you search the keyword that the user typed
    if (command == 'google') {
        const image_query = args.join(' ');
        if (!image_query) return message.channel.send("Please enter an image name");
        else {
            const image_result = await google.scrape(image_query, 1);
            message.channel.send(image_result[0].url);
        }
    }

    // CSGO skin prices command
    if (command == 'getitemprice') {

        let gunName = args[0];
        let slash = args[1];
        if (slash != '|') {
            slash = args[2];
            gunName = [args[0], args[1]];
            let skinName = args[3];
            let condition = args[4];
            let api_CSGO = `http://csgobackpack.net/api/GetItemPrice/?currency=USD&id=${gunName[0]}%20${gunName[1]}%20${slash}%20${skinName}%20${condition}&time=7&icon=1`;

        if(!gunName || !skinName || !condition){
            message.channel.send("How to use: -getitemprice `<gun name> | <skin name> <condition>` example: `M4A4 | Howl (Field-Tested)`");
        }
        else{

            async function csgoSkins() {
                const response = await fetch(api_CSGO);
                const data = await response.json();

                const csgoEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`${gunName[0]} ${gunName[1]} | ${skinName} ${condition}`)
                    .setImage(data.icon)
                    .addFields({
                        name: 'Average Price',
                        value: data.average_price
                    }, {
                        name: 'Median Price',
                        value: data.median_price
                    }, {
                        name: 'Lowest Price',
                        value: data.lowest_price
                    }, {
                        name: 'Highest Price',
                        value: data.highest_price
                    }, {
                        name: 'Currency',
                        value: data.currency
                    })
                message.channel.send({embeds: [csgoEmbed]});
            }
            csgoSkins();
        }


        } else {

            gunName = args[0];
            let skinName = args[2];
            let condition = args[3];
            let api_CSGO = `http://csgobackpack.net/api/GetItemPrice/?currency=USD&id=${gunName}%20${slash}%20${skinName}%20${condition}&time=7&icon=1`;

            if(!gunName || !skinName || !condition){
                message.channel.send("How to use: -getitemprice `<gun name> | <skin name> <condition>` example: `M4A4 | Howl (Field-Tested)`");
            }
            else{
                async function csgoSkins() {
                    const response = await fetch(api_CSGO);
                    const data = await response.json();
    
                    const csgoEmbed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`${gunName} | ${skinName} ${condition}`)
                        .setImage(data.icon)
                        .addFields({
                            name: 'Average Price',
                            value: data.average_price
                        }, {
                            name: 'Median Price',
                            value: data.median_price
                        }, {
                            name: 'Lowest Price',
                            value: data.lowest_price
                        }, {
                            name: 'Highest Price',
                            value: data.highest_price
                        }, {
                            name: 'Currency',
                            value: data.currency
                        })
                    message.channel.send({embeds: [csgoEmbed]});
                }
                csgoSkins();
            }


        }
    }
});




















client.login('OTIzNTg3Mjk3MTE3NjA1OTY4.YcSLsw.ePS1r0kLEKPD3ArelqZi3ZCl-D4');