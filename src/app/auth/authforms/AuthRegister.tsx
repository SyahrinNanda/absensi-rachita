"use client";
import type React from "react";
import { useEffect, useState } from "react";
import {
  FirebaseAuth,
  SignUp,
  sendVerificationEmail,
  onAuthStateChange,
  verifyEmail,
} from "@/app/lib/firebase";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AuthRegister = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [verificationSent, setVerificationSent] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user && user.emailVerified) {
        router.push("/admin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      setLoading(false);
      return;
    }

    try {
      await SignUp(email, password);
      setVerificationSent(true);
      setCooldown(60);
    } catch (err: any) {
      if (err.message.includes("auth/email-already-in-use")) {
        setError(
          "An account with this email already exists. Please try Sign in."
        );
      } else if (err.message.includes("auth/weak-password")) {
        setError("Password must be at least 6 characters long.");
      } else if (err.message.includes("auth/invalid-email")) {
        setError("The email address is not valid. Please enter a valid email.");
      } else {
        setError("Failed to create an account. Please try again later.");
      }
      console.error(err);
    }

    setLoading(false);
  };

  const handleResendVerification = async () => {
    if (cooldown > 0) return;
    try {
      const user = FirebaseAuth.currentUser;
      if (user) {
        await sendVerificationEmail(user);
        setVerificationSent(true);
        setCooldown(60);
      } else {
        setError("No user found. Please try signing up again.");
      }
    } catch (err: any) {
      setError("Failed to resend verification email. Please try again later.");
      console.error(err);
    }
  };

  if (verificationSent) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="mb-4">
          We&apos;ve sent a verification email to {email}. Please check your
          inbox and click the verification link to complete your registration.
        </p>
        <Button
          onClick={handleResendVerification}
          color="primary"
          disabled={cooldown > 0}
        >
          {cooldown > 0
            ? `Resend in ${cooldown}s`
            : "Resend Verification Email"}
        </Button>
      </div>
    );
  }

  return (
    <>
      <h3 className="mx-auto text-2xl font-bold my-3">Sign Up</h3>
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
        <div className="mb-6">
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
        <div className="mb-6">
          <div className="mb-2 block">
            <Label htmlFor="confirmPwd" value="Confirm Password" />
          </div>
          <TextInput
            id="confirmPwd"
            type="password"
            sizing="md"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          color="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
      <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-center">
        <p>Already have an Account?</p>
        <Link href="/auth/login" className="text-primary text-sm font-medium">
          Sign in
        </Link>
      </div>
    </>
  );
};

export default AuthRegister;
