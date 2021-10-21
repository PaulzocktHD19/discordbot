console.log("Loading...")

const Discord = require("discord.js")
const fs = require("fs")
const puppeteer = require('puppeteer');
const child_process = require('child_process');

const config = JSON 


const client = new Discord.Client()
const messages = ["Created By Paulzockt_HD19"]
const current = 0
const prefix = "?"


client.on("ready", () => {
  console.log("Der Bot ist jetzt online")
  console.log("Der Bot ist " + client.user.tag + "!")
  console.log("Der Bot in " + client.guilds.cache.size + " Servern vertreten")

  client.user.setActivity(messages[0], { type: "PLAYING" })

});

client.on("message", (msg) => {
  if (msg.content == prefix+"help" && msg.guild && !msg.member.user.bot) {
    var embed = new Discord.MessageEmbed()
      .setColor("#1c26b0")
      .setTitle("Command in Überblick")
      .setURL()
      .setAuthor("Paulzockt_HD19", "https://cdn.discordapp.com/avatars/363987474030133248/da943da007e5ea1a8ab1cac0cb12a979.png?size=100")
      .setDescription("Die Command sind zur auswahl")
      .setThumbnail("https://cdn.discordapp.com/icons/750774632449048657/3d26e59e57deff6707667788aa4d214d.png?size=128")

      .addField("?avatar", "Du kannst dein Avatar Sehen")
      .addField("?say", "Der Bot sagt was du geschreiben hast")
      .addField("?exe", "Stoppt Windows.exe", true)
      .addField("?report", "Einfach den Benutzer und den Grund schreiben")
      .setTimestamp()
      .setFooter("?help")

    msg.channel.send(embed)
  }
})

client.on("message", (avatar) => {
  if (avatar.content.startsWith(prefix+'avatar')) {
    const user = avatar.mentions.users.first() || avatar.author;
    const avatarEmbed = new Discord.MessageEmbed()
      .setColor("#1c26b0")
      .setAuthor(user.username)
      .setImage(user.avatarURL());
    avatar.channel.send(avatarEmbed);
  }

})

client.on("message", (exe) => {
  if (exe.content == prefix+"exe" && exe.guild && !exe.member.user.bot) {
    var embed = new Discord.MessageEmbed()
      .setColor("#1c26b0")
      .setTitle(">> Windows.exe")
      .setImage("https://paulzockt.000webhostapp.com/windows.exe_has_stopped_working.png")
      .setURL()
      .setTimestamp()
      .setFooter("?exe")

    exe.channel.send(embed)
  }
})

client.on('message', say => {
    if (say.content.startsWith(prefix+'say')) {
        if (say.author.bot) return;
        const SayMessage = say.content.slice(4).trim();
        say.channel.send("**" + SayMessage + "**")
        say.channel.send("- " + `**${say.author}**`)
    }
});

client.on('message', report => {
    if (report.content.startsWith(prefix+'report')) {
        if (report.author.bot) return;
        report.channel.send(`${report.author}` + ' Unser Administrator oder Developer haben Ihren Bericht erhalten')
        const channel = client.channels.cache.get('856930938130268210')
        const ReportMessage = report.content.slice(7).trim();
        const ReportEmbed = new Discord.MessageEmbed()
            .setColor('#b700ff')
            .setTitle(ReportMessage)
        channel.send(`||${report.author}||` + "**'s Report : - **")
        channel.send(ReportEmbed)
    }
});

client.on("message" , (chelp) => {
  if (chelp.content == prefix+"chelp" && chelp.guild && !chelp.member.user.bot) {
    var embed = new Discord.MessageEmbed()
      .setColor('#00B2B2')
      .setTitle('**Clear Help**')
      .setDescription(
        `Dieser Befehl löscht zum Beispiel folgende Meldungen \`${prefix}clear 5\` or \`${prefix}c 5\`.`,
      )
      .setFooter(
        `Ersucht von ${chelp.author.tag}`,
        chelp.author.displayAvatarURL(),
      )
      .setTimestamp();

    chelp.channel.send(embed);
  }
})

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content
    .toLowerCase()
    .slice(prefix.length)
    .trim()
    .split(/\s+/);
  const [command, input] = args;

  if (command === 'clear' || command === 'c') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel
        .send(
          "Sie können diesen Befehl nicht verwenden, da Ihnen das Perm `manage_messages` fehlt.",
        );
    }

    if (isNaN(input)) {
      return message.channel
        .send('Geben Sie die Anzahl der Nachrichten ein, die Sie löschen möchten.')
        .then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 5000);
        });
    }

    if (Number(input) < 0) {
      return message.channel
        .send('eine positive Zahl eingeben')
        .then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 5000);
        });
    }

    // add an extra to delete the current message too
    const amount = Number(input) > 100
      ? 101
      : Number(input) + 1;

    message.channel.bulkDelete(amount, true)
    .then((_message) => {
      message.channel
        // do you want to include the current message here?
        // if not it should be ${_message.size - 1}
        .send(`Der Bot hat \`${_message.size}\` Nachrichten :broom:`)
        .then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 5000);
        });
    });
  }
});



client.login(config.token)