let express = require('express');
let path = require('path');
var iconv = require('iconv-lite');
let bodyParser = require('body-parser');
let multer = require('multer');
var csv = require('node-csv').createParser();
let uploads = multer({dest:'./public/uploads'});
let app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.resolve('public')));
app.post('/form',uploads.single('Filedata'),function(req,res){
    console.log(req.body,req.file);
var filepath = req.file.path;
csv.parseFile(filepath,function(err, data) {
    let jihu = new Buffer(data.join(','),'binary')
    console.log(jihu)
    let jj = iconv.decode(jihu,'gbk');
    console.log(jj)
    if(err){
        console.log(err)
     }else{
        require('fs').unlink(filepath, function(err){
            if(err){ 
                console.log(err)  
             }
        });  
     }
    //删除临时文件
    
    //输出data
    return res.send({ success:true, data:jj});
});
})
app.listen(8000);