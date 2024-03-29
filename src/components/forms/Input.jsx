import { useState } from 'react';

const Input = ({
  type,
  label,
  name,
  errors,
  register,
  isRequired,
  onKeyDown,
  defaultValue,
  setValue,
  className,
  disabled,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue || '');

  const handleFocus = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setValue(name, value);
  };

  const handleNumberInput = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^0-9.]/g, '');
    setInputValue(formattedValue);
    setValue(name, formattedValue);
    if (formattedValue >= 0.01) {
      setInputValue(formattedValue);
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
          className={`w-full bg-transparent py-1 outline-none text-complementary-100 ${className}`}
          autoComplete='off'
          inputMode={type === 'number' ? 'number' : 'text'}
          // value={inputValue}
          onInput={type === 'number' ? handleNumberInput : handleFocus}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <label
          className={`absolute left-0 uppercase tracking-wider pointer-events-none transition-all duration-200 ease-linear ${
            inputValue || defaultValue
              ? '-top-4 text-xs text-primary-100'
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
