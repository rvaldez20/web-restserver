

export class CreateTodoDto {

  private constructor(
    public readonly text: string,
  ) {}

  //! props: {[key: string] -> significa que mandamos las key del objeto
  static create( props: {[key: string]: any}): [string?, CreateTodoDto?] {

    const { text } = props;
    if(!text) return ['Text Property is required.', undefined]

    return [undefined, new CreateTodoDto( text )];
  }

}
