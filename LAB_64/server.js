const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  
  if (req.url === '/') {
    res.statusCode = 200;
    res.end('<h1>Pagina Inicial</h1><p>Bem-vindo a pagina inicial do servidor Node.js! Digite /sobre para conhecer outra pagina e /abc para conferir a pagina 404</p>');
  } else if (req.url === '/sobre') {
    res.statusCode = 200;
    res.end('<h1>Sobre</h1><p>Esta e a pagina sobre do servidor Node.js!</p>');
  } else {
    res.statusCode = 404;
    res.end('<h1>404 - Pagina Nao Encontrada</h1><p>A pagina que voce esta procurando nao existe.</p>');
  }
});

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`);
});
