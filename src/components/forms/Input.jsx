import { useState } from 'react';

const Input = ({ type, label, name, errors, register, isRequired, onKeyDown, defaultValue }) => {
  const [inputValue, setInputValue] = useState(defaultValue || '');

  const handleFocus = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleNumberInput = (e) => {
    const value = e.target.value;
    setInputValue(value.replace(/[^0-9.]/g, ''));
    if (value >= 0.01) {
      setInputValue(value);
    }
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) e.preventDefault();
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <div className='relative mt-8'>
      <div className='border-b-[1px] border-primary-50'>
        <input
          type={type === 'number' ? 'text' : type}
          {...register(name, { required: isRequired })}
          className='w-full bg-transparent py-2 outline-none text-complementary-100'
          autoComplete='off'
          inputMode={type === 'number' ? 'number' : 'text'}
          value={inputValue}
          onInput={type === 'number' ? handleNumberInput : handleFocus}
          onKeyDown={handleKeyDown}
        />
        <label
          className={`absolute left-0 uppercase tracking-wider pointer-events-none transition-all duration-200 ease-linear ${
            inputValue || defaultValue
              ? '-top-5 text-xs text-primary-100'
              : 'text-sm top-2 md:text-base text-primary-50'
          }`}
        >
          {label}
        </label>
      </div>
      {errors[name] && (
        <p className='text-secondary-100 text-xs italic'>
          El campo <span className='lowercase'>{label}</span> es requerido.
        </p>
      )}
    </div>
  );
};

export default Input;
