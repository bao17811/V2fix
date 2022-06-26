module.exports.config = {
    name: "mophat",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "Phan Duy",
    description: "",
    commandCategory: "general",
    usages: "[tag]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
    }
};

module.exports.onLoad = async() => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/canvas/`;
    const path = resolve(__dirname, 'cache/canvas', 'mophat.jpg');
    if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://scontent.xx.fbcdn.net/v/t1.15752-9/249859440_406559957774251_3786798265493503579_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=ae9488&_nc_ohc=BQAlqMrxn6QAX9uUHPP&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=2261b48e155e49f6fc2a46c5d8cb02ba&oe=61A0D374", path);
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"]; 
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let tromcho_img = await jimp.read(__root + "/mophat.jpg");
    let pathImg = __root + `/tromcho_${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;
    
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));
    
    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));
    
    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    tromcho_img.composite(circleOne.resize(120, 120), 231, 63).composite(circleTwo.resize(120, 120), 435, 282);
    
    let raw = await tromcho_img.getBufferAsync("image/png");
    
    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);
    
    return pathImg;
}
async function circle(image) {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api, args }) {
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID } = event;
    var mention = Object.keys(event.mentions)[0]
    let tag = event.mentions[mention].replace("@", "");
    if (!mention) return api.sendMessage("Vui lòng tag 1 người để đôk", threadID, messageID);
    else {
        var one = senderID, two = mention;
        return makeImage({ one, two }).then(path => api.sendMessage({ body: "Để ta độ con" + tag + ' Nam Mô A Di Đà Phật',
            mentions: [{
          tag: tag,
          id: mention
        }],
     attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
    }
}