/*
To Do:
Success message
*/
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')


const app = express()
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

const mapContent = new Map();

app.get('/',function(req,res){
    
    res.render('clipboard',{
        key:Math.floor(Math.random()*1000),
        placeholder:"Type here...",
        content:""
    });
});

app.get('/:keyId',function(req,res){

    const Key=req.params.keyId;
    const Content=mapContent[Key];
    
    res.render('clipboard',{
        key: Key,
        content: Content,
        placeholder:""
    })
});

app.post('/',function(req,res){
    
    const mKey = req.body.key;
    const mContent = req.body.content;

    mapContent[mKey] = mContent;

    res.redirect('/'.concat(mKey));


});

app.listen(3000,function(){
    console.log("server started at 3000")
})