import { useState } from "react";

const useBoolean = ({ defaultValue = false } = {}) => {
  const [value, setValue] = useState(defaultValue);

  const onTrue = () => {
    setValue(true);
  };
  const onFalse = () => {
    setValue(false);
  };

  const onToggle = () => {
    setValue((prev) => !prev);
  };

  return {
    value,
    onFalse,
    onTrue,
    onToggle,
  };
};

export default useBoolean;
