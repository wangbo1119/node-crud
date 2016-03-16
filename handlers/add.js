/**
 * Created by wangbo on 2016/3/14.
 */
var data = require('../data.json');
module.exports = (req,res,next)=>{
    if(req.method.toLowerCase() === 'post'){
        post(req,res);
    }else{
        get(req,res);
    }
}
function post(req,res){
    var postUser = req.body;
    maxid = 0;
    data.forEach(student => {
        if(student.id > maxid){
            maxid = student.id;
        }
    });
    postUser.id = maxid + 1;
    postUser.gender = postUser.gender === 'true';
    data.push(postUser);
    res.redirect('/list');

}
function get(req,res){
    res.render('add');
}