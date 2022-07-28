const Discord = require('discord.js')

const { system, DateFormatting } = require('../utils')
const { platfromReslove, pingStatus } = require('../polyfill')
const { EmbedBuilder, time } = require('discord.js')

const version = require('../../package.json').version

module.exports = async function (message, parent) {
  const description = [
    `Process started at **${time(System.processStartTime())}**`,
    `Bot was online for **${time(debug.client.readyAt, 'R')}**`,
  ];

  const field = [
    '```diff',
    `+ Discord.js: v${DiscordJSVersion}`,
    `+ Node.js: ${process.version}`,
    `+ Platform: ${platfromReslove(process.platform)}`,
    `+ Dokdo: v${version}`,
    `+ Memory usage: ${system.getMemoryUsage()}`,
    pingStatus(debug.client.ws.ping),
    '```',
  ];
  const cache = `${debug.client.guilds.cache.size} guild(s) and ${debug.client.users.cache.size} user(s)`;

  if (debug.client.shard) {
    const guilds = (await debug.client.shard
      .fetchClientValues('guilds.cache.size')
      .then((r) => r.reduce((prev, val) => Number(prev) + Number(val), 0)));
    description.push(
      `Running on PID ${process.pid} for this client, and running on PID ${process.ppid} for the parent process.`,
      '',
      `This bot is sharded in ${
        Array.isArray(debug.client.shard) ? debug.client.shard.length : debug.client.shard.count
      } shard(s) and running in ${guilds} guild(s).\nCan see ${cache} in this client.`,
    );
  } else description.push(`Running on **PID ${process.pid}**\n\nThis bot is not sharded and can see **${cache}**.`);

  const embed = new EmbedBuilder()
    .setTitle('Debug Tool')
    .setDescription(description.join('\n'))
    .setColor('#5865F2')
    .setFields([
      {
        name: '> **Info**',
        value: field.join('\n'),
        inline: true,
      },
    ]);
  message.reply({ embeds: [embed] })
}
