"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

import { paths } from "@/utils/constants";

import RHFOTP from "@/react-hook-form/rhf-otp";
import { sendOTP, setUser, verifyOTP } from "@/redux/slices/sign-up-slice";
import { otpDefaultValues, otpSchema } from "@/react-hook-form/schema/schema";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useBoolean from "@/hooks/use-boolean";

const LoginVerify = () => {
  const isSubmitting = useBoolean();
  const [timer, setTimer] = useState(180);
  const { user, error } = useSelector((state) => state.signUp);

  const router = useRouter();
  const dispatch = useDispatch();

  // react hook form
  const form = useForm({
    defaultValues: otpDefaultValues,
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data) => {
    try {
      isSubmitting.onTrue();
      await dispatch(verifyOTP({ email: user.email, otp: Number(data.otp) }));
      toast.success("OTP Verified Successfully");
      router.push(paths.auth.login);
      dispatch(setUser(null));
    } catch (err) {
      toast.error("Unable to Verify OTP");
    } finally {
      isSubmitting.onFalse();
    }
  };

  // start of timer for 3 mins
  function startTimer() {
    const timerID = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearTimeout(timerID);
          return 180;
        }
        return prev - 1;
      });
    }, 1000);
    if (timerID && timer !== 180) {
      console.log(timerID);
      clearTimeout(timerID);
      setTimer(180);
    }
  }

  const handleResendOTP = async () => {
    try {
      await dispatch(sendOTP({ email: user.email }));
      toast.success("OTP Re Sent Successfully");
      startTimer?.();
    } catch (err) {
      toast.error("Unable to send OTP");
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(sendOTP({ email: user.email }));
      toast.success("OTP Sent Successfully");
    } else {
      router.replace(paths.auth.login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Card className="w-96 p-5">
        <CardHeader>
          <CardTitle>OTP Verification</CardTitle>
          <CardDescription className="text-muted-foreground text-xs ">
            We have emailed a 6-digit confirmation code to{" "}
            {user?.email?.replace(/^(.{4}).*@/, "$1****@")}, please enter the
            code in below box to verify your email.
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid grid-cols-12  gap-4">
                <div className="col-span-12">
                  <RHFOTP name="otp" OTPlength={6} label="One-Time Password" />
                </div>
                <div className="col-span-12">
                  <span className="text-sm text-muted-foreground">
                    Didn&apos;t receive the code?
                    <Button
                      onClick={handleResendOTP}
                      disabled={timer !== 180}
                      className="text-blue-400"
                      variant="link"
                      type="button"
                    >
                      Resend
                    </Button>
                    {timer !== 180 && (
                      <span className="text-red-400">{`${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${timer % 60}`}</span>
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={isSubmitting.value}
                className="w-full"
                type="submit"
              >
                Verify
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default LoginVerify;
