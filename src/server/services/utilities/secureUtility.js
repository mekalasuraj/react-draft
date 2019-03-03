let CRYPTO_JS;
let CRYPTO;
let CONFIG;

export default (cryptoJs, config, crypto) => {
    CRYPTO_JS = cryptoJs;
    CRYPTO = crypto;
    CONFIG = config;
    return {
        getHashPassword,
        getSaltValue,
        encrypt,
        decrypt
    };
};

const getHashPassword = (clearTextPassword, saltValue) => CRYPTO_JS.SHA3(clearTextPassword + saltValue, { outputLength: 512 }).toString();

const getSaltValue = () => CRYPTO.randomBytes(128).toString('base64');

const encrypt = plainText => CRYPTO_JS.AES.encrypt(plainText, CONFIG.accountVerificationKey);

const decrypt = encryptedText => {
    const plainTxt = CRYPTO_JS.AES.decrypt(decodeURIComponent(encryptedText), CONFIG.accountVerificationKey).toString(CRYPTO_JS.enc.Utf8);
    return plainTxt;
};
