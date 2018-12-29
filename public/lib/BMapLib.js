//解决BMapLib冲突问题
const BMapLib = window.BMapLib = BMapLib || {};
const baidu = baidu || {
    guid: "$BAIDU$"
};

export {
    BMapLib,
    baidu
};