module.exports.config = {
  name: "bb",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "BaoNguyen",
  description: "Ảnh bb <3",
  commandCategory: "game",
  usages: "bb",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://apibb.2711bao.repl.co').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `🌸Ảnh bb cho các con zợ đây <3\n🌸Số ảnh hiện có: ${count} ảnh`,
            attachment: fs.createReadStream(__dirname + `/cache/bb.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/bb.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/bb.${ext}`)).on("close", callback);
      })
}