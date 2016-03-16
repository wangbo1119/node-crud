/**
 * Created by wangbo on 2016/3/14.
 */
var data = require('../data.json');
module.exports = (req,res,next)=>{
    res.render('list',{students:data});
}