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



  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById( updateTodoDto.id );

    // usamos el mismo method findById() para buscar el todo
    const todoUpdate = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values,
    });

    return TodoEntity.fromObj(todoUpdate);
  }



  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById( id );

    // usamos el mismo method findById() para buscar el todo
    const todoDelete = await prisma.todo.delete({
      where: { id }
    });

    return TodoEntity.fromObj(todoDelete);
  }

}
