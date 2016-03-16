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
    var student = data.find(s => s.id == id);

    if (student) {
        res.render('detail',{student});
    } else {
        res.notFound();
    }
};