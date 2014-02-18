/**
*    Post interface
*/
// var util = require('util');
var db = require('./mongodb').db;

function Post(){    // ID �� ���� �� ���ݡ� �û�ID �� ʱ�� �� ��ǩ
    // _id : ID
    // title : ����
    // content : ����
    // user_id : �û� ID 
    // user_name : �û���
    // time : ����ʱ��
    // tags : ��ǩ (����)
}

exports.Post = Post;

// Post.save �� ����һ�� doc �� ������ insert ���� update 
Post.prototype.save = function(post, callback){
    var msg = {};
    db.collection('posts').save(post, function(error, result){  // insert return object, update return number !
        if(error){
            console.log('error: ' + error);
        }
        msg.error = error;
        if(typeof result == 'number'){  // return previous object
            msg.object = post;
        }else{  // return inserted object
            msg.object = result;
        }
        callback(msg);
    });
};

// Post.count �� ���� post ������Ŀ
Post.prototype.count = function(callback){
    var msg = {};
    db.collection('posts').count(function(error, count){
        if(error){
            console.log('error : ' + error);
        }
        msg.error = error;
        msg.number = count;
        callback(msg);
    });
};

// Post.find
Post.prototype.find = function(condition, callback){
    var msg = {};
    db.collection('posts').find(condition).toArray(function(error, objects){    // find ���
        if(error){
            console.log('error : ' + error);
        }
        msg.error = error
        msg.objects = objects;
        callback(msg);
    });
};
// Post.findOne
Post.prototype.findOne = function(condition, callback){
    var msg = {};
    db.collection('posts').findOne(condition, {comments: {$slice: -5}}, function(error, object){    // find ���
        if(error){
            console.log('error : ' + error);
        }
        msg.error = error
        msg.object = object;
        callback(msg);
    });
};
// Post.findOnePage �� ͨ�������� post
Post.prototype.findOnePage = function(condition, callback){
    var msg = {};
    var nskip = +condition.nskip || 0, n = +condition.n || 15;
    
    if(typeof condition.nskip != 'undefined') delete condition.nskip;
    if(typeof condition.n != 'undefined') delete condition.n;
    
    db.collection('posts').find(condition, {content: 0, comments: 0}).sort({time: -1}).skip(nskip).limit(n).toArray(function(error, objects){    // 
        if(error){
            console.log('error : ' + error);
        }
        msg.error = error;
        msg.objects = objects;
        console.log(JSON.stringify(objects));
        callback(msg);
    });
};

// Post.update �� ���� post
Post.prototype.update = function(condition, set, callback){
    var msg = {};
    var multi = condition.multi || false;
    if(condition.multi) delete condition.multi;
    
    db.collection('posts').update(condition, set, {'multi': multi}, function(error, count){
        if(error){
            console.log('error : ' + error);
        }
        msg.error = error;
        msg.number = count;
        callback(msg);
    });
};

// Post.remove �� ��������ɾ post
Post.prototype.remove = function(condition, callback){
    var msg = {};
    db.collection('posts').remove(condition, function(error, collection){
        if(error){
            console.log('error : ' + error);
        }
        msg.error = error;
        callback(msg);
    });
};