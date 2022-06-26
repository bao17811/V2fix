module.exports.config = {
	name: "honda",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Phan Duy", // Mod từ toilet kikiki
	description: "Honda chó",
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
  var dog = __dirname+'/cache/honda.jpg'; 
  var id = Object.keys(event.mentions)[0] || event.senderID;
  const canvas = Canvas.createCanvas(499, 722);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('https://scontent.xx.fbcdn.net/v/t1.15752-9/p480x480/246808655_623684668663501_7786955874539262864_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=ae9488&_nc_ohc=qEVorO6Q5ZwAX_6pS1F&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=8180ee1d28de05962f5db73f3f9b540a&oe=619F9225');
  
	var avatar = await request.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
	avatar = await this.circle(avatar.body);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(await Canvas.loadImage(avatar), 335, 150, 160, 160);
	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(dog,imageBuffer);
	 api.sendMessage({attachment: fs.createReadStream(dog, {'highWaterMark': 128 * 1024}), body: "Lên xe anh đèo 😏"}, event.threadID, () => fs.unlinkSync(dog), event.messageID);
}
catch(e) {api.sendMessage(e.stack, event.threadID )}
}