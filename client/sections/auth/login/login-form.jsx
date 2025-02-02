"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import useBoolean from "@/hooks/use-boolean";
import { useAuthContext } from "@/hooks/use-auth-context";

import { paths } from "@/utils/constants";

import RHFTextField from "@/react-hook-form/rhf-textfield";
import {
  loginSchema,
  loginDefaultValues,
} from "@/react-hook-form/schema/schema";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { loginWithPassword } from "@/auth/context/jwt/action";

const LoginForm = () => {
  const isSubmitting = useBoolean();
  const [errorMsg, setErrorMsg] = useState("");

  const { checkUserSession } = useAuthContext();
  const router = useRouter();
  const dispatch = useDispatch();

  // react hook form
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  // onsubmit
  const onSubmit = async ({ email, password }) => {
    try {
      isSubmitting.onTrue();
      const isNotVerified = await loginWithPassword({
        email,
        password,
        router,
        dispatch,
      });
      if (isNotVerified) {
        return;
      }
      await checkUserSession?.();
      router.refresh();
    } catch (error) {
      setErrorMsg(error.data.message);
    } finally {
      isSubmitting.onFalse();
    }
  };

  return (
    <Card className="w-[480px]">
      <CardHeader>
        <CardTitle>Login Account</CardTitle>
        <CardDescription className="text-muted-foreground text-xs">
          By logging in, you can start using FlowBoard.
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
            <div className="grid grid-cols-12 py-4 gap-6">
              <div className="col-span-12">
                <RHFTextField name="email" label="Email" placeholder="Email" />
              </div>

              <div className="col-span-12">
                <RHFTextField
                  name="password"
                  label="Password"
                  placeholder="Password"
                  inputTypePass
                />
              </div>
              <div className="col-span-12">
                <span className="text-sm text-muted-foreground">
                  Dont haven&apos;t account?{" "}
                  <Link
                    className="text-blue-400 underline"
                    href={paths.auth.register}
                  >
                    Register
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
              Login
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
