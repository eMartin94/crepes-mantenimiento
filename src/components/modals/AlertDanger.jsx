import { useEffect } from 'react';

const AlertDanger = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 6000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className='bg-secondary-10 text-secondary-100 px-4 py-4 rounded shadow-lg max-w-[300px] w-auto text-center animate-zoom-in'>
      <p className='font-semibold text-center text-xs'>{message}</p>
    </div>
  );
};

export default AlertDanger;
