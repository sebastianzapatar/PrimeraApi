
const mongoose = require('mongoose');
const app=require('./app');
const port=3900;
mongoose.connect('mongodb+srv://avanzada:XNpZpBdcUVnJ2p8C@cluster0.ngp95.mongodb.net/db', 
{useNewUrlParser: true, 
useUnifiedTopology: true}).then(()=>{
    console.log("Conecto");
    app.listen(port,()=>{
        console.log('Servidor corriendo en http://localhost:'+port)
    });
})