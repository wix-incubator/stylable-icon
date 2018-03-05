const defHelpers = require('../src/definition-helpers');
const {svgIcon, emoji} = defHelpers;

module.exports.lightningIcon = svgIcon("<path d='M12 0l-12 16h12l-8 16 28-20h-16l12-12z'></path>");

module.exports.squareIcon = svgIcon("<rect x='6' y='6' width='20' height='20' />");

module.exports.dotIcon = svgIcon("<circle cx='16' cy='16' r='5' />");

module.exports.garbageBinIcon = svgIcon("<path d='M25 4h-18c-1.657 0-3 1.343-3 3v1h24v-1c0-1.657-1.343-3-3-3zM19.76 2l0.441 3.156h-8.402l0.441-3.156h7.52zM20 0h-8c-0.825 0-1.593 0.668-1.708 1.486l-0.585 4.185c-0.114 0.817 0.467 1.486 1.292 1.486h10c0.825 0 1.407-0.668 1.292-1.486l-0.585-4.185c-0.114-0.817-0.883-1.486-1.708-1.486v0zM25.5 10h-19c-1.1 0-1.918 0.896-1.819 1.992l1.638 18.016c0.1 1.095 1.081 1.992 2.181 1.992h15c1.1 0 2.081-0.896 2.181-1.992l1.638-18.016c0.1-1.095-0.719-1.992-1.819-1.992zM12 28h-3l-1-14h4v14zM18 28h-4v-14h4v14zM23 28h-3v-14h4l-1 14z'></path>");

module.exports.wearyCatFaceEmoji = emoji(`🙀`);

module.exports.pileOfPooEmoji = emoji(`💩`);

module.exports.xChar = emoji(`X`);

