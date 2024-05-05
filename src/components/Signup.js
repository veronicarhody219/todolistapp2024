import React, {useState} from "react";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3001/signup", {
        email,
        password,
      });
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <>
      <h2>Sign up</h2>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="email"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="password"
      />
      <button onClick={handleSignup}>Sign up</button>
    </>
  );
}
