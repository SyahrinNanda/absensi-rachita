import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import React from "react";
import type { Metadata } from "next";
import AuthRegister from "../authforms/AuthRegister";
export const metadata: Metadata = {
  title: "Boxed Register Authentication",
  description: "Generated by create next app",
};

const BoxedRegister = () => {
  return (
    <>
      <div className="relative overflow-hidden h-screen bg-muted dark:bg-dark">
        <div className="flex h-full justify-center items-center px-4">
          <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative break-words md:w-[450px] w-full border-none ">
            <div className="flex h-full flex-col justify-center gap-2 p-0 w-full">
              <div className="mx-auto">
                <Logo />
              </div>
              <AuthRegister />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoxedRegister;
