const Discord = require("discord.js");
const client = new Discord.Client();
const mp = require("../campi_db/miss_preferita.js")
const leg = require("../campi_db/legend.js")
const pvp_pve = require("../campi_db/pvp_pve.js")

module.exports = {

    async tag_edit(GmTags, msg, args) {

        const gt = args.slice(0).join(" ");
        const arg = gt.trim().split(' ');
        var uid = arg[0];
        
        const comando = ["-gt", "-mf", "-pl", "-lvlo", "-lvla", "-lvlm", "-lvlat", "-pvpe", "-link"];
        var selectedTag = null;
        let affectedRows = null;

        if (!arg[0]) {
            msg.reply('Devi inserire tutti i campi richiesti!');
            return;
        }

        switch(arg[1].toLowerCase()) {
            case comando[0].trim():
                console.log(`GamerTag changed for ${uid}`);
                selectedTag = arg[2].trim();
                affectedRows = await GmTags.update({ gamertag: selectedTag }, { where: { dis_id: uid } })
                break;
            case comando[1].trim():
                console.log(`Missione Preferita changed for ${uid}`);
                selectedTag = arg[2].trim();
                affectedRows = await GmTags.update({ miss_pref: mp.miss_preferita(selectedTag.trim()) }, { where: { dis_id: uid } })
                break;
            case comando[2].trim():
                console.log(`Legend(SI,NO) changed for ${uid}`);
                selectedTag = arg[2].trim();
                affectedRows = await GmTags.update({ legend: leg.legend(selectedTag.trim()) }, { where: { dis_id: uid } })
                break;
            case comando[3].trim():
                console.log(`Lvl Cacciatori changed for ${uid}`);
                selectedTag = arg[2].trim();
                affectedRows = await GmTags.update({ lvl_oro: selectedTag }, { where: { dis_id: uid } })
                break;
            case comando[4].trim():
                console.log(`Lvl Anime changed for ${uid}`);
                selectedTag = arg[2].trim();
                affectedRows = await GmTags.update({ lvl_anime: selectedTag }, { where: { dis_id: uid } })
                break;
            case comando[5].trim():
                console.log(`Lvl Mercante changed for ${uid}`);
                selectedTag = arg[2].trim();
                affectedRows = await GmTags.update({ lvl_mercante: selectedTag }, { where: { dis_id: uid } })
                break;
            case comando[6].trim():
                console.log(`Lvl Athena changed for ${uid}`);
                selectedTag = arg[2].trim();
                affectedRows = await GmTags.update({ lvl_athena: selectedTag }, { where: { dis_id: uid } })
                break;
            case comando[7].trim():
                console.log(`PVP/PVE changed for ${uid}`);
                selectedTag = arg[2].trim();
                affectedRows = await GmTags.update({ pvp_e: pvp_pve.pvp_e(selectedTag.trim()) }, { where: { dis_id: uid } })
                break;
            case comando[8].trim():
                console.log(`Image Link changed for ${uid}`);
                selectedTag = arg[2].trim();
                console.log(selectedTag)
                if (selectedTag.toLowerCase() === "rm")
                    affectedRows = await GmTags.update({ link_img: null }, { where: { dis_id: uid } })
                else if (selectedTag.startsWith('http') || selectedTag.startsWith('www'))
                    affectedRows = await GmTags.update({ link_img: selectedTag }, { where: { dis_id: uid } })
                else
                    msg.reply("Devi inserire un Link DIRETTO ad un'immagine, che inizia con http o www!");
                break;

            default:
                msg.reply('Devi inserire uno dei comandi presenti correttamente!')
        }
        
		if (affectedRows > 0) {
			msg.reply('Hai modificato correttamente la tua Scheda!');
			console.log(`EDIT: Tag for ${uid} was edited.`);
		}
		else {
			msg.reply('Modifica non riuscita, ricontrolla i dati ed, eventualmente, che tu abbia registrato una scheda giocatore correttamente!')
			console.log(`EDIT: error at the edit of for ${uid}.`);
		}

    }

}