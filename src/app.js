const path = require('path') // built in package
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')

// Creates an Express application
const express = require('express')
const app = express()  
const port = process.env.PORT || 3000

// define path for express config
const publicDirPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views') 
const partialsPath = path.join(__dirname , '../templates/partials')

 
// set up  handlebars engine
app.set('view engine' , 'hbs')
app.set('views' , viewsPath) 
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirPath))

// Renders a view and sends the rendered HTML string to the client
app.get('' , (req , res) => {
     res.render('index' , {
         title : "Weather App" , 
         name :  "Kartik Singh"
     })
})

app.get( '/help' , (req , res) => {
   res.render('help' , {
       title : "Help",
       message : "This is the help page"
   })
})

app.get( '/about' , (req , res) => {
    res.render('about' , {
        title : "About Page Dynamic"
    })
})

app.get( '/weather' , (req , res) => {
    if(!req.query.address){
        return res.send({
            error : "Address not found"
        })
    }

    geocode(req.query.address , (error , {longitude , latitude , location} = {}) => {
        if(error){ return res.send({error})}

        forecast(longitude , latitude , (error , forecastdata) => {
            if(error){ return res.send({error})}

            res.send({
                Weather : forecastdata , 
                location , 
                address : req.query.address
            })
        })
    })
})



app.get('/about/*' , (req,res) => {
    res.send("404 Error Found")
})

app.get('*' , (req,res) => {
    res.render('notFound' , {
        text : "404 Error Found"
    })
})


app.listen(port , () => {
    console.log('express server is running ' + port)
})