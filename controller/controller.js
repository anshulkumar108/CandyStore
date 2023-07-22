const {Candy}=require('../model/candystore')

const getCandyDetails=async(req,res,next)=>{
    try{
        const candies=await Candy.findAll()
        //console.log(candies)
        res.json(candies)
    }catch(error){
console.log(error)
    }
  
}

const addCandy=async(req,res,next)=>{
    try{
        const {name,description,price,quantity}=await req.body;
        const Candies=await Candy.create({ name,description,price,quantity})
        // console.log(Candies)
        res.send("product posted");

    }catch(error){

    }
   
}

const deleteCandy=async(req,res,next)=>{
    try{
        const candyId=req.params.id
await Candy.destroy({where:{id:candyId}})
    }catch(error){
console.log(error)
    }
    
}

const updateCandyDetails=async(req,res,next)=>{
    try{
const candyId=req.params.id
const {name,description,price,quantity}=await req.body;
await Candy.update({name,description,price,quantity},{where:{id:candyId}})
return res.sendStatus(200);
    }catch(error){
console.log(error)
    }
}

const upadatedQuantity=async(req,res,next)=>{
    try {
        const candyId=req.params.id
        const {quantity}=await req.body;
        await Candy.update({quantity},{where:{id:candyId}})
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getCandyDetails,
    addCandy,
    deleteCandy,
    updateCandyDetails,
    upadatedQuantity
}