import { CreateTodoDto } from "./create-todo.dto";


export class UpdateTodoDto {

  private constructor(
    public readonly  id: number,
    public readonly text?: string,
    public readonly completedAt?: Date,
  ) {}

  get values() {
    const returnObj: {[key: string]: any} = {}

    if( this.text ) returnObj.text = this.text;
    if( this.completedAt ) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  static create( props: {[key:string]: any}): [string?, UpdateTodoDto?] {

    const { id, text, completedAt} = props;
    let newCompetedAt = completedAt;

    if( !id || isNaN( Number(id)) ) return ['Id must be valid number', undefined]

    if( completedAt ) {
      newCompetedAt = new Date( completedAt )
      if( newCompetedAt.toString() === 'Invalid Date' )
        return ['CompetedAt must be a valid date']
    }

    return[undefined, new UpdateTodoDto( id, text, newCompetedAt )]
  }

}
