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

const RHFTextField = ({ name, label, placeholder, ...other }) => {
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
            <Input placeholder={placeholder} {...field} {...other} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RHFTextField;
