const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

//middleware de body-parser

app.use(bodyParser.urlencoded({ extended: false }))

// Quien es el que cobra es esto, nuestro token
mercadopago.configure({
  access_token: 'APP_USR-6212989035128248-042319-f40d9fa1635f27d31584afafe7eda91d-748465140'
});

          


app.post('/checkout', (req, res) => {
  // Crea un objeto de preferencia
  //Aca le indico el titulo y valor en la pagina de mercadopago. (Vienen de lo que elije el user)
let preference = {
  items: [
    //todos los values vienen del names en los inputs de formularios así no hago hard code
    {
      title: req.body.title,
      //parseInt para pasarlo a numero y no piense que es una string el 2.500 en el precio
      unit_price: parseInt(req.body.price),
      quantity: 1,
    },
    
  ]
};

mercadopago.preferences.create(preference)
.then(function(response){
//Respuesta de mercado a nuestro servidor con parametros para trabajar y lo redirijimos con init_point que
//es parametro de mercadopago

res.redirect(response.body.init_point);


}).catch(function(error){
  console.log(error);
});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})