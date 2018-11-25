const Discord = require("discord.js");
const jimp_img = require("./jimp_file.js");

module.exports = {
    async tag_sh(GmTags, msg, user, uid) {
        
        const tag = await GmTags.findOne({ where: { dis_id: uid } });
		if (tag) {

            jimp_img.jimp(tag, msg);

			//msg.reply('Il tuo GamerTag attualmente registrato è: ' +"  **"+ gamert +"**" + "  e   "+mpref);
            /*console.log(`SHOW: Tag shown`);

            const msgEmbed = new Discord.RichEmbed()
                .setColor('0xFF0000')
                .setAuthor('Scheda giocatore')
                .setDescription('Info di '+ msg.author.toString())
                .addBlankField()
                .addField('GamerTag (PC/Xbox)', tag.get('gamertag'), true)
                .addField('Missione Preferita', tag.get('miss_pref'), true)
                .addField('Legend ', tag.get('legend'), true)
                .addField("Livello Cacciatore d'oro", tag.get('lvl_oro'), true)
                .addField('Livello Anime ', tag.get('lvl_anime'), true)
                .addField('Livella Mercante', tag.get('lvl_mercante'), true)
                .addField('Livella Athena', tag.get('lvl_athena'), true)
                .addField('PvP, PvE, PvP e PvE', tag.get('pvp_e'), true)
                .addField('Link Immagine', tag.get('link_img'), true)
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
			msg.reply('Nessun GamerTag registrato!');
			console.log(`SHOW: Could not find tag: ${user}`);
		}
        
    }
};