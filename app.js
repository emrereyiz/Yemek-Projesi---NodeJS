var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var yemekler = [
    {adi: 'hamburger', resim: "https://www.burgerking.com.tr/cmsfiles/products/chili-cheese-whopper-menu.png?v=115"},
    {adi: 'hamburger 2', resim: "https://themenustar.com/upload/2016-08-18/557b693fd327b4.jpg"},
    {adi: 'hamburger 3', resim: "https://www.burgerking.com.tr/cmsfiles/products/tavuklu-barbeku-brioche-menu-1.png?v=115"},
];

app.get("/", function(req, res){
    res.render("home");
});

app.get("/yemekler", function(req, res){
    res.render("yemekler", {yemekler: yemekler})
});

app.post("/yemekler", function(req, res){
    // res.send("test");
    var adi = req.body.adi;
    var resim = req.body.resim;
    var yeniYemek = {adi:adi, resim:resim};
    yemekler.push(yeniYemek);
    res.redirect("/yemekler");
});

app.get("/yemekler/yeni", function(req, res){
    res.render("yeni");
});

var server = app.listen(3000, function(){
    console.log("Sunucu portu:"+server.address().port)
});