const Discord = require("discord.js");

module.exports = {

    help(msg) {
        const logo = new Discord.Attachment('./img/Logo.png', "Logo.png");
        let edit = [
            "Sintassi: .tageditadmin id_player -[command] Sostituzione",
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

            "\n\n*Esempio 1*: .tageditadmin 332261105177198593 -gt Pluto",
            "\n Cambio il mio GamerTag in Pluto",
            "\n*Esempio 2*: .tageditadmin 332261105177198593 -mf 4",
            "\n Cambio la mia Missione Preferita in 'Legend'",
            "\n*Esempio 3*: .tageditadmin 332261105177198593 -lvlat 8",
            "\n Cambio il mio livello di AThena in 10",
            "\n*Esempio 4*: .tageditadmin 332261105177198593 -pvpe 3",
            "\n Cambio la mia Preferenza sia in PvP che PvE",
            "\n*Esempio 4*: .tageditadmin 332261105177198593 -pvpe 1",
            "\n Cambio la mia Preferenza in Solo PvP" //edit[20]

        ]


        const msgEmbed = new Discord.RichEmbed()
            .attachFile(logo)
            .setColor('0xFF0000')
            .setAuthor('HELP Jack Occhiolungo', 'attachment://Logo.png')
            .setDescription("Comandi per l'uso del bot")
            //tag edit admin
            .addField('--> __Modifica della Scheda di un Giocatore__ <--',
                edit[0]+edit[1]+edit[2]+edit[3]+edit[4]+edit[5]+edit[6]+
                edit[7]+edit[8]+edit[9]+edit[10]
                )
            .addField('ESEMPI:',
                edit[11]+edit[12]+edit[13]+edit[14]+edit[15]+edit[16]+
                edit[17]+edit[18]+edit[19]+edit[20]
                )
            //.addBlankField()
            //tag request
            .addField('--> __Mostra Scheda di un Giocatore__ <--',
                "Sintassi: .tagrequestadmin id_player")
            .addField('ESEMPIO:',
                ".tagrequestadmin 332261105177198593 mostrerà la scheda, se ne ha registrata una")
            //.addBlankField()
            //tag delete
            .addField('--> __Elimina la Scheda di un Giocatore__ <--',
                "Sintassi: .tagdeleteadmin id_player")
            //.addBlankField()
            .setFooter('\u200B','attachment://Logo.png')
            .setTimestamp();

        try {
            msg.channel.send(msgEmbed);
            console.log('HELP: Help message sent (ADMIN)')
        }
        catch (e) {
            console.log("HELP: "+e.message);
        }

    }

}