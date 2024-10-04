import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text, TextInput, Group, Button, Center } from "@mantine/core";
import "./Login.scss";
import { useAuth } from "../../routes/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [animate, setAnimate] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mockCred = [{ email: "div@mail.com", password: "password", role: "user" }, { email: "admin@mail.com", password: "password", role: "admin" }];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockCred.find(
      (cred) => cred.email === email && cred.password === password
    );
  
    if (user) {
      setisAuthenticated(true);
      const role = email === 'admin@mail.com' ? 'admin' : 'user';
      login(role); 
      navigate("/home");
    } else {
      console.log("Invalid credentials");
    }

  };

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="login-container">
      <div className={`left-side ${animate ? "animate-left" : ""}`}>
        <Text className="brand-text-left">Script</Text>
      </div>
      <div className={`right-side ${animate ? "animate-right" : ""}`}>
        <Text className="brand-text-right">Assist</Text>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="Your email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          <TextInput
            label="Password"
            placeholder="Your password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <Group align="center">
            <Button type="submit">Login</Button>
          </Group>
        </form>
      </div>
    </div>
  );
};

export default Login;
