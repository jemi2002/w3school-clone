var express = require('express');
var router = express.Router();
const catcontroller = require('../controller/mainCat')
/* GET home page. */
router.post('/addmain', catcontroller.Addmain );

router.get('/findmain', catcontroller.Allmain )

router.patch('/updmain', catcontroller.updmain )

router.delete('/deletemain', catcontroller.deletemain )



router.post('/addsub', catcontroller.Addsub );

router.get('/findsub', catcontroller.Allsub )

router.patch('/updsub', catcontroller.updsub )

router.delete('/deletesub', catcontroller.deletesub )



router.post('/addtopic', catcontroller.Addtopic );

router.get('/findtopic', catcontroller.Alltopic )

router.patch('/updtopic', catcontroller.updtopic )

router.delete('/deletetopic', catcontroller.deletetopic )



router.get('/alldata',catcontroller.SECURE, catcontroller.Alldata);

router.post('/signup', catcontroller.Signup)

router.post('/login', catcontroller.Login)

module.exports = router;
