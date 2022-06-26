module.exports.config = {
	name: "sua",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Phan Duy",//được mode từ mdl toilet
	description: "gâu gâu gâu",
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
  var path_toilet = __dirname+'/cache/sua.jpg'; 
  var id = Object.keys(event.mentions)[0] || event.senderID;
  const canvas = Canvas.createCanvas(500, 670);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('https://scontent.xx.fbcdn.net/v/t1.15752-9/254360832_212736234270960_1552153836268570049_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_ohc=3I083MDkl_QAX8RhM1h&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=902297cfd71bd71429096fa805c34b2a&oe=61AEAA38');
  
	var avatar = await request.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
	avatar = await this.circle(avatar.body);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(await Canvas.loadImage(avatar), 80, 180, 180, 180);
	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(path_toilet,imageBuffer);
	 api.sendMessage({attachment: fs.createReadStream(path_toilet, {'highWaterMark': 128 * 1024}), body: "Kiki sủa sủa gáy gáy😼😼"}, event.threadID, () => fs.unlinkSync(path_toilet), event.messageID);
}
catch(e) {api.sendMessage(e.stack, event.threadID )}
}