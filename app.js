'use strict';
//cargar los modulos de js
const express=require('express');

//vamos a ejecutar el servidor
const app=express();
//Cargas los archivos y asignarles una ruta
const EstudianteUrl=require('./urls/EstudianteUrl');
//middleware lo que traduce la peticion a json
app.use(express.json());
app.use(express.urlencoded());
//Cors permite que otras aplicaciones se conecten
//Añadir los prefijos
app.use('/',EstudianteUrl);
//Exportar los modulos
module.exports=app;
