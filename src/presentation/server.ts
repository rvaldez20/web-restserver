import express, { Router } from 'express'
import path from 'path';

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}


export class Server {

  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;


  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }


  async start() {

    //* middlewares


    //* Routes
    this.app.use( this.routes );


    //* public folder
    this.app.use(express.static(this.publicPath));


    //* SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join( __dirname + `../../../${this.publicPath}/index.html` );
      console.log(indexPath);
      res.sendFile(indexPath);

      // console.log(req.url);
      // res.send('Hola Mundo')
    })


    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });

  }

}
