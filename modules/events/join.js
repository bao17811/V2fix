module.exports.config = {
	name: "join",
	eventType: ["log:subscribe"],
	version: "1.0.1",
	credits: "Mirai Team",
	description: "Thông báo bot hoặc người vào nhóm",
	dependencies: {
		"fs-extra": ""
	}
};

module.exports.run = async function({ api, event }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "Bot Cre By Bao" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		return api.sendMessage(`⋙ 𝙆𝙚̂́𝙩 𝙉𝙤̂́𝙞 𝙏𝙝𝙖̀𝙣𝙝 𝘾𝙤̂𝙣𝙜 ⋘\n\n📩🍁•🐰MISS•LISA🐰•🍁📩\n➽ 𝑩𝒐𝒕 Đ𝒄 Đ𝒊𝒆̂̀𝒖 𝑯𝒂̀𝒏𝒉 𝑩𝒚 Bao Nguyen\n➽ 𝑳𝒊𝒏𝒌 𝑭𝑩 𝑨𝑫𝑴𝑰𝑵\n📲https://www.facebook.com/profile.php?id=100016943651784\nBot hiện tại có 570 lệnh\n\n✘▬ ▬ ▬ ▬𝑅𝑈𝐿𝐸▬ ▬ ▬ ▬✘\n➢ 𝑲 𝑺𝒑𝒂𝒎 𝑩𝒐𝒕 ,\n➢ 𝑲 𝑳𝒂̆𝒏𝒈 𝑴𝒂̣ 𝑪𝒉𝒖̛̉𝒊 𝑩𝒐𝒕\n➢ 𝑻𝒐̂𝒏 𝑻𝒓𝒐̣𝒏𝒈 𝑨𝑫𝑴𝑰𝑵 𝒗𝒂̀ 𝑩𝒐𝒕\n➢ 𝑴𝒐̂̃𝒊 𝑵𝒉𝒐́𝒎 𝑪𝒉𝒊̉ Đ𝒖̛𝒐̛̣𝒄 1 𝑩𝒐𝒕 , 𝑵𝒆̂́𝒖 𝑷𝒉𝒂́𝒕 𝑯𝒊𝒆̣̂𝒏 𝑩𝒐𝒕 𝑺𝒆̃ 𝑶𝒖𝒕 🚫\n\n✘▬ ▬ 𝐇𝐮̛𝐨̛́𝐧𝐠 𝐃𝐚̂̃𝐧 𝐒𝐃 ▬ ▬✘\n➢ 𝑮𝒐̃ /𝑴𝒆𝒏𝒖 𝑯𝒐𝒂̣̆𝒄 /𝑯𝒆𝒍𝒑 Đ𝒆̂̉ 𝑿𝒆𝒎 𝑳𝒆̣̂𝒏𝒉\n🌺𝑪𝒉𝒖́𝒄 𝑩𝒂̣𝒏 𝑺𝒂̀𝒊 𝑩𝒐𝒕 𝑽𝑽 ❤`, threadID);
			}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);

			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinGif");
			const pathGif = join(path,`hiv2.gif`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "💗𝙃𝙚𝙡𝙡𝙤 𝙘𝙤𝙣 𝙫𝙤̛̣ {name}💗. \n🐳𝘾𝙝𝙖̀𝙤 𝙢𝙪̛̀𝙣𝙜 đ𝙖̃ đ𝙚̂́𝙣 𝙫𝙤̛́𝙞 {threadName}.\n{type} 𝙡𝙖̀ 𝙩𝙝𝙖̀𝙣𝙝 𝙫𝙞𝙚̂𝙣 𝙩𝙝𝙪̛́ {soThanhVien} 𝙘𝙪̉𝙖 𝙣𝙝𝙤́𝙢. 𝙏𝙪̛𝙤̛𝙣𝙜 𝙩𝙖́𝙘 𝙣𝙝𝙞𝙚̂̀𝙪 𝙫𝙖̀𝙤 𝙣𝙝𝙖 𝙠𝙝𝙤̂𝙣𝙜 𝙡𝙖̀ 𝙖̆𝙣 𝙠𝙞𝙘𝙠 đ𝙖̂́𝙮 ♥" : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  'các bạn' : 'bạn')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
        } 