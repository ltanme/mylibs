

var fs = require('fs');
var less  = load.lib('!less');
var file = load.tool('!file');
var array = load.tool('!array');
var config =  load.config();
var cpath =  load.config('!path');

var imgPath = '/img/'; //图片文件路径
var cssImgPath = '/cssimg/'; //css图片文件路径
var webFontPath = '/webfont/'; //自定义字体文件路径

/*css缓存文件是否存在的缓存*/
var cssFileNameCache = {};


/**
 * 合并css模块，生成css缓存文件
 * @param stuff
 * @param callback
 */
exports.ready = function(stuff,callback){
    var cssFileName = cpath.static+stuff.client_name_css;
    if(cssFileNameCache[cssFileName] && !config.compiled){
        //console.log('css文件缓存');
        return callback(null,true); /*检查读取缓存*/
    }
    fs.exists(cssFileName,function(have){
        if(config.compiled || have==false){ //编译文件
            merger(stuff,function(err,css){
                if(err){  //文件写入错误
                    if(config.debug) console.log(err);
                    return callback(err);
                }
                fs.writeFile(cssFileName,css, function (err) { //创建缓存文件
                    if(err){  //文件写入错误
                        return callback(err);
                    }
                    cssFileNameCache[cssFileName] = true; //缓存
                    callback(null,css);//处理完毕
                });
            });
        }else{
            cssFileNameCache[cssFileName] = true; //缓存
            callback(null,true);//处理完毕
        }
    });
};


/**
 * 生成css文件内容
 */
function merger(stuff,callback){
    var leg = stuff.less.length
        , filecontent = '';
    for(var i=0;i<leg;i++){ //文件名数组
        filecontent += read.resource('less/'+stuff.less[i]+'.less');
    }

    less.render(filecontent, function (err, css) {//生成css
        if(err){ //编译css错误
            if(config.debug) console.log(err);
            return callback(err);
        }
        if(config.compress){ //压缩css
            css = compress(css);
        }
        callback(null,pretreatment(css)); //预编译
    });
}

//预编译css
function pretreatment(css){
    return css.replace(/<%img%>/g, imgPath) //替换图片文件路径
        .replace(/<%cssimg%>/g, cssImgPath) //替换css图片文件路径
        .replace(/<%webfont%>/g, webFontPath); //自定义字体
}

//压缩css
 function compress(css){
    return css.replace(/\s+|\n/g, " ") //压缩空格和换行
                   .replace(/\/\*(\n|.)*?\*\//g, "") //去掉/**/注释
                   .replace(/\s*{\s*/g, "{") //去掉{ }括号两旁的空格
                   .replace(/\s*}\s*/g, "}")
                   .replace(/\s*:\s*/g, ":") //去掉 : 冒号两旁的空格
                   .replace(/\s*;\s*/g, ";") //去掉 ; 分号两旁的空格
                   .replace(/\s*,\s*/g, ","); //去掉 , 逗号两旁的空格
}


