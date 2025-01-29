"use client";

import { Button, Dropdown } from "flowbite-react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignOut } from "@/app/lib/firebase";

const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await SignOut();
      // Redirect to home page or login page after successful sign out
      router.push("/auth/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
      // Optionally, you can show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative group/menu">
      <Dropdown
        label=""
        className="rounded-sm w-44"
        dismissOnClick={false}
        renderTrigger={() => (
          <span className="h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
            <Image
              src="/images/profile/user-1.jpg"
              alt="logo"
              height="35"
              width="35"
              className="rounded-full"
            />
          </span>
        )}
      >
        <Dropdown.Item
          as={Link}
          href="#"
          className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark"
        >
          <Icon icon="solar:user-circle-outline" height={20} />
          My Profile
        </Dropdown.Item>
        <div className="p-3 pt-0">
          <Button
            onClick={handleSignOut}
            disabled={isLoading}
            // as={Link}
            size={"sm"}
            href="/auth/login"
            className="mt-2 border border-primary text-primary bg-transparent hover:bg-lightprimary outline-none focus:outline-none"
          >
            {isLoading ? "Signing Out..." : "Sign Out"}
          </Button>
        </div>
      </Dropdown>
    </div>
  );
};

export default Profile;
