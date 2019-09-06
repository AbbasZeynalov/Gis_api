var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

/*let customerKey =  crypto.createHash("sha256")
    .update("C159753-R258456")
    .digest("hex");*/

const iv = Buffer.alloc(16, 0);


export const cipher = (text:string, secret:string) => {

    const key = crypto.scryptSync(secret, 'salt', 32);

    var cipher = crypto.createCipheriv(algorithm,key, iv)
    var crypted = cipher.update(text,'utf8','hex')
    console.log('c: ', crypted);
    crypted += cipher.final('hex');
    console.log('crypted: ',crypted);
    return crypted;
}


export const deCipher = (text:string, secret:string) => {

    const key = crypto.scryptSync(secret, 'salt', 32);
    var decipher = crypto.createDecipheriv(algorithm,key, iv)
    var dec = decipher.update(text,'hex','utf8')

    console.log('dec: ', dec);

    dec += decipher.final('utf8');
    console.log(dec);
    return dec;
}