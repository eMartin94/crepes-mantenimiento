import { useEffect, useState } from 'react';

const InputFile = ({
  label,
  name,
  register,
  errors,
  isRequired,
  multiple,
  accept,
  preview,
  defaultValue,
}) => {
  const [filePreviews, setFilePreviews] = useState([]);

  useEffect(() => {
    if (defaultValue) {
      setFilePreviews([defaultValue]);
    }
  }, [defaultValue]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const previews = Array.from(files).map((file) => URL.createObjectURL(file));
      setFilePreviews(previews);
    } else {
      setFilePreviews(defaultValue ? [defaultValue] : []);
    }
  };

  const renderFilePreviews = () => {
    if (preview && filePreviews.length > 0) {
      return (
        <div className='mt-8 flex flex-wrap'>
          {filePreviews.map((preview, index) => (
            <div
              key={index}
              className='relative rounded shadow m-2'
              style={{ maxWidth: '300px', maxHeight: '300px' }}
            >
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className='w-full h-full object-contain'
              />
              <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
                <span className='text-white'>Vista previa {index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className='mt-4'>
      <div className='relative'>
        <label className='block text-primary-100 text-sm mb-2 uppercase'>{label}</label>
        <div className='flex items-center'>
          <label
            htmlFor={`input-file-${name}`}
            className='px-4 py-2 bg-primary-100 text-white rounded cursor-pointer transition duration-300 ease-in-out hover:bg-primary-200'
          >
            Elegir archivo
          </label>
          <input
            type='file'
            id={`input-file-${name}`}
            {...register(name, { required: isRequired && filePreviews.length === 0 })}
            className='sr-only'
            onChange={handleFileChange}
            multiple={multiple}
            accept={accept}
          />
        </div>
      </div>
      {errors[name] && (
        <p className='text-secondary-100 text-xs italic mt-1'>
          {isRequired && !defaultValue
            ? `The ${label} field is required.`
            : `There was a problem with the selected image.`}
        </p>
      )}
      {renderFilePreviews()}
    </div>
  );
};

export default InputFile;
