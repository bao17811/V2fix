module.exports.config = {
	name: "happyadmin",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "Đếm ngày sinh nhật admin",
	commandCategory: "MODULE (LỆNH)",
	cooldowns: 5
}

module.exports.run = function ({ event, api }) {
    const t = Date.parse("June 26, 2022 00:00:00") - Date.parse(new Date());
    const seconds = Math.floor( (t/1000) % 60 );
    const minutes = Math.floor( (t/1000/60) % 60 );
    const hours = Math.floor( (t/(1000*60*60)) % 24 );
    const days = Math.floor( t/(1000*60*60*24) );

    return api.sendMessage(`🥳Thời gian còn lại đến sinh nhật của admin 𝐏𝐇𝐀𝐍 𝐃𝐔𝐘❤️\n➢ ${days}\n➢ ngày ${hours}\n➢ tiếng ${minutes}\n➢phút ${seconds} giây⋘\n=>🥳 01|05|2005🎂🍰🍔🍡🧁`, event.threadID, event.messageID);
}