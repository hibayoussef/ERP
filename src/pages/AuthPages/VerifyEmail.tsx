import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVerifyEmail } from "../../hooks/useLogin";

export default function VerifyEmail() {
  const { token } = useParams();
  const { mutate, isPending, isSuccess, isError } = useVerifyEmail();

  useEffect(() => {
    if (token) {
      mutate(token);
    }
  }, [token, mutate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg text-center w-96">
        {isPending && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-700">Verifying your email...</p>
          </>
        )}
        {isSuccess && (
          <>
            <h2 className="text-green-600 text-xl font-semibold">Success!</h2>
            <p className="text-gray-700">Your email has been verified.</p>
            <p className="text-gray-500 text-sm">Redirecting to login...</p>
          </>
        )}
        {isError && (
          <>
            <h2 className="text-red-600 text-xl font-semibold">
              Verification Failed
            </h2>
            <p className="text-gray-700">Invalid or expired token.</p>
          </>
        )}
      </div>
    </div>
  );
}
