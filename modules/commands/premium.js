module.exports.config = {
	name: "premium",
	version: "1.0.2",
	hasPermssion: 1,
	credits: "Mirai Team",
	description: "Nhận 200 coins mỗi ngày!",
	commandCategory: "premium",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 99999999999999990,
        rewardCoin: 200000000
    }
};

module.exports.languages = {
    "vi": {
        "cooldown": "Bạn đã nhận premium rồi nha Mỗi người chỉ đc 1 lần",
        "rewarded": "Bạn đã nhận premium với số tiền %1$"
    },
    "en": {
        "cooldown": "You received today's rewards, please come back after: %1 hours %2 minutes %3 seconds.",
        "rewarded": "You received %1$, to continue to receive, please try again after 12 hours"
    }
}

module.exports.run = async ({ event, api, Currencies, getText }) => {
    const { premium } = global.configModule,
        cooldownTime = premium.cooldownTime,
        rewardCoin = premium.rewardCoin;

    var { senderID, threadID } = event;

    let data = (await Currencies.getData(senderID)).data || {};
    if (typeof data !== "undefined" && cooldownTime - (Date.now() - (data.premiumCoolDown || 0)) > 0) {
        var time = cooldownTime - (Date.now() - data.premiumCoolDown),
            seconds = Math.floor( (time/1000) % 60 ),
            minutes = Math.floor( (time/1000/60) % 60 ),
            hours = Math.floor( (time/(1000*60*60)) % 24 );

		return api.sendMessage(getText("cooldown", hours, minutes, (seconds < 10 ? "0" : "") + seconds), threadID);
    }

    else return api.sendMessage(getText("rewarded", rewardCoin), threadID, async () => {
        await Currencies.increaseMoney(senderID, rewardCoin);
        data.premiumCoolDown = Date.now();
        await Currencies.setData(senderID, { data });
        return;
    });
}