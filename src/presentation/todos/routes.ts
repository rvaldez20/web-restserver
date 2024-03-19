import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImp } from "../../infrastructure/datasources/todo.datasource.imp";
import { TodoRepositoryImp } from "../../infrastructure/repositories/todo.repository.imp";




export class TodoRoutes {

  static get routes(): Router {

    const router = Router();

    const datasource = new TodoDatasourceImp;
    const todoRepository = new TodoRepositoryImp( datasource );
    const todoController = new TodosController( todoRepository );

    router.get('/', todoController.getTodos);
    router.get('/:id', todoController.getTodoById);

    router.post('/', todoController.createTodo);
    router.put('/:id', todoController.updateTodo);
    router.delete('/:id', todoController.deleteTodo);

    return router;

  }

}
