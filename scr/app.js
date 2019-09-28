//core moudle from node.js we don't have install
//however the nap module we do need install
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT  || 3000


//path.join will always point the root page
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup that we can use the hbs extension file
//setup the views that we need access the path of the files

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//app.use it's a way to customize the server
//static is take the path which we want to serve up


app.use(express.static(publicDirectoryPath))

//get method takes url(route), and a function
//function takes two argument request from user and response 


//send will send back a string


//use index.hbs the root file
app.get('',(req,res) =>{
  //first argument '' is the name of the view
  //sencond argument '' we can pass an object or some information we want to pass

  res.render('index', {
      title: 'Weather',
      name: 'Momo Sun'
  })
})

//use about.hbs page
app.get('/about',(req,res)=>{
    res.render('about', {
      title: 'About Me',
      name:'Momo Sun'

    })
})

//help.hbs page
app.get('/help',(req,res)=>{
    res.render('help', {
      helpText: 'Let me know if you need any help',
      title: 'Help',
      name:'Momo Sun'
    })
})


app.get('/weather', (req,res) =>{
  if(!req.query.address){
    return res.send({
      error: 'Please provide the address!'
    })
  }

  geocode(req.query.address, (error,{latitude,longitude,location} ={} )=>{
      if(error){
        return res.send({error})
      }

      forecast(latitude,longitude,(error,forecastData)=>{
          if(error){
            return res.send({error})
          }

          res.send({
            forecast:forecastData,
            location,
            address:req.query.address
          })
      })
  })

})

app.get('/products',(req,res)=>{

  if(!req.query.search){
     return res.send({
        error: 'You must privide a search term'
    })
  }
   
      res.send({
        products:[]
      })
})

app.get('/help/*',(req,res) =>{
  res.render('404',{
    title:'400',
    name:'Momo Sun',
    errorMessage:'Help article is not found'
  })
})


//* means everything that doesn't match with other pages so far
app.get('*',(req,res)=>{
    res.render('404',{
      title:'404',
      name:'Momo Sun',
      errorMessage:'Page not found'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port' + port)
})
//app.com
//app.com/help
//app.com/about