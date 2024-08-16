export default function Badge({ type, select }) {
  return (
    <>
      <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
        {`${type}: ${select}`}
      </span>
    </>
  );
}
