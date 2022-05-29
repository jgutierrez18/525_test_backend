const express = require('express');
const pool = require('../database');
const router = express.Router();

const db = require('../database'); 

router.get('/', (req, res) => { 
    res.render('contacto/agregar');
});

router.get('/tabla', async (req,res)=>{
 const  registros = await pool.query('SELECT * FROM contact');
 const regisCiudad = await pool.query('SELECT city ,COUNT(id) AS n_registros FROM contact GROUP BY city');
 console.log(regisCiudad);
    res.render('contacto/registros',{registros, regisCiudad});
});

 module.exports = router; 