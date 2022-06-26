/**
* @author ProCoderMew
* @warn Do not edit code or edit credits
*/

module.exports.config = {
    name: "daymuadi",
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
    const path = resolve(__dirname, 'cache/canvas', 'daymuadi.jpg');
    if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://scontent.xx.fbcdn.net/v/t1.15752-9/p480x480/249407768_1029736257846095_7795371016111575148_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=ae9488&_nc_ohc=1AovfzcyVu0AX_2cBGv&_nc_oc=AQk4rmG6W4t0qIfJ1ZXszRKQZ70zqnmtcdfEzf6JUcIBYNfVFi_8EMyhG4OHp2I8OZ0&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=1e0d16d247dd46d33e959781c105bff6&oe=619E2FDB", path);
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"]; 
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let tromcho_img = await jimp.read(__root + "/daymuadi.jpg");
    let pathImg = __root + `/tromcho_${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;
    
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));
    
    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));
    
    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    tromcho_img.composite(circleOne.resize(120, 120), 250, 50).composite(circleTwo.resize(130, 130), 480, 11);
    
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
    if (!mention) return api.sendMessage("Vui lòng tag 1 người", threadID, messageID);
    else {
        var one = senderID, two = mention;
        return makeImage({ one, two }).then(path => api.sendMessage({ body: "Dạy múa đi" + tag + 'múa đi chứ sao lại ko múa😏😏',
            mentions: [{
          tag: tag,
          id: mention
        }],
     attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
    }
}