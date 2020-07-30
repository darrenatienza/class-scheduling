import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useAuth } from "../../entities";
import "./index.css";

const Index = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [auth, { authenticate }] = useAuth();

  const handleSubmit = (event) => {
    authenticate("asdf", "asdf");

    event.preventDefault();
  };

  return (
    <>
      {!auth.isValid && (
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
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" style={{ width: "100%" }} type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Index;
