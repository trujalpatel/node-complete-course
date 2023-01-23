const express = require('express');
const path  = require('path');
const hbs  = require('hbs');

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

// app.get('/help',(req, res) => {
//     res.send();
// })

// app.get('/about',(req, res) => {
//     res.send('It is a About page');
// })

app.get('/weather',(req, res) => {
    res.send('It is a weather page');
})

app.listen('3000', () => {
    console.log('server is up on 3000 port');
})