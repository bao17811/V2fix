module.exports.config = {
	name: " ",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "DũngUwU",
	description: "nothing",
	commandCategory: "General",
	usages: "",
	cooldowns: 5
};

module.exports.run = async function({ api, event }) {
       let dny = ["Đùi là chân lý.","Gái gú chỉ là phù du, loli mới là bất diệt.","Bạn đang thở.","Admin bot rất đẹp trai.","Kẹo sữa Milkita được làm từ sữa.","Chim cánh cụt có thể bay.","admin rất đẹp trai.","bạn đang đọc điều này."];
       api.sendMessage('[Bạn có biết?]:' + dny[Math.floor(Math.random()*dny.length)],event.threadID,event.messageID);
}