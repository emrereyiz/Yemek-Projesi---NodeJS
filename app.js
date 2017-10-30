var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/yemekler", function(req, res){
    var yemekler = [
        {adi: 'hamburger', resim: "https://www.burgerking.com.tr/cmsfiles/products/chili-cheese-whopper-menu.png?v=115"},
        {adi: 'hamburger 2', resim: "https://themenustar.com/upload/2016-08-18/557b693fd327b4.jpg"},
        {adi: 'hamburger 3', resim: "https://www.burgerking.com.tr/cmsfiles/products/tavuklu-barbeku-brioche-menu-1.png?v=115"},
    ];
    res.render("yemekler", {yemekler: yemekler})
});

var server = app.listen(3000, function(){
    console.log("Sunucu portu:"+server.address().port)
});