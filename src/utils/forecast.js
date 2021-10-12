const request = require('request')

const forecast = (lat , long ,  callback) => {
const url = 'http://api.weatherstack.com/current?access_key=acf8115b6e0fbb6e841b018091992bcd&query=' + lat + ',' + long 

    request({url : url , json : true} , (error , {body}) => {
            if(error)
            {
                callback('Unable to connect')
            }
            else if(body.error)
            {
                callback('Unable to find location')
            }
            else
            {
                callback(undefined , body.current.weather_descriptions + ' Temperature ' +  body.current.temperature + ' Feels like ' + body.current.feelslike )
            }
    })
}

module.exports = forecast

// forecast(84.5 , 74.5 , (error , forecastdata) => {
//     console.log(forecastdata)
//     // console.log(process.argv[2])
// })

