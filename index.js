
const mongoose = require('mongoose');
const app=require('./app');
const port=3900;
mongoose.connect('mongodb+srv://elcasique:TBK5Qa9BFpNKOyrA@cluster0.mwffh.mongodb.net/', 
{useNewUrlParser: true, 
useUnifiedTopology: true}).then(()=>{
    console.log("Conecto");
    app.listen(port,()=>{
        console.log('Servidor corriendo en http://localhost:'+port)
    });
})