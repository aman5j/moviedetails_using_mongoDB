var express = require('express');
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const Admin = require('./model/adminmodel'); // import admin model

router.get("/adminlogin", function(req, res) {
    res.render("loginpage", { message: '' });
});

router.post("/check_admin_login", async function(req, res) {
    try {
        console.log("REQ Body:", req.body);

        const admin = await Admin.findOne({
            $or: [
                { emailid: req.body.emailid },
                { mobileno: req.body.emailid }
            ],
            password: req.body.password
        });

        if (admin) {
            console.log(admin.picture)
            // store admin data in localStorage
            localStorage.setItem('ADMIN', JSON.stringify(admin));

            res.render("dashboard", { data: admin });
        }
        else {
            console.log("Invalid Login");

            res.render("loginpage", {
                message: 'Invalid UserId/Password'
            });
        }

    }
    catch (e) {
        console.log("Server Error:", e);

        res.render("loginpage", {
            message: 'Server Error'
        });
    }
});

router.get("/logout", function(req, res) {

    localStorage.clear();

    res.render("loginpage", { message: '' });
});

module.exports = router;

// var express = require('express');
// var router = express.Router();
// var pool = require('./pool');
// var LocalStorage = require('node-localstorage').LocalStorage;
// localStorage = new LocalStorage('./scratch');

// router.get("/adminlogin", function(req,res){
//     res.render("loginpage", {message : ''})
// })

// router.post("/check_admin_login", function(req,res){
//     try{
//         console.log("REQ Body:",req.body)
//         pool.query("select * from admins where (emailid=? or mobileno=?) and password=? ", [req.body.emailid, req.body.emailid, req.body.password], function(error,result){
//             if(error)
//             {
//                 console.log("Database Error", error)
//                 res.render("loginpage",{message:'Database Error'})
//             }
//             else
//             {
//                 if(result.length==1)
//                 {   localStorage.setItem('ADMIN',JSON.stringify(result[0]))
//                     res.render("dashboard", {data:result[0]})
//                 }
//                 else{
//                     console.log("Data:",result)
//                     res.render("loginpage",{message:'Invalid UserId/Password'})
//                 }
//             }
//         })
//     }
//     catch(e)
//     {
//         console.log("Server Error:",e)
//         res.render("loginpage",{message:'Server Error'})
//     }
// })

// router.get("/logout", function(req,res){
//     localStorage.clear();
//     res.render("loginpage",{message:''})
// })

// module.exports=router;