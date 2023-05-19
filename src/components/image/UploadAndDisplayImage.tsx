import React, {FC} from "react";

interface UploadAndDisplayImageProps {
    selectedImage: any;
    onChange: (e: any) => void;
    className?: string | undefined;
}


const UploadAndDisplayImage:FC<UploadAndDisplayImageProps> = ({selectedImage, onChange, className}) => {


  return (
    <div>

      {selectedImage && (
        <div>
          <img
            alt="not found"
            src={URL.createObjectURL(selectedImage)}
            className={className + " mx-auto w-9/12 my-3 shadow rounded-lg max-w-full h-auto align-middle border-none"}
          />
          </div>
      )}
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
            Изображение ноутбука</label>
        <input
        type="file"
        name="file"
        onChange={onChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      />
    </div>
  );
};

export default UploadAndDisplayImage;