import { Request, Response } from "express"
import { prisma } from '../../data/postgres/index';
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";



export class TodosController {

  //* DI
  constructor(
    private readonly todoRepository: TodoRepository,
  ) {}

  //! Get all todos
  public getTodos = async(req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    //* cada todo son instancia de TodoEntity
    // console.log({todos});
    return res.json(todos);
  }

  //! Get a todo by id
  public getTodoById = async(req:Request, res: Response) => {
    const id = +req.params.id;

    try {
      const todo = await this.todoRepository.findById(id);
      return res.json(todo);
    } catch (error) {
      res.status(400).json({error});
    }
  }

  public createTodo = async(req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if(error) return res.status(400).json({ error });

    try {
      const todo = await this.todoRepository.create(createTodoDto!);
      return res.json(todo);
    } catch (error) {
      res.status(400).json({error});
    }
  }


  public updateTodo = async(req:Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })
    if (error) return res.status(400).json({error});

    try {
      const todoUpdate = await this.todoRepository.updateById(updateTodoDto!)
      return res.json(todoUpdate);
    } catch (error) {
      res.status(400).json({error});
    }
  }



  public deleteTodo = async(req:Request, res:Response) => {
    const id = +req.params.id;
    if(isNaN(id)) return res.status(400).json({ err: 'ID argument need to be a number'});

    try {
      const todoDeleted = await this.todoRepository.deleteById(id);
      return res.json(todoDeleted);
    } catch (error) {
      res.status(400).json({error});
    }
  }



}
