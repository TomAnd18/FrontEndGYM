import { useSelector } from "react-redux";
import Spinner from "../spinners/Spinner";

export default function Badge({ loading }) {
  const data = useSelector((state) => state.customers.list);
  return (
    <>
      <div className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
        <span className="mr-1">{`Clientes encontrados ->`}</span>
        {loading ? (
          <span className="w-3 h-3 ml-1">
            <Spinner />
          </span>
        ) : (
          <span>{data.length}</span>
        )}
      </div>
    </>
  );
}
