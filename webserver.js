'use strict';

const http = require('http');
const os = require('os');

let counter = 0;
let ip = '127.0.0.1';
let host = 'docker';

let candidates = [];
const ifaces = os.networkInterfaces();
Object.keys(ifaces).forEach(ifname => {
  ifaces[ifname].forEach(iface => {
    // Skip over internal and non-ipv4 addresses.
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return;
    }
    candidates.push(iface.address);
  });
});
if (candidates.length > 0) {
  ip = candidates[0];
}

if (process.argv.length > 2) {
  host = process.argv[2];
}

function generatePage() {
  return `Host: ${host}\r\nContainer IP: ${ip}\r\nVisits: ${counter}\r\n`;
}

const server = http.createServer((req, res) => {
  if (req.url !== '/favicon.ico') {
    ++counter;
  }
  res.end(generatePage());
});

server.listen(8080);
