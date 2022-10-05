import { useProductionData } from "../../Services/productionService";

function StaticGraphs() {

  const {data, loading} = useProductionData(10)

  return (
    <div>
      {loading && <div>Fetching data...</div>}
      {!loading && <div>This is it: {data[0].itemName}</div>}
    </div>
  );
}

export default StaticGraphs;
