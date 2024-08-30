const Loading = () => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-20 h-20 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    </>
  );
};

export default Loading;
