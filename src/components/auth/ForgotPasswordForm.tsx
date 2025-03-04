import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useForgotPassword } from "../../hooks/useLogin";
import ResetPasswordModal from "./ResetPasswordModal";
import Loader from "../ui/loader/loader";

interface IForgotPassword {
  email: string;
}

// Validation schema using Yup
const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPassword>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const { mutate, isPending } = useForgotPassword();

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const onSubmit: SubmitHandler<IForgotPassword> = (data) => {
    mutate(data.email, {
      onSuccess: () => {
        setIsModalOpen(true); // Open the modal on success
      },
    });
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8 text-center">
            <h2 className="mb-2 font-semibold text-gray-800  text-title-sm dark:text-white/90 sm:text-title-sm md:text-md">
              Confirm your email address!
            </h2>
            <p className="text-sm text-gray-500  dark:text-gray-400">
              To enhance security and complete your login process,
            </p>
            <p className="text-sm text-gray-500  dark:text-gray-400">
              please verify your email address.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <Label>
                  Email Address <span className="text-error-500">*</span>
                </Label>
                <Input placeholder="example@gmail.com" {...register("email")} />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Button
                  className="w-full bg-[#575db1] hover:bg-[#3bb89a] text-white"
                  size="sm"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? <Loader /> : "Send Reset Link"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Render the modal */}
      {isModalOpen && (
        <ResetPasswordModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
