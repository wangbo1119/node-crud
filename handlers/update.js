/**
 * Created by wangbo on 2016/3/15.
 */
var data = require('../data.json');
module.exports = (req,res,next)=>{
      // 当前到底是POST还是GET
  var id = req.urlObj.query.id;
  if (typeof id === 'undefined') {
    // 没有传递参数
    res.notFound();
    return false;
  }
  var student = data.find(s => s.id == id);

  if (req.method.toLowerCase() === 'get') {
    // get请求
    if (student) {
      res.render('update', { student });
    } else {
      res.notFound();
    }
    return false;
  }
    // post
    var postUser = req.body;
    student.name = postUser.name;
    student.age = postUser.age;
    student.gender = postUser.gender === 'true';
    student.description = postUser.description;
    res.redirect('/list');
}
/*function get(req,res){
    // µ±Ç°µ½µ×ÊÇPOST»¹ÊÇGET
    var id = req.urlObj.query.id;
    if (typeof id === 'undefined') {
        // Ã»ÓÐ´«µÝ²ÎÊý
        res.notFound();
        return false;
    }
    var student = data.find(s => s.id == id);
    // getÇëÇó
    if (student) {
        res.render('update', { student });
    } else {
        res.notFound();
        return false;
    }
}
function post(req,res){
        var id = req.urlObj.query.id;
        if (typeof id === 'undefined') {
            res.notFound();
            return false;
        }
        var student = data.find(s => s.id == id);


}
*/