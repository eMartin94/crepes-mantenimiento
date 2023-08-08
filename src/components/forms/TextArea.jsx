import { useState } from 'react';

const TextArea = ({ name, label, register, errors, isRequired }) => {
  const [inputValue, setInputValue] = useState('');

  const handleFocus = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <div className='relative border-b-[1px] border-primary-50 mt-4 '>
      <textarea
        {...register(name, { required: isRequired })}
        className='w-full bg-transparent py-2 outline-none resize-none text-complementary-100'
        autoComplete='off'
        rows={3}
        value={inputValue}
        onChange={handleFocus}
      />
      <p
        className={`absolute left-0 uppercase tracking-wider pointer-events-none transition-all duration-200 ease-linear ${
          inputValue
            ? '-top-2 text-xs bg-primary-10 text-primary-100'
            : 'text-sm top-2 md:text-base  text-primary-50'
        }`}
      >
        {label}
      </p>
      {errors[name] && <p className='text-secondary-100 text-xs italic'>{label} es requerido</p>}
    </div>
  );
};

export default TextArea;
