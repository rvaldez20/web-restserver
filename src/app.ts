
import http from 'http';
import fs from 'fs'

const server = http.createServer((req, res) => {

  console.log(req.url);

  //! Serve Side Rendering (res->html)
  // res.writeHead(200,{ 'Content-Type': 'text/html' });
  // res.write(`<h1>URL ${req.url}</h1>`);
  // res.end();

  //! Serve Side Rendering (res->json)
  // const data = {name:'Jonh Doe', age: 30, city: 'New York'};
  // res.writeHead(200, { 'Content-Type': 'application/json' });
  // // write() y end() en una misma linae
  // res.end( JSON.stringify(data) );

  if( req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end( htmlFile );
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end();
  }


});


server.listen(8080, () => {
   console.log('Server run in Port 8080');
});
