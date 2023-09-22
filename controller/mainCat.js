const MAIN = require('../model/category')
const SUB = require('../model/subcategory')
const TOPIC = require('../model/topic')
const ADMIN = require('../model/admin')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

exports.Addmain = async function(req, res, next) {
  try {
    const data = await MAIN.create(req.body)
    res.status(201).json({
        status: "success",
        message: "data add successful",
        data
      })
  } catch (error) {
    
    res.status(404).json({
        status: "fail",
        message: error.message
    })
  }
}
exports.Allmain = async function(req, res, next) {
    try {
      const data = await MAIN.find()
      res.status(201).json({
          status: "success",
          message: "all data found",
          data
        })
    } catch (error) {
      res.status(404).json({
          status: "fail",
          message: error.message,
      })
    }
  }
exports.updmain = async function(req, res, next) {
    try {
       await MAIN.findByIdAndUpdate(req.query.id, req.body)
      res.status(201).json({
          status: "success",
          message: "data updated",
       
        })
    } catch (error) {
      res.status(404).json({
          status: "fail",
          message: error.message
      })
    }
}
exports.deletemain = async function(req, res, next) {
    try {
     await MAIN.findByIdAndDelete(req.query.id)
      res.status(201).json({
          status: "success",
          message: "data updated",
       
        })
    } catch (error) {
      res.status(404).json({
          status: "fail",
          message: error.message
      })
    }
}




exports.Addsub = async function(req, res, next) {
  try {
    const data = await SUB.create(req.body)
    res.status(201).json({
        status: "success",
        message: "data add successful",
        data
      })
  } catch (error) {
    res.status(404).json({
        status: "fail",
        message: error.message
    })
  }
}
exports.Allsub = async function(req, res, next) {
    try {
      const data = await SUB.find().populate('category')
      res.status(201).json({
          status: "success",
          message: "all data found",
          data
        })
    } catch (error) {
      res.status(404).json({
          status: "fail",
          message: error.message,
      })
    }
  }
exports.updsub = async function(req, res, next) {
    try {
      const data = await SUB.findByIdAndUpdate(req.query)
      res.status(201).json({
          status: "success",
          message: "data updated",
          data
        })
    } catch (error) {
      res.status(404).json({
          status: "fail",
          message: error.message
      })
    }
}
exports.deletesub = async function(req, res, next) {
    try {
      const data = await SUB.findByIdAndDelete(req.query)
      res.status(201).json({
          status: "success",
          message: "data updated",
          data
        })
    } catch (error) {
      res.status(404).json({
          status: "fail",
          message: error.message
      })
    }
}




exports.Addtopic = async function(req, res, next) {
  try {
    const data = await TOPIC.create(req.body)
    res.status(201).json({
        status: "success",
        message: "data add successful",
        data
      })
  } catch (error) {
    res.status(404).json({
        status: "fail",
        message: error.message
    })
  }
}
exports.Alltopic = async function(req, res, next) {
    try {
      const data = await TOPIC.find().populate('category').populate('subCategory')
      res.status(201).json({
          status: "success",
          message: "all data found",
          data
        })
    } catch (error) {
      res.status(404).json({
          status: "fail",
          message: error.message,
      })
    }
  }
exports.updtopic = async function(req, res, next) {
    try {
      const data = await TOPIC.findByIdAndUpdate(req.query)
      res.status(201).json({
          status: "success",
          message: "data updated",
          data
        })
    } catch (error) {
      res.status(404).json({
          status: "fail",
          message: error.message
      })
    }
}
exports.deletetopic = async function(req, res, next) {
    try {
      const data = await TOPIC.findByIdAndDelete(req.query)
      res.status(201).json({
          status: "success",
          message: "data updated",
          data
        })
    } catch (error) {
      res.status(404).json({
          status: "fail",
          message: error.message
      })
    }
}





exports.SECURE = async function(req, res, next){ 
  try {
      console.log(req.headers.token);
    let token = req.headers.token
    if (!token) {
      throw new Error('please atteched token')
    }
    var data = jwt.verify(token, 'Om');
    console.log(data)
    const checkuser = await USER.findById(data.id)
    if (!checkuser) {
      throw new Error('User not found')
    }
    next()
  } catch (error) {
    res.status(404).json({
    status : "FAIL",
    message : error.message
    })
  }
  }
exports.Alldata= async function(req, res, next) 
{
    try { 
      const findData = await ADMIN.find()
      res.status(200).json({
        status : "✅" ,
        message : "All data done",
        data: findData
      })
      
    } catch (error) {
      res.status(404).json({
        status : "FAIL",
        message : error.message
      })
        }
}

exports.Signup= async function(req, res, next) {
  try { 
    req.body.password = await bcrypt.hash(req.body.password,10)
    const data = await ADMIN.create(req.body)
    var token = jwt.sign({ id: data._id },  process.env.tokenkey)
    res.status(200).json({
      status : "✅" ,
      message : "Sign up succsessfully",
      data: data,
      token
    })
    
  } catch (error) {
    res.status(404).json({
      status : "FAIL",
      message : error.message
    })
    
  }
};

exports.Login = async function(req, res, next) {
  try { 

    if (!req.body.email) {
      throw new Error("CHECK email")
    }

    var checkuser = await ADMIN.findOne({email: req.body.email})

    if (!checkuser) {
      throw new Error("CHECK email")
    }

    let checkpass = await bcrypt.compare(req.body.password,checkuser.password)

    if (!checkpass) {
      throw new Error("please check password")
    }
    var token = jwt.sign({ id: checkuser._id }, process.env.tokenkey);
    res.status(200).json({
      status : "✅" ,
      message : "login succsessfully",
      checkuser,
      token
    })
    
  } catch (error) {
    res.status(404).json({
      status : "FAIL",
      message : error.message
    })  
  }
};