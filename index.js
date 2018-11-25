const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const Sequelize = require('sequelize');
const admin_ids = require('./cmd/admin_ids.js');

const tag_register = require('./cmd/tag_register.js');
const tag_show = require('./cmd/tag_show.js');
const tag_request = require('./cmd/tag_request.js');
const tag_edit = require('./cmd/tag_edit.js');

const tag_edit_admin = require('./cmd/tag_edit_admin.js');
const tag_request_admin = require('./cmd/tag_request_admin.js');
const tag_help_admin = require('./cmd/tag_help_admin.js');

const tag_help = require('./cmd/help.js');

var pg = require('pg')
pg.defaults.ssl = true;

//1 alpha
const sequelize = new Sequelize(process.env.DATABASE_URL);

//1 alpha
/*const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    operatorsAliases: false,
    storage: './database.sqlite',
});*/

//2 beta CREATE TABLE tags ( nome VARCHAR(255) , dis_id INT , gamertag VARCHAR(255) )
const GmTags = sequelize.define('tags', {
    nome: {
        type: Sequelize.STRING,
		unique: true,
		allowNull: false,
    },
    dis_id: {
        type: Sequelize.BIGINT,
		unique: true,
        allowNull: false,
    },
    gamertag: {
        type: Sequelize.STRING,
	},
    miss_pref: {
        type: Sequelize.STRING,
	},
	legend: {
        type: Sequelize.STRING,
	},
	lvl_oro: {
        type: Sequelize.INTEGER,
	},
	lvl_anime: {
        type: Sequelize.INTEGER,
	},
	lvl_mercante: {
        type: Sequelize.INTEGER,
	},
	lvl_athena: {
        type: Sequelize.INTEGER,
	},
	pvp_e: {
        type: Sequelize.STRING,
	},
	link_img: {
		type: Sequelize.STRING,
	},
});


client.once("ready", () => {
  console.log("BOT Attivo");
  client.user.setActivity('Usa .taghelp');
  
  //3 gamma
  GmTags.sync();
  
});


