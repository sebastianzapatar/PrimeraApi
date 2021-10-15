
const mongoose = require('mongoose');
const app=require('./app');
const port=2021;
mongoose.connect('mongodb+srv://elcasique:TGXWeVbd1e97mO1q@cluster0.mwffh.mongodb.net/test', 
{useNewUrlParser: true, 
useUnifiedTopology: true}).then(()=>{
    console.log("Conecto");
    app.listen(port,()=>{
        console.log('Servidor corriendo en http://localhost:'+port)
    });
})