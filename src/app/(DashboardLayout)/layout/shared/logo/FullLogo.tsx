"use client";
import React from "react";
import Image from "next/image";
import Logo from "/public/pt-rachita.png";
import Link from "next/link";
const FullLogo = () => {
  return (
    <Link href={"/"}>
      <Image
        src={Logo}
        width={90}
        alt="logo"
        className="block dark:hidden rtl:scale-x-[-1] mx-auto"
      />
    </Link>
  );
};

export default FullLogo;
