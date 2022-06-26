module.exports.config = {
	name: "wibu",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "BaoNguyen",
	description: "Xem ảnh Wibu",
	commandCategory: "Hình Ảnh",
	usages: "wibu",
	cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://apiwibu.2711bao.repl.co').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: ` Ảnh wibu dành cho You <3\nSố ảnh hiện có: ${count} ảnh`,
            attachment: fs.createReadStream(__dirname + `/cache/wibu.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/wibu.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/wibu.${ext}`)).on("close", callback);
      })
}