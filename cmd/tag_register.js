const mp = require("../campi_db/miss_preferita.js")
const leg = require("../campi_db/legend.js")
const pvp_pve = require("../campi_db/pvp_pve.js")

module.exports = {
    async tag_reg(GmTags, msg, arg) {
        
        if (arg[7] === undefined)
            msg.reply("Devi immettere tutti i dati richiesti!");
        else {
            try {

                if (arg[8]) {
                    const tag = await GmTags.create({
                        nome: msg.author.username,
                        dis_id: msg.author.id,
                        gamertag: arg[0].trim(),
                        miss_pref: mp.miss_preferita(arg[1].trim()),
                        legend: leg.legend(arg[2].trim()),
                        lvl_oro: arg[3].trim(),
                        lvl_anime: arg[4].trim(),
                        lvl_mercante: arg[5].trim(),
                        lvl_athena: arg[6].trim(),
                        pvp_e: pvp_pve.pvp_e(arg[7].trim()),
                        link_img: arg[8].trim(),
                        
                    });
                    msg.reply('Scheda giocatore registrata correttamente!');
                    console.log(`REGISTER: Tag of ${tag.nome} added.`);
                }
                else {
                    const tag = await GmTags.create({
                        nome: msg.author.username,
                        dis_id: msg.author.id,
                        gamertag: arg[0].trim(),
                        miss_pref: mp.miss_preferita(arg[1].trim()),
                        legend: leg.legend(arg[2].trim()),
                        lvl_oro: arg[3].trim(),
                        lvl_anime: arg[4].trim(),
                        lvl_mercante: arg[5].trim(),
                        lvl_athena: arg[6].trim(),
                        pvp_e: pvp_pve.pvp_e(arg[7].trim()),
                        
                    });
                    msg.reply('Scheda giocatore registrata correttamente!');
                    console.log(`REGISTER: Tag of ${tag.nome} added.`);
                }
                // equivalent to: INSERT INTO tags (nome	, dis_id, gamertag) values (?, ?, ?);
                //console.log(arg[0]+ " " + arg[1])
                
                
            }
            catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    msg.reply('Hai già registrato una Scheda giocatore!');
                    console.log('REGISTER: That tag already exists.');
                }
                else {
                    msg.reply('Errore nella registrazione dela Scheda');
                    console.log('REGISTER: Something went wrong with adding a tag.');
                }
                    
            }
        }
        
    }
};