const jimp = require("jimp");
const fs = require ('fs')
module.exports = {

    async jimp(tag, msg) {

        let gamertag = tag.get('gamertag');
        let miss_pref = tag.get('miss_pref');
        let legend = tag.get('legend');
        let lvl_oro = tag.get('lvl_oro');
        let lvl_anime = tag.get('lvl_anime');
        let lvl_mercante = tag.get('lvl_mercante');
        let lvl_athena = tag.get('lvl_athena');
        let pvp_e = tag.get('pvp_e');
        let link = tag.get('link_img');
        
        const image = await jimp.read('./img/sfondo/Base.png');

        //missioni preferite
        const co = await jimp.read('./img/fazioni/CO.png');
        co.resize(1500, 1000);
        const oa = await jimp.read('./img/fazioni/OA.png');
        oa.resize(1500, 1000);
        const am = await jimp.read('./img/fazioni/AM.png');
        am.resize(1500, 1000);
        const lg = await jimp.read('./img/fazioni/Legend.png');
        lg.resize(1500, 1000);

        //pvp e pvp
        const pvp = await jimp.read('./img/pvp_e/PvP.png');
        pvp.resize(1500, 1000);
        const pve = await jimp.read('./img/pvp_e/PvE.png');
        pve.resize(1500, 1000);
        const pvpe = await jimp.read('./img/pvp_e/PvP&PvE.png');
        pvpe.resize(1500, 1000);

        //pirata leggendario
        const pl = await jimp.read('./img/sfondo/PL.png');
        pl.resize(1500, 1000);

        //immagine centrale
        console.log(link)
        let img_c = null;
        try {
            if (link) {
                img_c = await jimp.read(link);
                img_c.resize(532, 392);
            }
        }
        catch (err) {
            console.log("Errore immagine non caricata: "+err)
            msg.reply("Immagine caricata non corretta, modificarla con .tagedit -link")
            return;
        }
        

        //cornice
        const cornice = await jimp.read('./img/sfondo/Cornice_full.png');
        cornice.resize(1500,1000);


        //font
        const font = await jimp.loadFont('./font/Windlass.fnt');
        image.resize(1500, 1000);

        //print
        image.print(font, 460, 83, gamertag, 500);
        image.print(font, 224, 325, lvl_oro);
        image.print(font, 224, 495, lvl_anime);
        image.print(font, 224, 667, lvl_mercante);
        image.print(font, 224, 840, lvl_athena);


        //composite legend
        if (legend === "SI") {
            image.composite(pl,0,0);
        }

        //composite miss_pref
        if (miss_pref === "Cacciatori d'Oro") {
            image.composite(co,0,0);
        }
        else if (miss_pref === "Ordine delle Anime") {
            image.composite(oa,0,0);
        }
        else if (miss_pref === "Alleanza del Mercante") {
            image.composite(am,0,0);
        }
        else if (miss_pref === "Legend") {
            image.composite(lg,0,0);
        }
        
        //comosite pvp e pve
        if (pvp_e === "PVP") {
            image.composite(pvp,0,0);
        }
        else if (pvp_e === "PVE") {
            image.composite(pve,0,0);
        }
        else if (pvp_e === "PVP-PVE") {
            image.composite(pvpe,0,0);
        }

        
        //composite img
        
        if (link) {
            image.composite(img_c, 480, 304, {
                mode: jimp.BLEND_SOURCE_OVER,
                opacitySource: 0.97,
                opacityDest: 1
            });

            image.composite(cornice,0,0, {
                mode: jimp.BLEND_SOURCE_OVER,
                opacitySource: 0.97,
                opacityDest: 1
            });
        }
        


        await image.writeAsync('./scheda.png');
        
        await msg.channel.send({
            files: ['./scheda.png']
            });
        console.log("Scheda inviata correttamente!");
        fs.unlinkSync('./scheda.png');
        
        

    }

}