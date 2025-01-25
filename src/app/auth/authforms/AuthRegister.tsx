import { Button, Label, TextInput } from "flowbite-react";
import React from "react";

const AuthRegister = () => {
  return (
    <>
      <form>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email Address" />
          </div>
          <TextInput
            id="email"
            type="email"
            sizing="md"
            className="form-control"
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
          />
        </div>
        <Button color={"primary"} className="w-full">
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default AuthRegister;
