import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";




export abstract class TodoDatasource {

  //? Create abstract methods
  //! ===================== Create a new todo =====================
  abstract create( createTodoDto: CreateTodoDto ): Promise<TodoEntity>;

  //! ===================== Get all todos =====================
  abstract getAll(): Promise<TodoEntity[]>;

  //! ===================== Get todo by id =====================
  abstract findById( id: number ): Promise<TodoEntity>;

  //! ===================== Update by id =====================
  abstract updateById( updateTodoDto: UpdateTodoDto  ): Promise<TodoEntity>;

  //! ===================== Delete by id =====================
  abstract deleteById( id: number ): Promise<TodoEntity>;

}
