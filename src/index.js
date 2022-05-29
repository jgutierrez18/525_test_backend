const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars'); 
const path = require('path');

const app = express(); 

app.set('port', process.env.PORT || 3000); 

app.set('views', path.join(__dirname,'views'));
app.set('.hbs', exphbs.engine({
    defaultLayout: 'main',
    LayoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

app. use(morgan('dev')); 
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 

app.use(require('./routes'));
app.use('/contacto', require('./routes/contacto'));


app.listen(app.get('port'), ()=> {
    console.log('puerto disponible ', app.get('port'));
}); 