module.exports.config = {
  name: "loli",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kadeer",
  description: "loli",
  commandCategory: "ramdom-images",
  usages: "loli",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://apiloli.2711bao.repl.co').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `🌸Ảnh loli dành cho các lolicon <3\n🌸Số ảnh hiện có: ${count} ảnh`,
            attachment: fs.createReadStream(__dirname + `/cache/loli.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/loli.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/loli.${ext}`)).on("close", callback);
      })
}