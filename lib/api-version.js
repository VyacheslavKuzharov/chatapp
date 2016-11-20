function getVersion(req) {
    var ary = req.baseUrl.split('/');
    return ary[ary.length - 1];
}

exports.getVersion = getVersion;