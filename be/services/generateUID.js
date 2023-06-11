const { uid } = require('uid');

module.exports.generateUID = (length) => {
    return uid(length);
};
