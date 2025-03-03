import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { _axios } from "../interceptor/http-config";
import { useSignInValidation } from "../pages/AuthPages/validations/useAuthValidation";
import { _AuthApi } from "../services/auth.service";
import { useAuthStore } from "../store/useAuthStore";
import type { ILoginRequest } from "../types/auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      return _axios.post("/auth/register", data).then((res) => res.data);
    },
  });
};


export const useLogin = () => {
  const { signInSchema } = useSignInValidation();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const { register, handleSubmit, formState } = useForm<ILoginRequest>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors } = formState;

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (input: ILoginRequest) => {
      const res = await _AuthApi.login(input);
      return res;
    },
    onSuccess: (data: any) => {
      login(data?.user, data.token);
      navigate("/");
    },
    onError: (error) => {
      console.error("Error logging in:", error);
    },
  });

  const onSubmit: SubmitHandler<ILoginRequest> = (input) => {
    mutate(input);
  };

  return {
    errors,
    isPending,
    error,
    onSubmit,
    register,
    handleSubmit,
  };
};

export const useVerifyEmail = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (token: string) => {
      return _AuthApi.verifyEmail(token);
    },
    onSuccess: () => {
      setTimeout(() => navigate("/signin"), 11000);
    },
    onError: (error) => {
      console.error("Email verification failed:", error);
    },
  });
};