module.exports.config = {
  name: "callad",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "NTKhang fix by Jukie",
  description: "thông báo lỗi của bot đến admin hoặc góp ý",
  commandCategory: "Tiện ích",
  usages: "[lỗi gặp phải hoặc ý kiến]",
  cooldowns: 5,
};

module.exports.handleReply = async function({ api, args, event, handleReply, Users}) {
  var name = (await Users.getData(event.senderID)).name 
 switch(handleReply.type) {
   case "reply": {
     var idad = global.config.ADMINBOT;
     for(let ad of idad) {
     api.sendMessage({body: "📣𝑷𝒉𝒂̉𝒏 𝑯𝒐̂̀𝒊 𝑻𝒖̛̀ 𝑨𝑫𝑴𝑰𝑵 ➢"+name+":\n"+event.body, mentions: [{
      id: event.senderID,
      tag: name}]},ad , (e, data) => global.client.handleReply.push({
      name: this.config.name,
      messageID: data.messageID,
      messID: event.messageID,
      author: event.senderID,
      id: event.threadID,
      type: "calladmin"}))
     }
   break;}
    case "calladmin": {
      api.sendMessage({ body: `📣𝑷𝒉𝒂̉𝒏 𝑯𝒐̂̀𝒊 𝑻𝒖̛̀ 𝑨𝑫𝑴𝑰𝑵 ${name} Đ𝒆̂́𝒏 𝑩𝒂̣𝒏:\n━━━━━━━━━━━\n${event.body}\n━━━━━━━━━━━\n➢ 📩𝑷𝒉𝒂̉𝒏 𝑯𝒐̂̀𝒊 𝑻𝒊𝒏 𝑵𝒉𝒂̆́𝒏 𝑵𝒂̀𝒚 Đ𝒆̂̉ 𝑻𝒊𝒆̂́𝒑 𝑻𝒖̣𝒄 𝑮𝒖̛̉𝒊 𝑩𝒂́𝒐 𝑪𝒂́𝒐 𝑽𝒆̂̀ 𝑨𝑫𝑴𝑰𝑵 ✅`, mentions: [{tag: name, id : event.senderID}]}, handleReply.id, (e, data) => global.client.handleReply.push({
  name: this.config.name,
  author: event.senderID,
  messageID: data.messageID,
  type: "reply"}), handleReply.messID);
   break;}
     
     }
  
  
};

module.exports.run = async function({ api, event, args, Users }) {
  if (!args[0])
    return api.sendMessage(
      "➢ 𝑩𝒂̣𝒏 𝑪𝒉𝒖̛𝒂 𝑵𝒉𝒂̣̂𝒑 𝑵𝒐̣̂𝒊 𝑫𝒖𝒏𝒈 𝑩𝒂́𝒐 𝑪𝒂́𝒐 𝑻𝒐̛́𝒊 𝑨𝑫𝑴𝑰𝑵✅",
      event.threadID,
      event.messageID
    );
  //var data = await api.getUserInfo(event.senderID); 
  var name = (await Users.getData(event.senderID)).name;
  var idbox = event.threadID;
 // const url = (api.getCurrentUserID(event.senderID));
  var datathread = await api.getThreadInfo(event.threadID);
  var namethread = datathread.name;

  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
  var soad = global.config.ADMINBOT.length;
  api.sendMessage(
    "✅Đ𝑎̃ 𝐺𝑢̛̉𝑖 𝐵𝑎́𝑜 𝐶𝑎́𝑜 𝐶𝑢̉𝑎 𝐵𝑎̣𝑛 Đ𝑒̂́𝑛 𝐴𝐷𝑀𝐼𝑁 𝑷𝒉𝒂𝒏 𝑫𝒖𝒚😪",
    event.threadID,
    () => {
    var idad = global.config.ADMINBOT;
    for(let ad of idad) {
        api.sendMessage(`📣𝑩𝒂́𝒐 𝑪𝒂́𝒐 𝑻𝒖̛̀: ${name}\n📲𝑩𝒐𝒙: ${namethread}\n📩𝑰𝑫 𝑩𝒐𝒙: ${idbox}\n━━━━━━━━━━━ \n⚠️𝑩𝒂́𝒐 𝑪𝒂́𝒐: ${args.join(
            " "
          )}\n━━━━━━━━━━━\n⏰𝑻𝒊𝒎𝒆: ${gio}`,
          ad, (error, info) =>
            global.client.handleReply.push({
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              messID: event.messageID,
              id: idbox,
              type: "calladmin"
            })
        );
    }
    }
  );
};