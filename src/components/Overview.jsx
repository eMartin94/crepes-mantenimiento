const Overview = () => {
  return (
    <div className='py-4 flex flex-col gap-2'>
      <h1>Overview</h1>
      <div className='flex flex-shrink gap-y-4 gap-x-8'>
        <div className='w-[300px] h-[150px] shadow-lg flex justify-center items-center rounded-lg bg-primary-30 text-primary-100 card-one'>
          nombre del item
        </div>
        <div className='w-[300px] h-[150px] shadow-lg flex justify-center items-center rounded-lg  card-two'>
          nombre del item
        </div>
        <div className='w-[300px] h-[150px] shadow-lg flex justify-center items-center rounded-lg bg-primary-10 card-three'>
          nombre del item
        </div>
        <div className='w-[300px] h-[150px] shadow-lg flex justify-center items-center rounded-lg card-four'>
          nombre del item
        </div>
        <div className='w-[300px] h-[150px] shadow-lg flex justify-center items-center rounded-lg card-five'>
          nombre del item
        </div>
      </div>
    </div>
  );
};

export default Overview;
