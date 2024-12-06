import customFetch from "./utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useFetchTasks = () => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => customFetch.get("/"),
  });
  return { isLoading, data, isError, error };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (task) => customFetch.post("/", { title: task }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("task was added");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createTask, isLoading };
};

export const useChangeTask = () => {
  const queryClient = useQueryClient();
  const { mutate: changeTask } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: ({ id, taskStatus }) =>
      customFetch.patch(`/${id}`, { isDone: !taskStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task was changed");
    },
    onError: () => {
      toast.error("Error while changing");
    },
  });
  return { changeTask };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: (id) => customFetch.delete(`/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task was deleted");
    },
    onError: () => {
      toast.error("Error while deleting");
    },
  });
  return { deleteTask };
};
