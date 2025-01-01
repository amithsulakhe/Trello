"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthContext } from "@/hooks/use-auth-context";

import RHFTextField from "@/react-hook-form/rhf-textfield";
import {
  loginDefaultValues,
  loginSchema,
} from "@/react-hook-form/schema/schema";

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

import { loginWithPassword } from "@/auth/context/jwt/action";

const LoginForm = () => {
  const { checkUserSession } = useAuthContext();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const onSubmit = async ({ email, password }) => {
    try {
      await loginWithPassword({ email, password });
      await checkUserSession?.();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Login Account</CardTitle>
        <CardDescription className="text-muted-foreground text-xs">
          By logging in, you can start using FlowBoard.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <RHFTextField name="email" label="Email" placeholder="Email" />
              </div>
              <div className="col-span-12">
                <RHFTextField
                  name="password"
                  label="Password"
                  placeholder="Password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Login
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
