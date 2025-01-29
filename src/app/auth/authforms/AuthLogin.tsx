"use client";

import { Button, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChange, SignIn } from "@/app/lib/firebase";

const AuthLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user && user.emailVerified) {
        router.push("/admin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Melakukan sign in
      const user = await SignIn(email, password);

      // Cek apakah email pengguna sudah diverifikasi
      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        return;
      }
      // Redirect to admin page after successful login
      router.push("/admin");
    } catch (err: any) {
      if (
        err.message.includes("auth/user-not-found") ||
        err.message.includes("auth/wrong-password")
      ) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email Address" />
          </div>
          <TextInput
            id="email"
            type="email"
            sizing="md"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="userpwd" value="Password" />
          </div>
          <TextInput
            id="userpwd"
            type="password"
            sizing="md"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          color={"primary"}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
      <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-center">
        <p>Don&apos;t have an Account?</p>
        <Link
          href={"/auth/register"}
          className="text-primary text-sm font-medium"
        >
          Sign up
        </Link>
      </div>
    </>
  );
};

export default AuthLogin;
