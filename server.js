const accountSid = 'AC27e9fc8ed3ffb2f67a263068e079cd57'
const authToken = '3b13bbafb6da1320ccae0929c521c5d8'
const serviceId = 'VAf455d617ee8e3c22b193fb5af0001786'
const twilio = require('twilio')
const client = new twilio(accountSid, authToken)

const express = require('express')
const app = express()
const port = 19000

app.get('/', (req, res) =>
  res.send('Welcom to Verfication service!'),
)

app.get('/verify/:to', async (req, res) => {
  const to = req.params.to

  client.verify
    .services(serviceId)
    .verifications.create({ to, channel: 'sms' })
    .then((verification) => {
      res.json(verification)
    })
    .catch((err) => {
      res.json(err)
    })
})

app.get('/check/:to/:code', async (req, res) => {
  const to = req.params.to
  const code = req.params.code
  client.verify
    .services(serviceId)
    .verificationChecks.create({ to, code })
    .then((verification) => {
      res.json(verification)
    })
    .catch((err) => {
      res.json(err)
    })
})

app.listen(port)