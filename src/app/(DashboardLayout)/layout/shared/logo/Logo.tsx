"use client";
import React from "react";
import Image from "next/image";
import LogoIcon from "/public/pt-rachita.png";
import Link from "next/link";
const Logo = () => {
  return (
    <Link href={"/"}>
      <Image width={80} src={LogoIcon} alt="logo" />
    </Link>
  );
};

export default Logo;
