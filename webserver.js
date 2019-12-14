'use strict'

const http = require('http')
const os = require('os')

let counter = 0
let ip = '127.0.0.1'
let server = 'docker'

let candidates = []
const ifaces = os.networkInterfaces()
Object.keys(ifaces).forEach(ifname => {
  ifaces[ifname].forEach(iface => {
    // Skip over internal and non-ipv4 addresses.
    if (iface.family !== 'IPv4' || iface.internal !== false) {
      return
    }
    candidates.push(iface.address)
  })
})
if (candidates.length > 0) {
  ip = candidates[0]
}

if (process.argv.length > 2) {
  server = process.argv[2]
}

function generatePage (req) {
  let lines = []
  lines.push(`server: ${server}`)
  lines.push(`Container IP: ${ip}`)
  lines.push(`Visits: ${counter}`)
  lines.push('')
  const host = req.headers['host']
  if (host) {
    lines.push(`Host: ${host}`)
  }
  const origin = req.headers['x-forwarded-for']
  if (origin) {
    lines.push(`X-Forwarded-For: ${origin}`)
  }
  lines.push('')
  return lines.join('\r\n')
}

const webserver = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.end()
  }
  if (req.url !== '/favicon.ico') {
    ++counter
  }
  res.end(generatePage(req))
})

webserver.listen(8080)
