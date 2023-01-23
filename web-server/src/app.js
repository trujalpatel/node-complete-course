const express = require('express');
const path  = require('path');
const hbs  = require('hbs');
const geoCode = require('./utils/geoCode.js');
const foreCast = require('./utils/foreCast');

const app = express();

// Define apps for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//set Express js setting for handlebars and view directory
app.set('view engine', "hbs");
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Patel'
    });
});

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Patel'
    });
});

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You need to provide address param"
        });
     }
     geoCode(req.query.address, (error, { latitude, longitude, location } = {})  => {
        if(error){
            return res.send({ error: error });
        }
        foreCast(latitude,longitude ,(error, foreCastData) => {
            if(error){
                return res.send({ error: error });
            }
            return res.send({
                forecast: foreCastData,
                location,
                address: req.query.address
            });
        })
    })
});

app.get('/products',(req, res) => {
     if(!req.query.search){
        return res.send({
            error: "You need to provide search param"
        });
     }
     console.log(req.query.search);
    res.send({
        product: []
    });
});

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Patel'
    });
});



app.get('/help/*',(req, res) => {
    res.render('404', {
        title: 'Help',
        msg: 'Help article not found',
        name: 'patel'
    });
});

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        msg: '404: Page not found',
        name: 'patel'
    });
});

app.get('/weather',(req, res) => {
    res.send('It is a weather page');
})

app.listen('3000', () => {
    console.log('server is up on 3000 port');
})