module.exports.config = {

	name: "khanhsky",

	version: "1.0.0",
	hasPermssion: 0,
	credits: "Phan Duy",
	description: "Comment trên trang của Khanhsky",
	commandCategory: "edit-img",
	usages: "khanhsky [text]",
	cooldowns: 10,
	dependencies: {
		"canvas":"",
		 "axios":"",
		 "fs-extra":""
	}
};

module.exports.wrapText = (ctx, text, maxWidth) => {
	return new Promise(resolve => {
		if (ctx.measureText(text).width < maxWidth) return resolve([text]);
		if (ctx.measureText('W').width > maxWidth) return resolve(null);
		const words = text.split(' ');
		const lines = [];
		let line = '';
		while (words.length > 0) {
			let split = false;
			while (ctx.measureText(words[0]).width >= maxWidth) {
				const temp = words[0];
				words[0] = temp.slice(0, -1);
				if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
				else {
					split = true;
					words.splice(1, 0, temp.slice(-1));
				}
			}
			if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
			else {
				lines.push(line.trim());
				line = '';
			}
			if (words.length === 0) lines.push(line.trim());
		}
		return resolve(lines);
	});
} 

module.exports.run = async function({ api, event, args }) {
	let { senderID, threadID, messageID } = event;
	const { loadImage, createCanvas } = require("canvas");
	const fs = global.nodemodule["fs-extra"];
	const axios = global.nodemodule["axios"];
	let pathImg = __dirname + '/cache/khanhsky.jpg';
	var text = args.join(" ");
	if (!text) return api.sendMessage("Nhập nội dung comment trên bảng", threadID, messageID);
	let getPorn = (await axios.get(`https://scontent.xx.fbcdn.net/v/t1.15752-9/p480x480/247672310_207530958170483_1468117954109528631_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=ae9488&_nc_ohc=LR-sN9hRxv0AX8YZkSB&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=0aa68b86b09bd32dad98c720f0157e40&oe=619FDE4B`, { responseType: 'arraybuffer' })).data;
	fs.writeFileSync(pathImg, Buffer.from(getPorn, 'utf-8'));
	let baseImage = await loadImage(pathImg);
	let canvas = createCanvas(baseImage.width, baseImage.height);
	let ctx = canvas.getContext("2d");
	ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
	ctx.font = "400 44px Arial";
	ctx.fillStyle = "#000000";
	ctx.textAlign = "start";
	let fontSize = 50;
	while (ctx.measureText(text).width > 1200) {
		fontSize--;
		ctx.font = `400 ${fontSize}px Arial`;
	}
	const lines = await this.wrapText(ctx, text, 470);
	ctx.fillText(lines.join('\n'), 38,630);//comment
	ctx.beginPath();
	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(pathImg, imageBuffer);
return api.sendMessage({ attachment: fs.createReadStream(pathImg) }, threadID, () => fs.unlinkSync(pathImg), messageID);        
}