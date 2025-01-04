import { useFormContext } from "react-hook-form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
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

const RHFOTP = ({ name, label, OTPlength, placeholder, ...other }) => {
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
            <InputOTP
              onKeyPress={(e) => {
                // Prevent non-numeric input
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                  alert("Only Numbers allowed");
                }
              }}
              maxLength={OTPlength}
              {...field}
            >
              <InputOTPGroup>
                {[...Array(OTPlength)].map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormDescription>
            Please enter the one-time password sent to your Email.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RHFOTP;
