import express from 'express'


export class Server {

  private app = express();


  async start() {

    //* middlewares



    //* public folder
    this.app.use(express.static('public'));


    this.app.listen(4000, () => {
      console.log(`Server running on port ${4000}`);
    });

  }

}
