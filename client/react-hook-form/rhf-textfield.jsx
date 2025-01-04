import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import RequiredComponent from "./required-comp";
import { PasswordInput } from "@/components/ui/password-input";

const RHFTextField = ({
  name,
  label,
  placeholder,
  inputTypePass,
  ...other
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <RequiredComponent label={label} />
          </FormLabel>
          <FormControl>
            {inputTypePass ? (
              <PasswordInput placeholder={placeholder} {...field} {...other} />
            ) : (
              <Input placeholder={placeholder} {...field} {...other} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RHFTextField;
