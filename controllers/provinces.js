const {Province} = require("../models");
const catchAsync = require("../middlewares/async");


exports.getProvincesList = catchAsync(async (req,res)=> {
    const list  = await Province.findAll();
    res.status(200).send(list);
})
exports.getDetailProvince = catchAsync(async (req,res)=> {
    const { Id } = req.params;
    const province = await Province.findOne({
        where:{
            Id,
        }
    })
    if(province){
        res.status(200).send(province)
       
    } else {
        res.status(404).send("not found");
       
    }
})
exports.addProvince = catchAsync(async (req,res)=> {
    const province = req.body
    const newProvince = await Province.create(province)
    res.status(200).send(newProvince)
}) 
exports.deleteProvince = catchAsync(async (req,res)=> {
    const {Id} = req.params
    const provinceDelete = await Province.findOne({
        where:{
            Id,
        }
    })
    if(provinceDelete){
        Province.destroy({
            where:{
                Id,
            }
        })
        res.status(200).send(provinceDelete)
    } else {
        res.status(404).send("not found")
    }
})
exports.updateProvince= catchAsync(async (req,res)=> {
    const {Id} = req.params
    const provinceUpdate = req.body
    const province = await Province.findOne({
        where:{
            Id,
        }
    })
    if(province){
        province.Name = provinceUpdate.Name
        province.Code = provinceUpdate.Code
        province.TenantId = provinceUpdate.TenantId
        const provinceUpdated = await province.save()
        res.status(200).send(provinceUpdated) 
    }else{
        res.status(200).send("not found")
    }
})