const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const app_port = process.env.port || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Home',
        name: 'Pat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Pat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Provide location',
        name: 'Pat'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Provide address'
        })
    }

    geocode(req.query.address,(error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
        
        forecast(latitude,longitude, (error,forecastData) => {
            if(error){
                return res.send({ error })
            }
    
            
            res.send({
                location,
                forecast:forecastData,
                address: req.query.address
            })
        })
    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'Provide search term' 
        })
    }
    console.log(req.query)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Pat',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Pat',
        errorMessage: 'Page not found'
    })
})

app.listen(app_port, () => {
    console.log('Server is up on port '+app_port)
})
