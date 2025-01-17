import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import React from "react";

const AuthLogin = () => {
  return (
    <>
      <form>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="Username" value="Username" />
          </div>
          <TextInput
            id="username"
            type="text"
            sizing="md"
            className="form-control"
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
          />
        </div>

        <Button color={"primary"} href="/" as={Link} className="w-full">
          Sign in
        </Button>
      </form>
    </>
  );
};

export default AuthLogin;
