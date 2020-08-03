import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import { Card, Form, Button } from "react-bootstrap";
import { useAuth } from "../../entities";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
const Login = () => {
  const [
    { data: token, loading: postLoading, error: postError },
    executePost,
  ] = useAxios(
    {
      url: "/v2/auths",
      method: "POST",
    },
    { manual: true }
  );
  const { register, handleSubmit, watch, errors, setValue } = useForm();

  const [auth, { authenticate }] = useAuth();
  let history = useHistory();
  const onSubmit = async (data) => {
    try {
      await executePost({
        data: {
          userName: data.userName,
          password: data.password,
        },
      });
      localStorage.setItem("auth-token", token);
      history.push("/dashboard");
    } catch (err) {
      setValue("password", "");
      console.log(err);
    }
  };

  return (
    <>
      <Card style={{ width: "20rem" }}>
        <Card.Header>Login - Scheduling System</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                name="userName"
                type="text"
                placeholder="Enter User Name"
                ref={register({ required: true, maxLength: 10 })}
              />
            </Form.Group>
            {errors.userName && <p>This field is required</p>}
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                ref={register({ required: true, maxLength: 20 })}
              />
            </Form.Group>
            {errors.password && <p>This field is required</p>}
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

export default Login;
