import customFetch from "./utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SingleItem from "./SingleItem";
const Items = () => {
  const queryClient = useQueryClient();
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => customFetch.get("/"),
  });

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
