const Discord = require("discord.js");
const jimp_img = require("./jimp_file.js");


module.exports = {
    async tag_rq(GmTags, msg, member, uid) {
		
		const tag = await GmTags.findOne({ where: { dis_id: uid } });
		if (tag) {

			jimp_img.jimp(tag, msg);

			/*const msgEmbed = new Discord.RichEmbed()
                    .setColor('0xFF0000')
                    .setAuthor('Scheda giocatore')
					.setDescription('Info di '+ member)
                    .addBlankField()
                    .addField('GamerTag (PC/Xbox)', tag.get('gamertag'), true)
                    .addField('Missione Preferita', tag.get('miss_pref'), true)
                    .addField('Legend ', tag.get('legend'), true)
                    .addField("Livello Cacciatore d'oro", tag.get('lvl_oro'), true)
                    .addField('Livello Anime ', tag.get('lvl_anime'), true)
					.addField('Livella Mercante', tag.get('lvl_mercante'), true)
					.addField('Livella Athena', tag.get('lvl_athena'), true)
                    .addField('PvP, PvE, PvP e PvE', tag.get('pvp_e'), true)
                    .addBlankField()
					.setTimestamp();
		
				try {
					msg.channel.send(msgEmbed);
				}
				catch (e) {
					console.log(e.message);
				}*/

		}
		else {
			msg.reply('Nessua Scheda Giocatore registrata dalla persona menzionata!');
			console.log(`FIND: Could not find tag: ${member.displayName}`);
		}
        
    }
};