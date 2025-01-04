"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { paths } from "@/utils/constants";

import { setUser } from "@/redux/slices/sign-up-slice";
import RHFTextField from "@/react-hook-form/rhf-textfield";
import {
  registerDefaultValues,
  registerSchema,
} from "@/react-hook-form/schema/schema";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { registerWithPassword } from "@/auth/context/jwt/action";
import useBoolean from "@/hooks/use-boolean";

const RegisterForm = () => {
  const isSubmitting = useBoolean();
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();

  const router = useRouter();

  const form = useForm({
    defaultValues: registerDefaultValues,
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      isSubmitting.onTrue();

      const response = await registerWithPassword({
        ...data,
        isverified: false,
      });

      dispatch(setUser(response.data.data.data));
      router.push(paths.auth.registerSuccess);
    } catch (error) {
      setErrorMsg(error?.data?.message || "Something went wrong");
    } finally {
      isSubmitting.onFalse();
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription className="text-muted-foreground text-xs">
          By creating Account You will Register into FlowBorad.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            {errorMsg && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            )}
            <div className="grid py-4 grid-cols-12 gap-4">
              <div className="col-span-12">
                <RHFTextField
                  name="firstName"
                  label="First Name"
                  placeholder="First Name"
                />
              </div>
              <div className="col-span-12">
                <RHFTextField
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                />
              </div>
              <div className="col-span-12">
                <RHFTextField name="email" label="Email" placeholder="Email" />
              </div>
              <div className="col-span-12">
                <RHFTextField
                  name="password"
                  label="Password"
                  inputTypePass
                  placeholder="Password"
                />
              </div>
              <div className="col-span-12">
                <RHFTextField
                  name="confirmPassword"
                  inputTypePass
                  label="Confirm Password"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="col-span-12">
                <span className="text-sm text-muted-foreground">
                  Dont have an account?{" "}
                  <Link
                    className="text-blue-400 underline"
                    href={paths.auth.login}
                  >
                    Login
                  </Link>
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
              Create Account
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default RegisterForm;
