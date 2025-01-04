import Link from "next/link";

import { paths, projectName } from "@/utils/constants";

import { Button } from "@/components/ui/button";
import RegisterDetails from "./register-details";

export const metadata = {
  title: `${projectName} - Register Success`,
};

export default function RegisterSuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="shadow-lg bg-blue-50 rounded-lg p-8 max-w-sm text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Registration Successful!
        </h1>
        <RegisterDetails />
        <p className="text-gray-600 mb-6">
          Your registration is successful. You can now start using our
          Flowboard.
        </p>
        <Button variant="outline">
          <Link href={paths.auth.login}>Login</Link>
        </Button>
      </div>
    </div>
  );
}
