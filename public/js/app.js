console.log('client side javasript file is loaded')

//fetch is not from javascript
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//the event of the name , call back function everytime that event occurs


weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ' '

    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
        //then is a call back function
        //access the parsed json file which turns to an object data
             response.json().then((data)=>{ 
                if(data.error){
                    messageOne.textContent = data.error
                }else{
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                        
                }
            })
    })
})

