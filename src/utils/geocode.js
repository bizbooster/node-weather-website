const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJhdG9mZiIsImEiOiJjbTd2bTZrcTMwMThjMmlwd3Rkem56a2hhIn0.DQ-111ict6_5OYUEgkp8Wg&limit=1'
    //console.log(url)
    request({url: url, json:true}, (error, { body }) => {
        if(error){
           callback('Unable to connect to location service', undefined) 
        } else if(body.features.length === 0){
            //console.log(response)
            callback('Unable to find location.',undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode