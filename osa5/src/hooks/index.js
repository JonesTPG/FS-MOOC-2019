import { useState } from "react";

export const useField = type => {
  const [value, setValue] = useState("");

  const onChange = event => {
    setValue(event.target.value);
  };

  const clear = () => {
    setValue("");
  };

  const inputFieldProps = () => {
    const props = {
      type: type,
      value: value,
      onChange: onChange
    };
    return props;
  };

  return {
    type,
    value,
    onChange,
    clear,
    inputFieldProps
  };
};
