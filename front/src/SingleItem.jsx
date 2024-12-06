import { useChangeTask, useDeleteTask } from "./customHooks";
const SingleItem = ({ item }) => {
  const { changeTask } = useChangeTask();
  const { deleteTask } = useDeleteTask();

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => {
          changeTask({ id: item.id, taskStatus: item.isDone });
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
