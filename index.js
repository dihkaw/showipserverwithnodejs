const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  const networkInterfaces = os.networkInterfaces();
  let ipAddress = 'Tidak dapat menemukan IP';

  for (const name of Object.keys(networkInterfaces)) {
    for (const iface of networkInterfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ipAddress = iface.address;
        break;
      }
    }
    if (ipAddress !== 'Tidak dapat menemukan IP') {
      break;
    }
  }

  const port = server.address().port;
  
  // HTML dengan efek hujan
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Info</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      
      body {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #1a202c;
        overflow: hidden;
        position: relative;
      }
      
      /* Efek hujan */
      .raindrop {
        position: fixed;
        top: -20px;
        width: 1px;
        height: 20px;
        background: linear-gradient(transparent, #fff);
        animation: fall 1s linear infinite;
        z-index: 1;
      }
      
      @keyframes fall {
        to {
          transform: translateY(100vh);
        }
      }
      
      .container {
        background: rgba(255, 255, 255, 0.95);
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        text-align: center;
        max-width: 600px;
        width: 90%;
        position: relative;
        z-index: 2;
      }
      
      h1 {
        color: #2d3748;
        margin-bottom: 1.5rem;
        font-size: 2.5rem;
      }
      
      .info-box {
        background: #f7fafc;
        padding: 1.5rem;
        border-radius: 10px;
        margin: 1rem 0;
        border: 1px solid #e2e8f0;
      }
      
      .info-label {
        color: #718096;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
      }
      
      .info-value {
        color: #2d3748;
        font-size: 1.8rem;
        font-weight: bold;
      }
      
      .footer {
        margin-top: 2rem;
        color: #718096;
        font-size: 0.9rem;
      }
    </style>
  </head>
  <body>
    <!-- Efek hujan -->
    ${Array.from({length: 60}, (_,i) => 
      `<div class="raindrop" style="left: ${Math.random() * 100}%; 
      animation-delay: ${Math.random() * 5}s;"></div>`
    ).join('')}
    
    <div class="container">
      <h1>🖥️ Server Information</h1>
      
      <div class="info-box">
        <div class="info-label">Private IP Address</div>
        <div class="info-value">${ipAddress}</div>
      </div>
      
      <div class="info-box">
        <div class="info-label">Port</div>
        <div class="info-value">${port}</div>
      </div>
      
      <div class="footer">
        Server running on Node.js ${process.version} | ${os.platform()} ${os.arch()}
      </div>
    </div>
  </body>
  </html>
  `;

  res.end(html);
});

const port = 5000;

server.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
