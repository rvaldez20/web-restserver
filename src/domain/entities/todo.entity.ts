

export class TodoEntity {

   constructor(
      public id: number,
      public text: string,
      public completedAt?: Date|null,
   ) {}

   //! getter
   get isCompleted() {
      return !!this.completedAt;
   }

   public static fromObj(object: {[key: string]: any}): TodoEntity {
    const {id, text, completedAt} = object;

    //* VALIDACIONES
    if( !id ) throw 'Id is required';
    if( !text ) throw 'text is required';

    let newCompetedAt;
    if( completedAt ) {
      newCompetedAt = new Date( completedAt );
      if(isNaN(newCompetedAt.getTime()))
        throw 'CompetedAt is not a value date';
    }

    //* Creamos la Instancia
    return new TodoEntity( id, text, completedAt );
   }

}