client.on("message", async msg => {
	const args = msg.content.slice(config.prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;
	
	// registro una nuova scheda
	if (command === "tagadd") {
		const gt = args.slice(0).join(" ");
		const arg = gt.trim().split(',');
		
		console.log(arg)

		if(msg.channel.type !== 'text') {
			if (!admin_ids.ids(msg.author.id)) {
				msg.reply('Non puoi usare questo comando quì!')
				console.log(`COMMAND: Private blocked to ${msg.author.username}`);
				return;
			}
		}

		tag_register.tag_reg(GmTags, msg, arg);
	}
	
	// richiedo scheda player taggato
	else if (command === "tagrequest") {
		const member = msg.mentions.members.first();
		const uid = member.user.id;
		console.log("FIND " + member.displayName + "    " + uid);
		
		if(msg.channel.type !== 'text') {
			if (!admin_ids.ids(msg.author.id)) {
				msg.reply('Non puoi usare questo comando quì!')
				console.log(`COMMAND: Private blocked to ${msg.author.username}`);
				return;
			}
		}

		tag_request.tag_rq(GmTags, msg, member, uid)
	}
	
	// cambio di un valore della scheda
	else if (command === "tagedit") {
		
		const uid = msg.author.id;
		const user = msg.author.username;
		console.log("EDIT " + user + "    " + uid);
		
		if(msg.channel.type !== 'text') {
			if (!admin_ids.ids(msg.author.id)) {
				msg.reply('Non puoi usare questo comando quì!')
				console.log(`COMMAND: Private blocked to ${msg.author.username}`);
				return;
			}
		}

		tag_edit.tag_ed(GmTags, msg, args, uid, user);

	}
	
	// mostra propria scheda player
	else if (command === "tagshow") {
		const uid = msg.author.id;
		const user = msg.author.username;
		console.log("SHOW " + user + "    " + uid);

		if(msg.channel.type !== 'text') {
			if (!admin_ids.ids(msg.author.id)) {
				msg.reply('Non puoi usare questo comando quì!')
				console.log(`COMMAND: Private blocked to ${msg.author.username}`);
				return;
			}
		}

		tag_show.tag_sh(GmTags, msg, user, uid);
	}
	
	// elimina una scheda player
	else if (command === "tagdelete") {
		const uid = msg.author.id;
		const user = msg.author.username;
		console.log("DELETE: " + user + "    " + uid);
		
		if(msg.channel.type !== 'text') {
			if (!admin_ids.ids(msg.author.id)) {
				msg.reply('Non puoi usare questo comando quì!')
				console.log(`COMMAND: Private blocked to ${msg.author.username}`);
				return;
			}
		}

		const del = await GmTags.destroy({ where: { dis_id: uid } });
		if (del) {
			msg.reply('Scheda player eliminata correttamente!');
			console.log('DELETE: Tag deleted')
		}
		else {
			msg.reply('Nessuna scheda registrata!');
			console.log(`DELETE: Could not find tag: ${user}`);
		}
		
	}
	
	// comando help
	else if (command === "taghelp") {
		
		if(msg.channel.type !== 'text') {
			if (!admin_ids.ids(msg.author.id)) {
				msg.reply('Non puoi usare questo comando quì!')
				console.log(`COMMAND: Private blocked to ${msg.author.username}`);
				return;
			}
		}

		tag_help.help(msg);

	}



	//admin commands
	else if (command === "tageditadmin") {
		

		if(msg.channel.type !== 'text') {
			if (!admin_ids.ids(msg.author.id)) {
				msg.reply('Non puoi usare questo comando quì!')
				console.log(`COMMAND: Private blocked to ${msg.author.username}. Tag Edit Admin Command`);
				return;
			}

		}
		else {
			msg.delete(1000);
			console.log(`ADMIN: Msg deleted to ${msg.author.username}. Tag Edit Admin Command`);
			return;
		}


		tag_edit_admin.tag_edit(GmTags, msg, args);

	}
	
	else if (command === "tagrequestadmin") {

		if(msg.channel.type !== 'text') {
			if (!admin_ids.ids(msg.author.id)) {
				msg.reply('Non puoi usare questo comando quì!')
				console.log(`COMMAND: Private blocked to ${msg.author.username}. Tag Request Admin Command`);
				return;
			}
		}
		else {
			msg.delete(1000);
			console.log(`ADMIN: Msg deleted to ${msg.author.username}. Tag Request Admin Command`);
			return;
		}

		tag_request_admin.tag_rq_admin(GmTags, msg, args)
	}

	else if (command === "tagdeleteadmin") {
		const gt = args.slice(0).join(" ");
		const arg = gt.trim().split(' ');

		if(msg.channel.type !== 'text') {
			if (!admin_ids.ids(msg.author.id)) {
				msg.reply('Non puoi usare questo comando quì!')
				console.log(`COMMAND: Private blocked to ${msg.author.username}. Tag Delete Admin Command`);
				return;
			}
		}
		else {
			msg.delete(1000);
			console.log(`ADMIN: Msg deleted to ${msg.author.username}. Tag Delete Admin Command`);
			return;
		}

		const del = await GmTags.destroy({ where: { dis_id: arg[0] } });
		if (del) {
			msg.reply('Scheda player eliminata correttamente!');
			console.log('DELETE: Tag deleted')
		}
		else {
			msg.reply('Nessuna scheda registrata!');
			console.log(`DELETE: Could not find tag: ${user}`);
		}

	}

	else if (command === "taghelpadmin") {

		if(msg.channel.type !== 'text') {
			if (!admin_ids.ids(msg.author.id)) {
				msg.reply('Non puoi usare questo comando quì!')
				console.log(`COMMAND: Private blocked to ${msg.author.username}. Tag Help Admin Command`);
				return;
			}
		}
		else {
			msg.delete(1000);
			console.log(`ADMIN: Msg deleted to ${msg.author.username}. Tag Help Admin Command`);
			return;
		}

		tag_help_admin.help(msg)

	}
	
});

client.login(process.env.BOT_TOKEN);
