import { useEffect } from 'react';

const AlertSuccess = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className='fixed bottom-16  right-4 bg-tertiary-10 text-tertiary-100 px-4 py-4 rounded shadow-lg max-w-[300px] w-auto animate-zoom-in'>
      <p className='font-semibold text-center text-xs'>{message}</p>
    </div>
  );
};

export default AlertSuccess;
