"use client";
import React, { useEffect } from "react";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import Header from "./layout/vertical/header/Header";
import { onAuthStateChange } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (!user) {
        // Jika pengguna belum login, arahkan ke halaman login
        router.push("/auth/login");
      } else if (user.emailVerified) {
        // Jika pengguna sudah login dan emailnya terverifikasi, lanjut ke halaman admin
        router.push("/admin");
      }
    });

    return () => unsubscribe();
  }, [router]);
  return (
    <div className="flex w-full min-h-screen">
      <div className="page-wrapper flex w-full">
        {/* Header/sidebar */}
        <Sidebar />
        <div className="body-wrapper w-full bg-lightgray dark:bg-dark">
          <Header />
          {/* Body Content  */}
          <div className={`container mx-auto  py-30`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
