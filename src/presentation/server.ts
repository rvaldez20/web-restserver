import express from 'express'
import path from 'path';


export class Server {

  private app = express();


  async start() {

    //* middlewares



    //* public folder
    this.app.use(express.static('public'));

    this.app.get('*', (req, res) => {
      const indexPath = path.join( __dirname + '../../../public/index.html' );
      console.log(indexPath);
      res.sendFile(indexPath);

      // console.log(req.url);
      // res.send('Hola Mundo')
    })


    this.app.listen(4000, () => {
      console.log(`Server running on port ${4000}`);
    });

  }

}
