
import http2 from 'http2';
import fs from 'fs'

const server = http2.createSecureServer( {
  key: '',  // read .key
  cert: '', // read .cer
}, (req, res) => {

  console.log(req.url);

  //! Serve Side Rendering (res->html)
  // res.writeHead(200,{ 'Content-Type': 'text/html' });
  // res.write(`<h1>URL ${req.url}</h1>`);
  // res.end();

  //! Serve Side Rendering (res->json)
  // const data = {name:'Jonh Doe', age: 30, city: 'New York'};
  // res.writeHead(200, { 'Content-Type': 'application  /json' });
  // // write() y end() en una misma linae
  // res.end( JSON.stringify(data) );

  if( req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write(htmlFile);
    res.end( htmlFile );

    return;
  }

  if( req.url?.endsWith('.js') ) {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
  } else if( req.url?.endsWith('.css') ) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
  }

  const responseContent = fs.readFileSync(`./public${ req.url }`, 'utf-8');
  res.end( responseContent );

});


server.listen(8080, () => {
   console.log('Server run in Port 8080');
});
