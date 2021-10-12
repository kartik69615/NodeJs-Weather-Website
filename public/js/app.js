console.log("this is the client side javascript")

// fetch methid is use in client side javascript


const weather = document.querySelector('form')
const search = document.querySelector('input')
const messg_1 = document.querySelector('#para_1')
const messg_2 = document.querySelector('#para_2')


weather.addEventListener('submit' , (e) => {
    e.preventDefault()
    const location = search.value

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((res) => {
      res.json().then((data) => {
          if(data.error)
          { 
              messg_1.textContent = data.error
          }
          else
          {
              messg_1.textContent = data.Weather
              messg_2.textContent = data.location

          }
      })
})

})


