import BPromise from "bluebird";
import { ITodoItem } from "../flux/TodoStore";

class TodoApiService {
  private mockedTodoData: ITodoItem[] = [
    { id: 2, title: "Buy carrot", text: "No Text" },
    {
      id: 1,
      title: "Buy fruits",
      text: "Mango, Oranges, Lemon, Apples, Melon",
    },
    { id: 0, title: "Fix bedroom door", text: "No Text" },
  ];
  private readonly mockedRequestDelay = 2000;

  private request() {
    return BPromise.delay(this.mockedRequestDelay);
  }
  //   private responseDice(
  //     successResponse: Record<string, any>,
  //     failedResponse: Record<string, any>
  //   ) {
  //     return Math.random() < 0.9 ? successResponse : failedResponse;
  //   }

  public getTodoItems() {
    return this.request().then(() => ({
      statusCode: 200,
      body: JSON.stringify(this.mockedTodoData),
    }));
  }

  public createTodoItem(todoItem: ITodoItem) {
    return this.request().then(() => {
      this.mockedTodoData = [todoItem, ...this.mockedTodoData];

      return {
        statusCode: 201,
        body: this.mockedTodoData,
      };
    });
  }

  public deleteTodoItem(id: number) {
    return this.request().then(() => {
      this.mockedTodoData = this.mockedTodoData.filter(
        (todoItem) => todoItem.id !== id
      );

      return {
        statusCode: 200,
        body: this.mockedTodoData,
      };
    });
  }
}

export default new TodoApiService();
