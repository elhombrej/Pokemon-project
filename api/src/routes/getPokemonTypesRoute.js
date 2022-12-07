const { Router } = require('express');
const router = Router();
const {Type} = require ('../db');
const axios = require ('axios');

let reqInstance = axios.create({
    headers: {
        "Accept-Encoding": "null"
      }
    }
);

router.get('/',async (req,res)=>{
    let apiTypeUrl = await reqInstance.get('https://pokeapi.co/api/v2/type');
    let apiTypeInfo = apiTypeUrl.data;
    let types = apiTypeInfo.results.map(element => element);

    types.forEach(element =>{
        Type.findOrCreate({
            where: {
                name: element.name,
            }
        });
    });
    const allTypes = await Type.findAll();
    return res.status(200).send(allTypes)
});

module.exports=router;