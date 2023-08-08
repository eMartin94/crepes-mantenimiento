import { useEffect, useRef, useState } from 'react';

const SelectCategory = ({ onSelectCategory, label, name, errors, register, isRequired }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const selectRef = useRef(null);

  const options = [
    { value: '', label: 'Selecciona una categoría' },
    { value: 'crepes', label: 'Crepes' },
    { value: 'waffles', label: 'Waffles' },
    { value: 'pancakes', label: 'Pancakes' },
    { value: 'bebidas', label: 'Bebidas' },
    { value: 'helados', label: 'Helados' },
  ];

  const handleSelectOption = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
    onSelectCategory(value);
  };

  const handleOutsideClick = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  return (
    <div className='relative inline-block' ref={selectRef}>
      <div className='border border-gray-300 bg-white rounded-md shadow-sm'>
        <button
          type='button'
          className='w-full py-2 px-4 text-left'
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption || 'Selecciona una categoría'}
          <svg
            className={`w-5 h-5 inline-block ${isOpen ? 'transform rotate-180' : ''}`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            ></path>
          </svg>
        </button>
        {isOpen && (
          <ul className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg'>
            {options.map((option) => (
              <li
                key={option.value}
                className='px-4 py-2 hover:bg-gray-100'
                onClick={() => handleSelectOption(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <input
        type='hidden'
        {...register(name, { required: isRequired })}
        defaultValue={selectedOption}
      />
      {errors[name] && (
        <p className='text-red-500 text-xs italic'>
          El campo <span className='lowercase'>{label}</span> es requerido.
        </p>
      )}
    </div>
  );
};

export default SelectCategory;
