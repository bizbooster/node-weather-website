const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=9cad34afeff268c8658303506dbc2224&query='+latitude+','+longitude

    request({ url, json: true},(error, { body }) => {    
        if(error){
            callback('Unable to connect',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out.')
        }
        
    })
}

module.exports = forecast
