

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

}
