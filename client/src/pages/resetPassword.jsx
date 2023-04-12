import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     setMessage("Passwords do not match");
  //     return;
  //   }
  //   const response = await axios.post("/ResetPassword", {
  //     token,
  //     password,
  //   });
  //   if (response.status === 200) {
  //     setMessage("Password reset successful");
  //   } else {
  //     setMessage("Password reset failed");
  //   }
  // };

  const handleSubmit = () => {
    console.log("Hello");
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Reset Password</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}

export default ResetPassword;
