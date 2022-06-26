const fs = require("fs");
module.exports.config = {
name: "Hảo",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung",
	description: "được bạn hảo hán",
	commandCategory: "Không cần dấu lệnh",
	usages: "ko cần prefix chỉ cần chat hảo",
	cooldowns: 5,
};
module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("hảo")==0 || (event.body.indexOf("Hảo")==0)) {
		var msg = {
				body: "Được bạn :))",
				attachment: fs.createReadStream(__dirname + `/noprefix/hảo.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}

