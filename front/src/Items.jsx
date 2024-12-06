import SingleItem from "./SingleItem";
import { useFetchTasks } from "./customHooks";

const Items = () => {
  const { isLoading, error, data } = useFetchTasks();
  const fetchedData = data?.data?.taskList;

  if (isLoading) return <h5>Loading...</h5>;
  if (error) {
    console.log(error);
    return (
      <h5>
        {error.response.data}: {error.response.status}
      </h5>
    );
  }

  return (
    <>
      <div className="items">
        {fetchedData.map((item) => {
          return <SingleItem key={item.id} item={item} />;
        })}
      </div>
    </>
  );
};
export default Items;
