const request = require ('request')

const forecast = (latitude,longitude, callback ) =>{
    const url ='https://api.darksky.net/forecast/120e63c7fb3f21882a4cdd72a62f1231/'+ latitude+','+longitude

    request({url, json:true}, (error,{body}) =>{

        if(error){
            callback('Unable to connect the internet',undefined)
        }else if(body.error){
            callback('Unable to get the data', undefined)
        }else{

            callback(undefined,

            body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degree out. There is a ' + body.currently.precipProbability + '% change the of rain'
            )
   
        }
    })
    
}

module.exports = forecast