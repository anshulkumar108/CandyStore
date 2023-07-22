const controllerRoutes=require('../controller/controller')
const express=require('express')
const router=express.Router()

router.get('/Candydetails',controllerRoutes.getCandyDetails)
router.post('/form',controllerRoutes.addCandy)
router.delete('/:id',controllerRoutes.deleteCandy)
router.patch('/:id',controllerRoutes.upadatedQuantity)
router.put('/Candydetails/:id',controllerRoutes.updateCandyDetails)
module.exports=router