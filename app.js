/**
 * ���ļ� app.js
 */

var express = require('express');
var http = require('http');
// var https = require('https');
var path = require('path');
var fs = require('fs');
var router = require('./routes/router');    // App ���Զ���·����Ϣ

var app = express();


// ====================  App ����  ====================

app.set('port', process.env.PORT || process.env.APP_PORT || 3000);    // �˿�����
app.set('views', path.join(__dirname, 'views'));    // ������ͼ View ���ڵ�·��
app.set('view engine', 'ejs');    // html ģ������



// ====================  �м������(˳�����Ҫ)  ====================

app.use(express.logger('dev'));    // ������־
// ������־
// var access_log_file = fs.createWriteStream('./log/access_log.log', { flags: 'a', encoding: 'utf8' });    // ������־�ļ�
// app.use(express.logger({stream: access_log_file}));

app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));    // favicon ·��
// app.use(express.bodyParser());    // �������ļ��ϴ�
app.use(express.json());
app.use(express.urlencoded());

app.use(express.cookieParser());
app.use(express.session({secret: "This is a secret"}));
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));    // ��̬ (images + css + js + fonts) ��Դ���ڵ�·�� (�������ö��)

app.use(app.router);

if ('development' == app.get('env')) {    // ���������µĴ�����
  app.use(express.errorHandler());
}


// ====================  �Զ���·����Ϣ  ====================

router.map(app);


// ====================  ���� http ������  ====================

http.createServer(app).listen(app.get('port'), function(){
    console.log('Qingci app server listening on port ' + app.get('port'));
});


// ====================  ���� https ������  ====================
/*
var options = {
  key: fs.readFileSync('./cert/privatekey.pem'),
  cert: fs.readFileSync('./cert/certificate.pem')
};

https.createServer(options, app).listen(app.get('port'), function(){
  console.log('NewTeck server listening on port ' + app.get('port'));
});
*/
