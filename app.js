var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yemekSitesi");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var yemekSchema = new mongoose.Schema({
    adi     : String,
    resim   : String,
    aciklama: String
});

var Yemek = mongoose.model("Yemek", yemekSchema);

app.get("/", function(req, res){
    res.render("home");
});

app.get("/yemekler", function(req, res){
    // yemekleri db'den alalim
    Yemek.find({}, function(error, yemeklerDB){
        if(error){
            console.log(error)
        }else{
            console.log("*********YEMEKLER*********");
            console.log(yemeklerDB);
            res.render("yemekler", {yemekler: yemeklerDB});
        };
    });
});

app.post("/yemekler", function(req, res){
    var adi = req.body.adi;
    var resim = req.body.resim;
    var aciklama = req.body.aciklama;
    var yeniYemek = {adi:adi, resim:resim, aciklama: aciklama};
    
    Yemek.create(yeniYemek, function(error, olusturulmusYemek){
        if(error){
            console.log(error)
        }else{
            //res.redirect("/yemekler")
        };
    });

    res.redirect("/yemekler");
});

app.get("/yemekler/yeni", function(req, res){
    res.render("yeni");
});

app.get("/yemekler/:id", function(req, res){
    Yemek.findById(req.params.id, function(error, bulunanYemek){
        if(error){
            console.log(error);
        }else{
            res.render("goster", {yemek: bulunanYemek});
        }
    });
});

var server = app.listen(3000, function(){
    console.log("Sunucu portu:"+server.address().port)
});