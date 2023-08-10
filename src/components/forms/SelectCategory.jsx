import { useEffect, useRef } from 'react';
import { useCategory } from '../../context/useCategory';

const SelectCategory = ({ value, onChange, error }) => {
  const { categories, getCategories } = useCategory();
  const getCategoriesRef = useRef(getCategories);
  useEffect(() => {
    getCategoriesRef.current();
  }, []);

  return (
    <div className='relative inline-block w-full'>
      <select
        value={value}
        onChange={onChange}
        className='block appearance-none w-full bg-transparent border border-primary-50 hover:border-primary-50 text-primary-100 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline capitalize'
      >
        <option value='Seleccionar categoría' disabled>
          Seleccionar categoría
        </option>
        {categories.map((category) => (
          <option key={category._id} value={category.nombre}>
            {category.nombre}
          </option>
        ))}
        {/* <option value='crepes'>Crepes</option>
        <option value='waffles'>Waffles</option>
        <option value='bebidas'>Bebidas</option>
        <option value='helados'>Helados</option>
        <option value='pancakes'>Pancakes</option> */}
      </select>
      <div className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
        <svg
          className='w-5 h-5 text-primary-100'
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
      </div>
      {error && <span className='text-red-500 text-xs italic'>{error}</span>}
    </div>
  );
};

export default SelectCategory;
