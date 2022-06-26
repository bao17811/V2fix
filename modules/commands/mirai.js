module.exports.config = {
	name: "mirai",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "VanHung",
	description: "Xem ảnh Wibu",
	commandCategory: "Hình Ảnh",
	usages: "mirai",
	cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://apimirai.2711bao.repl.co').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: ` Ảnh mirai cut3 dành cho You <3\nSố ảnh hiện có: ${count} ảnh`,
            attachment: fs.createReadStream(__dirname + `/cache/mirai.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/mirai.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/mirai.${ext}`)).on("close", callback);
      })
}