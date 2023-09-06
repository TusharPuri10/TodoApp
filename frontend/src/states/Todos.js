import { atom, selectorFamily } from "recoil";

export const todoListState = atom({
  key: "TodoList",
  default: [],
});

export const todoItem = selectorFamily({
  key: "TodoItem",
  get:
    (todoId) =>
    ({ get }) => {
      const todoList = get(todoListState);
      return todoList.find((todo) => todo._id === todoId) || null;
    },
  // Define the set function to update an individual todo item
  set:
    (todoId) =>
    ({ set, get }, newValue) => {
      const todoList = get(todoListState);
      const updatedList = todoList.map((todo) =>
        todo._id === todoId ? { ...todo, ...newValue } : todo
      );
      console.log("updatedList", updatedList);
      set(todoListState, updatedList);
    },
});

export const isShownState = atom({
  key: "isShown",
  default: null,
});

export const userStatus = atom({
  key: "userStatus",
  default: false,
});

export const newTodoId = atom({
  key: "newTodoId",
  default: null,
});

export const snackbarState = atom({
  key: "snackbarState",
  default: {
    open: false,
    message: "",
    severity: "",
  },
});
