import customFetch from "./utils";
import { useQuery } from "@tanstack/react-query";
import SingleItem from "./SingleItem";
const Items = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => customFetch.get("/"),
  });

  const fetchedData = data?.data?.taskList;

  if (isLoading) return <h5>Loading...</h5>;
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
