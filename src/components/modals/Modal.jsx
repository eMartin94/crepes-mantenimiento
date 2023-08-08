import { useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const Modal = ({ isOpen, onCancel, onConfirm, text, more }) => {
  const [closing, setClosing] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onCancel();
    }, 100);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-10 w-full ${
        closing ? 'animate-zoom-out' : 'animate-zoom-in'
      }`}
    >
      <div className='bg-white px-8 py-4 rounded-lg shadow-md w-full max-w-sm h-60 flex flex-col justify-center items-center transform transition-all duration-300'>
        <FaExclamationCircle className='text-primary-50 text-7xl mb-4 mt-2' />
        <p className='mb-4 text-center'>
          ¿Estás seguro de {text}? <br />
          <span className='text-secondary-100 text-sm'>{more}</span>
        </p>
        <div className='flex justify-end'>
          <button
            className='mr-2 px-8 py-2 text-white bg-secondary-100 rounded hover:bg-secondary-100 uppercase'
            onClick={handleClose}
          >
            No
          </button>
          <button
            className='px-8 py-2 text-white bg-complementary-100 rounded hover:bg-complementary-100 uppercase'
            onClick={onConfirm}
          >
            Sí
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
