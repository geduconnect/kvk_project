import React from "react";
import { UserForm } from "./UserForm";
import PrivateRoute from "../../routes/PrivateRoute";

export const AddUser = () => {
  return <PrivateRoute roles={["admin"]}>
    <UserForm />
  </PrivateRoute>; // For adding a new user
};
