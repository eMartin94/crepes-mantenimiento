import { useEffect, useRef, useState } from 'react';
import SearchForm from '../components/forms/SearchForm';
import Overview from '../components/Overview';
import { useCategory } from '../context/useCategory';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const selectRef = useRef(null);
  const { categories, getCategories } = useCategory();
  const getCategoriesRef = useRef(getCategories);
  useEffect(() => {
    getCategoriesRef.current();
  }, []);

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
    <div>
      <SearchForm />
      <Overview />
      <div className='relative inline-block max-w-[300px] w-full' ref={selectRef}>
        <div className='border border-gray-300 bg-white rounded-md shadow-sm w-full'>
          <button
            type='button'
            className='w-full py-2 px-4 text-left flex justify-between'
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
      </div>
      <select>
        {categories.map((option) => (
          <option key={option._id} value={option.nombre}>
            {option.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Home;
