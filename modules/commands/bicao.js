module.exports.config = {
	name: "bicao",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Phan Duy", 
	description: "Bị cáo",
	commandCategory: "hình ảnh",
	usages: "rank",
	cooldowns: 5,
	dependencies: {
	  "fs-extra": "",
	  "axios": "",
	  "canvas" :"",
	  "jimp": "",
	  "node-superfetch": ""
	}
};

module.exports.circle = async (image) => {
	  const jimp = global.nodemodule['jimp'];
  	image = await jimp.read(image);
  	image.circle();
  	return await image.getBufferAsync("image/png");
};

module.exports.run = async ({ event, api, args, Users }) => {
try {
  const Canvas = global.nodemodule['canvas'];
  const request = global.nodemodule["node-superfetch"];
  const jimp = global.nodemodule["jimp"];
  const fs = global.nodemodule["fs-extra"];
  var path_toilet = __dirname+'/cache/bicao.jpg'; 
  var id = Object.keys(event.mentions)[0] || event.senderID;
  const canvas = Canvas.createCanvas(500, 670);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('https://scontent.xx.fbcdn.net/v/t1.15752-9/p480x480/245808780_1036695467088399_9196965246421027890_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=ae9488&_nc_ohc=DsEwkp-F4X0AX-U_7mW&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=f97e45c517360b5600c256e81aeadc7d&oe=61A15352');
  
	var avatar = await request.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
	avatar = await this.circle(avatar.body);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(await Canvas.loadImage(avatar), 170, 114, 145, 145);
	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(path_toilet,imageBuffer);
	 api.sendMessage({attachment: fs.createReadStream(path_toilet, {'highWaterMark': 128 * 1024}), body: "Bạn Đã Bị Tuyên Phạt chung thân"}, event.threadID, () => fs.unlinkSync(path_toilet), event.messageID);
}
catch(e) {api.sendMessage(e.stack, event.threadID )}
}