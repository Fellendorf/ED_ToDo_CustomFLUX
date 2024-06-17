import BPromise from "bluebird";
import { ITodoItem } from "../flux/TodoStore";

class TodoApiService {
  private mockedTodoData: ITodoItem[] = [
    {
      id: 2,
      date: new Date("2024-01-01").getTime(),
      text: "Buy carrot",
    },
    // {
    //   id: 1,
    //   date: new Date("2024-01-02").getTime(),
    //   text: "Buy fruits",
    // },
    // {
    //   id: 0,
    //   date: new Date("2024-01-03").getTime(),
    //   text: "Fix bedroom door",
    // },
  ];
  private readonly mockedRequestDelay = 500;

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
        body: JSON.stringify(this.mockedTodoData),
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
        body: JSON.stringify(this.mockedTodoData),
      };
    });
  }
}

export default new TodoApiService();
