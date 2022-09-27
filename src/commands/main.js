const Discord = require('discord.js')
const { EmbedBuilder, time } = require('discord.js')
const { system } = require('../utils')
const { platfromReslove, pingStatus } = require('../polyfill')

const version = require('../../package.json').version

module.exports = async function (message, parent) {
  const description = [
    `Process started at **${time(system.processStartTime())}**`,
    `Bot was online for **${time(parent.client.readyAt, 'R')}**`
  ]

  const field = [
    '```diff',
    `+ Discord.js: v${Discord.version}`,
    `+ Node.js: ${process.version}`,
    `+ Platform: ${platfromReslove(process.platform)}`,
    `+ Dokdo: v${version}`,
    `+ Memory usage: ${system.getMemoryUsage()}`,
    pingStatus(parent.client.ws.ping),
    '```'
  ]
  const cache = `${parent.client.guilds.cache.size} guild(s) and ${parent.client.users.cache.size} user(s)`

  if (parent.client.shard) {
    const guilds = await parent.client.shard
      .fetchClientValues('guilds.cache.size')
      .then((r) => r.reduce((prev, val) => Number(prev) + Number(val), 0))
    description.push(
      `Running on PID ${process.pid} for this client, and running on PID ${process.ppid} for the parent process.`,
      '',
      `This bot is sharded in ${
        Array.isArray(parent.client.shard)
          ? parent.client.shard.length
          : parent.client.shard.count
      } shard(s) and running in ${guilds} guild(s).\nCan see ${cache} in this client.`
    )
  } else
    description.push(
      `Running on **PID ${process.pid}**\n\nThis bot is not sharded and can see **${cache}**.`
    )

  const embed = new EmbedBuilder()
    .setTitle('Dokdo')
    .setDescription(description.join('\n'))
    .setColor('#2f3136')
    .setFields([
      {
        name: '> **Info**',
        value: field.join('\n'),
        inline: true
      }
    ])
  message.reply({ embeds: [embed] })
}
