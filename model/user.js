/**
*    User interface
*/
// var util = require('util');
var db = require('./mongodb').db;    // ���ݿ���� db
var cry = require('./cryption');    // �����㷨

function User(){
    // mail : ����
    // password : ����(����)
    // name : �ǳ�
    // reg_time : ע��ʱ��
    // education ['above_master', 'university', 'high_school', 'middle_school', 'primary_school'] : ������Ϣ [��������, ��ѧ, ����, ����, Сѧ]
    // story ['self_intro', 'tag', 'motto'] : ���˽�����Ϣ [���ҽ���, ��ǩ, ������]
    // contact ['homepage', 'weibo', 'other'] : ��ϵ��Ϣ [��ҳ, ΢��, ����]
}

exports.User = User;

// User.insert
User.prototype.insert = function(users, callback){
    var msg = {};
    db.collection('users').insert(users, function(error, objects){
        if(error){
            console.log('error : ' + error);
        }
        msg.error = error;
        msg.objects = objects;
        callback(msg);
    });
};

// User.find
User.prototype.find = function(condition, callback){
    var msg = {};
    db.collection('users').find(condition).toArray(function(error, objects){    // find ���
        if(error){
            console.log('error : ' + error);
        }
        msg.error = error
        msg.objects = objects;
        callback(msg);
    });
};

// User.findOne
User.prototype.findOne = function(condition, callback){
    var msg = {};
    db.collection('users').findOne(condition, function(error, object){    // ֻ find һ��
        if(error){
            console.log('error : ' + error);
        }
        msg.error = error
        msg.object = object;
        callback(msg);
    });
};

// User.findOnePage
User.prototype.findOnePage = function(condition, callback){
    var msg = {};
    var nskip = +condition.nskip || 0, n = +condition.n || 15;
    
    if(typeof condition.nskip != 'undefined') delete condition.nskip;
    if(typeof condition.n != 'undefined') delete condition.n;
    
    db.collection('users').find(condition).skip(nskip).limit(n).toArray(function(error, objects){
        if(error){
            console.log('error : ' + error);
        }
        msg.error = error;
        msg.objects = objects;
        callback(msg);
    });
};

// User.update
User.prototype.update = function(condition, setter, callback){
    var msg = {};
    var multi = condition.multi || false;
    if(condition.multi) delete condition.multi;
    
    db.collection('users').update(condition, setter, {'multi': multi}, function(error, count){    // Ĭ��ֻ����һ������
        if(error){
            console.log('error : ' + error);
        }
        msg.error = error;
        msg.number = count;
        callback(msg);
    });
};

// User.remove �� ��������ɾ post
User.prototype.remove = function(condition, callback){
    var msg = {};
    db.collection('users').remove(condition, function(error, collection){
        if(error){
            console.log('error : ' + error);
        }
        msg.error = error;
        callback(msg);
    });
};