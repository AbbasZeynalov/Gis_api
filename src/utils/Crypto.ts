let crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

/*let customerKey =  crypto.createHash("sha256")
    .update("C159753-R258456")
    .digest("hex");*/

const iv = Buffer.alloc(16, 0);


export const cipher = (text:string, secret:string) => {

    const key = crypto.scryptSync(secret, 'salt', 32);

    let cipher = crypto.createCipheriv(algorithm,key, iv);
    let crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');

    return crypted;
};


export const deCipher = (text:string, secret:string) => {

    const key = crypto.scryptSync(secret, 'salt', 32);
    let decipher = crypto.createDecipheriv(algorithm,key, iv);
    let dec = decipher.update(text,'hex','utf8');

    dec += decipher.final('utf8');

    return dec;
};