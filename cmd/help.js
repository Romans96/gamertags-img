const Discord = require("discord.js");

module.exports = {

    help(msg) {
        const logo = new Discord.Attachment('./img/Logo.png', "Logo.png");

        let reg = [
            "Sintassi: .tagadd gamertag, mf, pl, lvl_o, lvl_a, lvl_m, lvl_at, pvp/e[, link]",
            "\n:small_blue_diamond: **gamertag**: Proprio nome su Xbox/App Xbox. (Obbligatorio)",
            "\n:small_blue_diamond: **mf**: Missione preferita: 1 - Cacciatori, 2 - Anime, 3 - Mercante, 4 - Legend. (Obbligatorio)",
            "\n:small_blue_diamond: **pl**: Pirata Leggendario: 1 se sei Legend, 0 se non lo sei. (Obbligatorio)",
            "\n:small_blue_diamond: **lvl**: Rispettivamente i vostri livelli delle 3 fazioni (1-50) e Athena (1-10). (Obbligatorio)",
            "\n:small_blue_diamond: **pvp/pve**: Se preferite fare PVP (1), PVE (2), o entrambi (3). (Obbligatorio)",
            "\n:small_blue_diamond: **Link**: Link DIRETTO ad un'immagine. :warning: **!!L'immagine deve avere un rapporto di: 3:2 !!** :warning:  (Facoltativo)", //reg[6]
            
            "\n\n*ESEMPIO 1*: .tagadd Pippo, 2, 1, 45, 43, 37, 6, 3",
            "\n Ovvero la mia scheda avrà: Gamertag: Pippo, Missione Preferita: Anime (2), Pirata Leggendario: SI (1)",
            ", Livello Cacciatore: 45, Licello Anime: 43, Livello Mercante: 37, Livlelo Athena: 6, Sia PvP che PvE (3)",
            "\n*ESEMPIO 2*: se volessi aggiungere un'immagine alla mia scheda, basta inserire il link in fondo",
            "\n__IMPORTANTE__: Il LInk deve essere DIRETTO all'immagine. Così https://imgur.com/a/Dhe0MaG non va bene. Mentre così https://i.imgur.com/UuMpqhd.jpg si => (Tasto destro sull'immagine 'Copia indirizzo dell'immagine')."
        ]

        let edit = [
            "Sintassi: .tagedit -[command] Sostituzione",
            "\n Al posto di [command] è possibile usare:",
            "\n:small_blue_diamond: **gt**: cambio il GamerTag",
            "\n:small_blue_diamond: **mf**: cambio la Missione Preferita (1-2-3-4)",
            "\n:small_blue_diamond: **pl**: cambio Pirata Leggendario( 1 si, 0 no)",
            "\n:small_blue_diamond: **lvlo**: cambio Livello Cacciatore d'Oro (1-50)",
            "\n:small_blue_diamond: **lvla**: cambio Livello Ordine delle Anime (1-50)",
            "\n:small_blue_diamond: **lvlm**: cambio Livello Alleanza del Mercante (1-50)",
            "\n:small_blue_diamond: **lvlat**: cambio Livello Athena (1-10)",
            "\n:small_blue_diamond: **pvpe**: cambio preferenze PvP, PvE, PvP e PvE (1-3)",
            "\n:small_blue_diamond: **link**: cambio/aggiungo un'immagine sulla Scheda (LINK DIRETTO)", //edit[10]

            "\n\n*Esempio 1*: .tagedit -gt Pluto",
            "\n Cambio il mio GamerTag in Pluto",
            "\n*Esempio 2*: .tagedit -mf 4",
            "\n Cambio la mia Missione Preferita in 'Legend'",
            "\n*Esempio 3*: .tagedit -lvlat 8",
            "\n Cambio il mio livello di AThena in 10",
            "\n*Esempio 4*: .tagedit -pvpe 3",
            "\n Cambio la mia Preferenza sia in PvP che PvE",
            "\n*Esempio 4*: .tagedit -pvpe 1",
            "\n Cambio la mia Preferenza in Solo PvP", //edit[20]
            "\n*Esempio 5*: .tagedit -link rm",
            "\n Rimuove il link/immagine dalla scheda"

        ]


        const msgEmbed = new Discord.RichEmbed()
            .attachFile(logo)
            .setColor('0xFF0000')
            .setAuthor('HELP Jack Occhiolungo', 'attachment://Logo.png')
            .setDescription("Comandi per l'uso del bot")
            // tag register
            .addField('--> __Registrare una nuova Scheda Giocatore__ <--',
                reg[0]+reg[1]+reg[2]+reg[3]+reg[4]+reg[5]+reg[6]
                )
            .addField('ESEMPI:', 
                reg[7]+reg[8]+reg[9]+reg[10]+reg[11] 
                )
            //.addBlankField()
            //tag edit
            .addField('--> __Modifica della Scheda Giocatore__ <--',
                edit[0]+edit[1]+edit[2]+edit[3]+edit[4]+edit[5]+edit[6]+
                edit[7]+edit[8]+edit[9]+edit[10]
                )
            .addField('ESEMPI:',
                edit[11]+edit[12]+edit[13]+edit[14]+edit[15]+edit[16]+
                edit[17]+edit[18]+edit[19]+edit[20]+edit[21]+edit[22]
                )
            //.addBlankField()
            //tag show
            .addField('--> __Mostra propria Scheda Giocatore__ <--',
                "Sintassi: .tagshow")
            //.addBlankField()
            //tag request
            .addField('--> __Mostra Scheda Giocatore di un player taggato__ <--',
                "Sintassi: .tagrequest @utente")
            .addField('ESEMPIO:',
                ".tagrequest @Macr0ne (premete invio quando trova il giocatore) mostrerà la scheda di Macrone, se ne ha registrata una")
            //.addBlankField()
            //tag delete
            .addField('--> __Elimina la propria Scheda Giocatore__ <--',
                "Sintassi: .tagdelete")
            //.addBlankField()
            .setFooter('\u200B','attachment://Logo.png')
            .setTimestamp();

        try {
            msg.channel.send(msgEmbed);
            console.log('HELP: Help message sent (TAGHELP)')
        }
        catch (e) {
            console.log("HELP: "+e.message);
        }

    }

}
