import type {
  GetTeamIdTodos200,
  GetTeamIdTodosFavorites200,
} from "@/apis/model";

interface TodosCache {
  data: GetTeamIdTodos200;
}

interface FavoritesCache {
  data: GetTeamIdTodosFavorites200;
}

export const updateTodosFavoriteCache = (
  oldData: TodosCache | undefined,
  todoId: number,
  isFavorite: boolean,
) => {
  if (!oldData) return oldData;

  return {
    ...oldData,
    data: {
      ...oldData.data,
      todos: oldData.data.todos.map((todo) =>
        todo.id === todoId ? { ...todo, isFavorite } : todo,
      ),
    },
  };
};

export const removeTodoFromFavoritesCache = (
  oldData: FavoritesCache | undefined,
  todoId: number,
) => {
  if (!oldData) return oldData;
  console.log(oldData);

  const favorites = oldData.data.favorites.filter(
    (favorite) => favorite.todoId !== todoId,
  );
  console.log(favorites);

  return {
    ...oldData,
    data: {
      ...oldData.data,
      favorites,
      totalCount: favorites.length,
    },
  };
};
