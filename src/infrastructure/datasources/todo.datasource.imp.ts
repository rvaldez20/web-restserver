import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";



export class TodoDatasourceImp implements TodoDatasource {
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }



  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    return todos.map( todo => TodoEntity.fromObj(todo));
  }



  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: { id: id }
    });

    if( !todo ) throw `Todo with ID ${id} not found`;
    return TodoEntity.fromObj(todo);
  }



  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }



  deleteById(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

}