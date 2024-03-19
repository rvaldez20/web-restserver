import { Request, Response } from "express"
import { prisma } from '../../data/postgres/index';
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";



export class TodosController {

  //* DI
  constructor() {}

  //! Get all todos
  public getTodos = async(req: Request, res: Response) => {
    const todos = await prisma.todo.findMany()
    return res.json(todos)
  }

  //! Get a todo by id
  public getTodoById = async(req:Request, res: Response) => {
    const id = +req.params.id;

    if(isNaN(id)) return res.status(400).json({ err: 'ID argument need to be a number'})

    const todo = await prisma.todo.findFirst({
      where: { id: id }
    });

    if(!todo) return res.status(404).json({ err: `TODO with ID: ${id} not found`})

    return res.json(todo)
  }

  public createTodo = async(req: Request, res: Response) => {

    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if(error) return res.status(400).json({ error });

    const newTodo = await prisma.todo.create({
      data: createTodoDto!
    })

    res.json(newTodo);
  }


  public updateTodo = async(req:Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })

    if (error) return res.status(400).json({error});

    const todo = await prisma.todo.findUnique({ where: { id: id }});
    if( !todo ) return res.status(404).json({err: `TODO with id ${id} not found`});

    const todoUpdate = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values,
    });

    res.json(todoUpdate);
  }



  public deleteTodo = async(req:Request, res:Response) => {
    const id = +req.params.id;
    if(isNaN(id)) return res.status(400).json({ err: 'ID argument need to be a number'});

    const todo = await prisma.todo.findUnique({ where: { id: id }});
    if( !todo ) return res.status(404).json({err: `TODO with id ${id} not found`});

    const todoDelete = await prisma.todo.delete({
      where: { id }
    });

    ( todoDelete )
      ? res.json(todoDelete)
      : res.status(400).json({ err: `TODO with ID: ${id} not found`})

  }



}
