/**
 * Created by wangbo on 2016/3/15.
 */
var data = require('../data.json');
module.exports = (req, res, next) => {
    var id = req.urlObj.query.id;
    if (typeof id === 'undefined') {
        res.notFound();
        return false;
    }
    var studentIndex = data.findIndex(s => s.id == id);

    if (studentIndex != -1) {
        // 找到这个学生对象
        data.splice(studentIndex, 1);
        res.redirect('/list');
    } else {
        res.notFound();
    }
};