module.exports.config = {
	name: "dovui",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "NTKhang",
	description: "Chơi game đố vui",
	commandCategory: "giải trí",
	usages: "dovui",
	cooldowns: 5
};

module.exports.handleReaction = ({ handleReaction, api, event }) => {
  var { cauhoi, a, b, c, d, dapan, author, messageID } = handleReaction;
  if(event.userID != author) return;
  var local = "";
  if(event.reaction == "❤") local = "a"
  else if(event.reaction == "😆") local = "b"
  else if(event.reaction == "😮") local = "c"
  else local = "d";
  if (local != dapan) {
     api.sendMessage(`Sai rồi!!\n${handleReaction[local][1]}\nBạn chọn ${local}. Đáp án đúng là ${dapan[0]}`, event.threadID, event.messageID);
  }
  else {
     api.sendMessage(handleReaction[local][1], event.threadID, event.messageID);
  };
  var datahandle = global.client.handleReaction;
  var length = datahandle.length;
  for(let i = 0; i < length; i++) {
    if(datahandle[i].messageID == messageID) return global.client.handleReaction.splice(i, 1);
  }
};

module.exports.run = async ({ event, api }) => {
  const axios = require("axios");
  var data = (await axios.get("https://api-ntk.herokuapp.com/gamedovuiupdate?key=caafarXagasFavVXa")).data;

  var { cauhoi, a, b, c, d, dapan } = data;
  api.sendMessage(`${cauhoi}\n❤️: ${a[0]}\n😆: ${b[0]}\n😮: ${c[0]}\n👍: ${d[0]}`, event.threadID, (err, info) => global.client.handleReaction.push({
    name: this.config.name,
    messageID: info.messageID,
    author: event.senderID,
    a, b, c, d, dapan
  }), event.messageID);
};