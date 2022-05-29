const express = require('express');
const async = require('hbs/lib/async');
const pool = require('../database');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const router = express.Router();

const db = require('../database');
const res = require('express/lib/response');

router.post('/agregar', [
    check('name').not().isEmpty().withMessage('Un Nombre es requerido').isLength({ min: 3 }).withMessage('Nombre muy corto'),
    check('last_name').not().isEmpty().withMessage('Un apellido es requerido').isLength({ min: 3 }).withMessage('Apellido muy corto'),
    check('address').not().isEmpty().withMessage('Una Direccion es requerida').isLength({ min: 3 }).withMessage('Direccion no valida'),
    check('email').not().isEmpty().withMessage('Email es requerido').isEmail().withMessage('Email no es valido')

], async (req, res) => {
    const { sex, date_birthday, name, last_name, email, address, country, state, city, comment } = req.body;
    const errors = validationResult(req).array();

    var years = moment().diff(date_birthday, 'years');

    console.log('años', years);

    if (years < 18) {
        errors.push({ msg: "Edad no permitida", value: "", param: "password", location: "body" });
    }

    if (errors.length > 0) {
        console.log('mensaje de error', errors);
        res.render('contacto/agregar', { errors, sex, date_birthday, name, last_name, email, address, country, state, city, comment });
    } else {
        const newContacto = {
            sex, date_birthday, name, last_name, email, address, country, state, city, comment
        }
        await pool.query('INSERT INTO contact set ?', [newContacto]);
        console.log('ok');
        res.redirect('/tabla');
    }

});
router.post('/exportar', async (req, res) => {
    const registros = await pool.query('SELECT * FROM contact');
    res.json(registros);
});
router.get('/delete/:id', async (req, res) => {

    const { id } = req.params;
    await pool.query('DELETE FROM contact WHERE ID = ?', [id]);
    res.redirect('/tabla');

});
router.get('/edit/:id', async (req, res) => {

    const { id } = req.params;

    const registro = await pool.query('SELECT * FROM contact WHERE ID = ?', [id]);
    console.log(registro[0]);
    res.render('contacto/editar', { registro: registro[0] });

});
router.post('/edit/:id', [
    check('name').not().isEmpty().withMessage('Un Nombre es requerido').isLength({ min: 3 }).withMessage('Nombre muy corto'),
    check('last_name').not().isEmpty().withMessage('Un apellido es requerido').isLength({ min: 3 }).withMessage('Apellido muy corto'),
    check('address').not().isEmpty().withMessage('Una Direccion es requerida').isLength({ min: 3 }).withMessage('Direccion no valida'),
    check('email').not().isEmpty().withMessage('Email es requerido').isEmail().withMessage('Email no es valido')

], async (req, res) => {
    const { sex, date_birthday, name, last_name, email, address, country, state, city, comment } = req.body;
    const _id = req.params.id
    const errors = validationResult(req).array();

    var years = moment().diff(date_birthday, 'years');

    console.log('años', years);

    if (years < 18) {
        errors.push({ msg: "Edad no permitida", value: "", param: "password", location: "body" });
    }
    if (errors.length > 0) {

        console.log('mensaje de error', errors);
        res.render('contacto/editar', { errors, _id, sex, date_birthday, name, last_name, email, address, country, state, city, comment });
    } else {
        const { id } = req.params;

        const newRegistro = {
            sex, date_birthday, name, last_name, email, address, country, state, city, comment
        };
        console.log(newRegistro);
        await pool.query('UPDATE contact set ? WHERE id = ?', [newRegistro, id]);
        res.redirect('/tabla');
    }


}

);

module.exports = router; 