const express = require('express');
//const userModel = require('../models/userModel');
//const userModel=require("../models/userModel")
const router = express.Router();
//const userController=require()

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.get('/moveis',function(req,res){
let move=["ra-one","gunda","bagigar"]
     res.send(move)
 })
router.get('/moveis/:index',function(req,res){
    let move=["ra-one","gunda","bagigar"]
   // console.log(req.params)
    let value=req.params.index
    let movieAtIndex=move[value]
    console.log(value)
    if(move.length<value){
        res.send("use a valid index")
    }else{
    res.send(movieAtIndex)
    }
})
router.get('/flim',function(req,res){
   let fli= [ {
        id: 1,
        name: "The Shining"
       }, {
        id: 2,
        name: "Incendies"
       }, {
        id: 3,
        name: "Rang de Basanti"
       }, {
        id: 4,
        name: "Finding Demo"
       }]
       res.send(fli.name)
})

//router.get('/flim/:flimId',function(req,res){
   // let fli= [ {
   //      id: 1,
   //      name: "The Shining"
  //      }, {
  //       id: 2,
  //       name: "Incendies"
  //      }, {
  //       id: 3,
  //       name: "Rang de Basanti"
  //      }, {
  //       id: 4,
//name: "Finding Demo"
  //      }]
  //      let value=req.params.flimId
  //      console.log(value)
//        const flim=fli.filter(x => x.id == value)
//console.log(flim)
       
 //      flim.length == 0 ? res.send("not found") : res.send(flim[0].name)
// })
 
//router.get('/search',function(req,res){
   // let fli= [ {
     //    id: 1,
      //   name: "The Shining"
     //   }, {
     //    id: 2,
     //    name: "Incendies"
     //   }, {
     //    id: 3,
      //   name: "Rang de Basanti"
      //  }, {
      //   id: 4,
      //   name: "Finding Demo"
      //  }]
     //   let value=req.params.x
     //   console.log(value)
     //   const flim=fli.filter(x => x.id == value)
//console.log(flim)
       
 //      flim.length == 0 ? res.send("not found") : res.send(flim)
 //})
 router.get("/misingarr",function(req,res){
     let array=[1,2,3,5,6,7]
     let  count = array[array.length-1];
let missing = [];
for ( let i = 1; i <= count; i++ ) {
	if (array.indexOf(i) == -1) {
		missing.push(i);
	}
}
res.send(missing)
 })

 router.get("/misingarray",function(req,res){
    let arra=[33,35,37,39]
    let diff=arra[0]-0
let miss = [];
for(let i=0;i<arra.length;i++){
    if(arra[i]-i!=diff){
        while(diff<arra[i]-i){
           miss.push(i+diff)
           diff++
        }
    }
}

res.send(miss)
})

router.get("/spacific-movies",function(req,res){
    let movies=[
        {
         "id": 1,
         "name": "The Shining",
         "rating":8,
         "director": "Stanley Kubrik",
         "genre": "horror"
        },
        {
          "id":2,
          "name":"finding nemom",
          "rating":7,
          "director":"andrew stanton",
          "genre":"animation"
        },
        {
            "id":3,
            "name":"batman-The dark knight",
            "rating":9,
            "director":"Christopher Nolan",
            "genre":"action"
          }
        ]
        
        const value=req.query.r
        const value2=req.query.g
        let len=movies.length
        for(let i=0;i<len;i++){
            if(movies[i].rating== value && movies[i].genre===value2){
                res.send(movies[i])
            }
        }
})

router.post("/specific-movies2",function(req,res){
    let movies=[
        {
         "id": 1,
         "name": "The Shining",
         "rating":8,
         "director": "Stanley Kubrik",
         "genre": "horror"
        },
        {
          "id":2,
          "name":"finding nemom",
          "rating":7,
          "director":"andrew stanton",
          "genre":"animation"
        },
        {
            "id":2,
            "name":"batman-The dark knight",
            "rating":9,
            "director":"Christopher Nolan",
            "genre":"action"
          }
        ]
        let input=req.body.entry
        if(input.rating>10){
            res.send(" the maximum value a rating can have is 10")
        }else if(typeof(input["director"])==="undefind"){
            res.send("the director value must be present")
        }else{
          movies.push(input)
          res.send({data:movies})
        }
       
})
router.get("/best-movie",function(req,res){
    let movies=[
        {
         "id": 1,
         "name": "The Shining",
         rating:8,
         "director": "Stanley Kubrik",
         "genre": "horror"
        },
        {
          "id":2,
          "name":"finding nemom",
          rating:7,
          "director":"andrew stanton",
          "genre":"animation"
        },
        {
            "id":3,
            "name":"batman-The dark knight",
            rating:9,
            "director":"Christopher Nolan",
            "genre":"action"
          }
        ]
       let max=movies[0].rating
       for(let i=0;i<movies.length;i++){
           if(movies[i].rating>max)
           max=movies[i]
       }
       res.send(max)
       
})

router.post("/player",function(req,res){
  let pla=[{
    "name": "manish",
    "dob": "1/1/1995",
    "gender": "male",
    "city": "jalandhar",
    "sports": [
    "swimming"
    ],
    "bookings": [
    ]
    },
    {
        "name": "virat",
        "dob": "1/1/1994",
        "gender": "male",
        "city": "dhali",
        "sports": [
        "crikat"
        ],
        "bookings": [
        ]
    },
    {
      "name": "dhoni",
      "dob": "1/1/1985",
      "gender": "male",
      "city": "rachi",
      "sports": [
      "crikat"
      ],
      "bookings": [
      ]
      }]
      let p=req.body
      let len=pla.length
      for(let i=0;i<len;i++){
         if(p.name===pla[i].name){
           res.send("this player allready exist")
         }
      }
      
})
//router.post('/createUser',function(req,res){
 //   var data=req.body
 //   let savedData=await userModel.create(data)
  //  res.send({dbData: savedData})
//});


module.exports = router;