const Discord = require("discord.js");
const client = new Discord.Client();
const jimp_img = require("./jimp_file.js");


module.exports = {
    async tag_rq_admin(GmTags, msg, args) {
		
		const gt = args.slice(0).join(" ");
		const arg = gt.trim().split(' ');
		
		//let username = client.users.find(x=>x.username===arg[0])

		const tag = await GmTags.findOne({ where: { dis_id: arg[0] } });
		if (tag) {

			//jimp_img.jimp(tag, msg);

			const msgEmbed = new Discord.RichEmbed()
                    .setColor('0xFF0000')
                    .setAuthor('Scheda giocatore')
					.setDescription('Info di '+ arg[0])
                    .addBlankField()
                    .addField('GamerTag (PC/Xbox)', tag.get('gamertag'), true)
                    .addField('Missione Preferita', tag.get('miss_pref'), true)
                    .addField('Legend ', tag.get('legend'), true)
                    .addField("Livello Cacciatore d'oro", tag.get('lvl_oro'), true)
                    .addField('Livello Anime ', tag.get('lvl_anime'), true)
					.addField('Livella Mercante', tag.get('lvl_mercante'), true)
					.addField('Livella Athena', tag.get('lvl_athena'), true)
					.addField('PvP, PvE, PvP e PvE', tag.get('pvp_e'), true)
					.addField("Link", tag.get('link_img') ,true)
                    .addBlankField()
					.setTimestamp();
		
				try {
					msg.channel.send(msgEmbed);
				}
				catch (e) {
					console.log(e.message);
				}

		}
		else {
			msg.reply('Nessua Scheda Player registrata dalla persona menzionata!');
			console.log(`FIND: Could not find tag: ${arg[0]}`);
		}
        
    }
};
