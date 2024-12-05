import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import customFetch from "./utils";
const SingleItem = ({ item }) => {
  const queryClient = useQueryClient();
  const { mutate: changeTask } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: (id) => customFetch.patch(`/${id}`, { isDone: !item.isDone }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task was changed");
    },
    onError: () => {
      toast.error("Error while changing");
    },
  });
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

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => {
          changeTask(item.id);
        }}
      />
      <p
        style={{
          textTransform: "capitalize",
          textDecoration: item.isDone && "line-through",
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        onClick={() => deleteTask(item.id)}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
