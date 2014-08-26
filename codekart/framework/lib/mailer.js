
//加载nodemailer Module

var nodemailer = require("nodemailer");
var website = load.config('website');
var email = load.config('email');


var smtpTransport = nodemailer.createTransport("SMTP",email.SMTP);

//发送邮件接口
exports.send = function(opt,callback){

    var name = website.name
        , mailOptions = {
        from: name+" ✔ <"+website.domain+">", // sender address
        to: "", // list of receivers
        subject: name, // Subject line
        //text: "君鉴邀请码 ✔", // plaintext body
        html: "<br /><br /><p>© <b>"+name+"</b> - <a href='"+website.url+"'>"+website.domain+"</a></p>" // html body
    };

    if(opt.title) mailOptions.subject = opt.title+' - '+mailOptions.subject;
    if(opt.html) mailOptions.html = opt.html+mailOptions.html;
    if(opt.to) mailOptions.to = opt.to;

    // send mail with defined transport object

    smtpTransport.sendMail(mailOptions,callback);


};











/*


sendmail = requireLib('sendmail')();

sendmail({
    from: 'talk@jojoin.com',
    to: 'myworld4059@gmail.com',
    subject: 'test sendmail',
    content: 'Mail of test sendmail '
}, function(err, reply) {
    console.log(err && err.stack);
    console.log(reply);
});




*/



/*

var mail = sendmail.Mail({
    host: 'smtp.ym.163.com',
    username: 'talk@jojoin.com',
    password: 'yangjie4059shi03'
});


    mail.message({
        from: 'talk@jojoin.com',
        to: ['446342398@qq.com'],
        subject: 'Hello from Node.JS'
    })
        .body('Node speaks SMTP!')
        .send(function(err) {
            if (err) throw err;
            console.log('Sent!');
        });


    */