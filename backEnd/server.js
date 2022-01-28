const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cep = require('./routes/cep');


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/cep',cep);



app.use((req,res,next)=>{
    res.send({
        error:"rota não encontrada"
    });
});



app.listen(3333,()=>{console.log('rodando na porta:3333')})