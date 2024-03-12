import { Router } from 'express'
import { TodoRoutes } from './todos/routes';


//! Router principal
export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    //! ======= Rutas de la Aplicacion =======
    router.use('/api/todos', TodoRoutes.routes);

    return router;

  }

}
