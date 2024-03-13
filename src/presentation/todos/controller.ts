import { Request, Response } from "express"

const todos = [
  { id: 1, text: 'Buy milk', completedAt: new Date()},
  { id: 2, text: 'Buy bread', completedAt: null},
  { id: 3, text: 'Buy butter', completedAt: new Date()},
];


export class TodosController {

  //* DI
  constructor() {}

  //! Get all todos
  public getTodos = (req: Request, res: Response) => {
    return res.json(todos)
  }

  //! Get a todo by id
  public getTodoById = (req:Request, res: Response) => {
    const id = +req.params.id;

    if(isNaN(id)) return res.status(400).json({ err: 'ID argument need to be a number'})

    const todoById = todos.find( todo => todo.id === id );

    ( todoById )
      ? res.json(todoById)
      : res.status(404).json({ err: `TODO with id ${id} not found` })
  }

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body

    if( !text ) return res.status(400).json({err: 'Text property is required'});

    //? preparamos el nuevo todo
    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: null,
    }

    //?Insertamos el nuevo todo al array
    todos.push(newTodo);

    res.json(newTodo);
  }


  public updateTodo = (req:Request, res: Response) => {
    const id = +req.params.id;
    if(isNaN(id)) return res.status(400).json({ err: 'ID argument need to be a number'})

    const todoUpdate = todos.find( todo => todo.id === id );
    if( !todoUpdate ) return res.status(404).json({err: `TODO with id ${id} not found`});

    const { text, completedAt } = req.body;
    // if( !text ) return res.status(400).json({err: 'Need to send text to update the TODO'});

    todoUpdate.text = text || todoUpdate.text;
    ( completedAt === null )
      ? todoUpdate.completedAt = null
      : todoUpdate.completedAt = new Date( completedAt || todoUpdate.completedAt)

    res.json(todoUpdate);
  }



  public deleteTodo = (req:Request, res:Response) => {
    const id = +req.params.id;
    if(isNaN(id)) return res.status(400).json({ err: 'ID argument need to be a number'});

    const todoUpdate = todos.find( todo => todo.id === id );
    if( !todoUpdate ) return res.status(404).json({err: `TODO with id ${id} not found`});

    //! forma 1 pero hay que cambiar los todos a let
    // const todosDelete = todos.filter(todo => todo.id != id);
    // todos = [...todosDelete]

    todos.splice( todos.indexOf(todoUpdate), 1);

    res.json(todoUpdate);
  }



}
