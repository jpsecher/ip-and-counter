'use strict'

const http = require('http')
const os = require('os')

let counter = 0
let ip = '127.0.0.1'

let candidates = []
const ifaces = os.networkInterfaces()
Object.keys(ifaces).forEach(ifname => {
  ifaces[ifname].forEach(iface => {
    // Skip over internal and non-ipv4 addresses.
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return
    }
    candidates.push(iface.address)
  })
})
if (candidates.length > 0) {
  ip = candidates[0]
}

function generatePage () {
  return `IP: ${ip}\r\nvisits: ${counter}`
}

const server = http.createServer((req, res) => {
  if (req.url !== '/favicon.ico') {
    ++counter
  }
  res.end(generatePage())
})

server.listen(8080)
