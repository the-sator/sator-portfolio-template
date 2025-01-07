"use client";
import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { InputWithLabel } from "../input-label";
import { toast } from "@/hooks/use-toast";
import { ZodFormattedError } from "zod";
import SubmitButton from "../button/submit-button";
import { SiteUserLogin } from "@/types/site-user.type";
import { siteUserLoginAction } from "@/action/auth.action";
type Props = {
  isAdmin: boolean;
};
export default function LoginForm({ isAdmin }: Props) {
  const [errors, setErrors] = useState<ZodFormattedError<SiteUserLogin> | null>(
    null,
  );

  const formRef = useRef<HTMLFormElement>(null);

  async function siteUserLogin(formData: FormData) {
    const data = {
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      otp: Number(formData.get("otp")),
    };
    const response = await siteUserLoginAction(data);
    if (response?.error) {
      //IF is http error then show toast
      if ("statusCode" in response.error) {
        toast({
          title: "Login Error",
          description: response.error.error,
          variant: "destructive",
          duration: 1500,
        });
      } else {
        //ELSE set Zod error to input
        setErrors(response.error);
      }
      return;
    }

    formRef.current?.reset();
    toast({
      title: "Login Successful",
      variant: "success",
      duration: 1500,
    });
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form reset behavior
    const formData = new FormData(e.currentTarget);
    await siteUserLogin(formData);
  };

  return (
    <Card className="min-w-[400px] p-2">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        {isAdmin && <CardDescription>Login to admin dashboard</CardDescription>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputWithLabel
            label="Username"
            name="username"
            placeholder="test"
            // defaultValue="test"
            errors={errors?.username}
          />
          <InputWithLabel
            label="Email"
            name="email"
            placeholder="admin@test.com"
            defaultValue="admin@test.com"
            errors={errors?.email}
          />
          <InputWithLabel
            label="Password"
            name="password"
            placeholder="*******"
            type="password"
            errors={errors?.password}
          />
          <InputWithLabel
            label="OTP"
            name="otp"
            type="text"
            maxLength={6}
            placeholder="666666"
            errors={errors?.otp}
          />
          <SubmitButton label="Login" className="mt-6" />
        </form>
      </CardContent>
    </Card>
  );
}
