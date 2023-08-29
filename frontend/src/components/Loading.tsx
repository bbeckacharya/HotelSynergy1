function Loading() {
  return (
    <section className="absolute w-screen h-screen flex items-center justify-center bg-slate-200 left-0 duration-700 z-40 flex-col top-0">
      <img
        src="/loading.png"
        className="animate-spin duration-75 w-16"
        alt="Loading"
      />
      <h1 className="mt-5">Loading, please wait...</h1>
    </section>
  );
}

export default Loading;
