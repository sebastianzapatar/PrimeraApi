
const mongoose = require('mongoose');
const app=require('./app')
const port=8080;
mongoose.connect('mongodb+srv://elcasique:TGXWeVbd1e97mO1q@cluster0.mwffh.mongodb.net/test', 
{useNewUrlParser: true, 
useUnifiedTopology: true}).then(()=>{
    console.log("Conecto");
    app.listen(port,'0.0.0.0',()=>{
        console.log('Servidor corriendo en http://localhost:'+port)
    });
})