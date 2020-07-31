import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import { Card, Form, Button } from "react-bootstrap";
import { useAuth } from "../../entities";
import "./login.css";

const Index = () => {
  const [
    { data: postData, loading: postLoading, error: postError },
    executePost,
  ] = useAxios(
    {
      url: "http://localhost:39048/api/v2/auths",
      method: "POST",
    },
    { manual: true }
  );
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [auth, { authenticate }] = useAuth();

  const handleSubmit = (event) => {
    executePost({
      data: {
        userName: userName,
        password: password,
      },
    });
    console.log("afds");
    event.preventDefault();
  };
  useEffect(() => {
    if (postData != "") {
      localStorage.setItem("auth-token", postData);
    }
    return () => {
      //cleanup
    };
  }, [postData]);
  return (
    <>
      <Card style={{ width: "20rem" }}>
        <Card.Header>Login - Scheduling System</Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {postLoading && <Form.Label>Loading...</Form.Label>}
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" style={{ width: "100%" }} type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Index;