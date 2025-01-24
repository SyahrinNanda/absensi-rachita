import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import AuthLogin from "../authforms/AuthLogin";
export const metadata: Metadata = {
  title: "Boxed Login Authentication",
  description: "Generated by create next app",
};
const BoxedLogin = () => {
  return (
    <>
      <div className="relative overflow-hidden h-screen bg-muted dark:bg-dark">
        <div className="flex h-full justify-center items-center px-4">
          <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words md:w-[450px] border-none ">
            <div className="flex h-full flex-col justify-center gap-2 p-0 w-full">
              <div className="mx-auto">
                <Logo />
              </div>
              <AuthLogin />
              <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-center">
                <p>Don&apos;t have an Account?</p>
                <Link
                  href={"/auth/register"}
                  className="text-primary text-sm font-medium"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoxedLogin;
