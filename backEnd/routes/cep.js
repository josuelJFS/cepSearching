const express = require("express");
const router = express.Router();
const { querySync } = require("../mysql");
const axios = require("axios");

router.get("/seach", async (req, res) => {
    let { cepNumber } = req.query;
    cepNumber = cepNumber.replace(',','')

    try {
        const cepExist = await querySync(`select * from cepInfos where cep = ?`,[cepNumber])

        if(cepExist.length > 0) return  res.json({ mensage: "encontrado no db", status: true, data: cepExist[0] });

        const resultCep = await axios.get(`https://viacep.com.br/ws/${cepNumber}/json/`);
        if (!resultCep?.data?.cep) return res.json({ mensage: "cep não encontrado", status: false });
        const { cep,logradouro, bairro, uf, ibge, gia, ddd, siafi,localidade } = resultCep?.data;
        await querySync(
            `insert into cepInfos (cep ,
            logradouro ,
            bairro ,
            uf ,
            ibge ,
            gia ,
            ddd ,
            siafi,
            localidade ) values (?,?,?,?,?,?,?,?,?)`,
            [parseInt(cep.replace('-','')),logradouro,bairro,uf,ibge,gia,ddd,siafi,localidade]
        );

        res.json({ mensage: "encontrado api web", status: true, data: resultCep.data });
    } catch (error) {
        res.json({ mensage: "", status: false });
        console.log(error);
    }
});
router.get("/createTable", async (req, res) => {
    await querySync(
        `create table IF NOT EXISTS cepInfos (
            id int primary key auto_increment,
            cep int,
            logradouro varchar(250),
            bairro varchar(250),
            uf varchar(250),
            ibge int,
            gia varchar(250),
            ddd int,
            siafi int,
            localidade varchar(250)
            )`)
    
});

module.exports = router;
