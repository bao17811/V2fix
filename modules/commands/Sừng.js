const fs = require("fs");
module.exports.config = {
name: "sừng",
	version: "1.0.0",
  	hasPermssion: 0,
    	description: "Mọc sừng!!",
      	commandCategory: "Không cần dấu lệnh",
        	usages: "noprefix",
          	cooldowns: 5,
            };
            module.exports.onLoad = () => {
                const fs = require("fs-extra");
                    const request = require("request");
                        const dirMaterial = __dirname + `/noprefix/`;
                            if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
                                if (!fs.existsSync(dirMaterial + "sừng.mp4")) request("https://tinyurl.com/yjbz2kln").pipe(fs.createWriteStream(dirMaterial + "sừng.mp4"));
                                }
                                module.exports.handleEvent = function({ api, event }) {
                                	var { threadID, messageID } = event;
                                  	if (event.body.indexOf("sừng")==0 || (event.body.indexOf("Sừng")==0)){
                                    	  var msg = {
                                        				body: "Mọc sừng nè!!",
                                                				attachment: fs.createReadStream(__dirname + `/noprefix/sừng.mp4`)
                                                        			}
                                                              			return api.sendMessage(msg, threadID, messageID);
                                                                    		}
                                                                        	}
                                                                          	module.exports.run = function({ api, event, client, __GLOBAL }) {

                                                                            }