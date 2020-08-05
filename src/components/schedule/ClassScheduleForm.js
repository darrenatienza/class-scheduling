import React, { useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useAxios from "axios-hooks";

// you can use React.forwardRef to pass the ref too
const Select = React.forwardRef(({ title, label, items = [] }, ref) => (
  <>
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Control name={label} as="select" ref={ref}>
        {items.map(({ id, name }) => {
          return <option key={id}>{name}</option>;
        })}
      </Form.Control>
    </Form.Group>
  </>
));

const ClassScheduleForm = () => {
  const { register, handleSubmit, watch, errors, setValue } = useForm();
  const [
    { data: res, loading: postLoading, error: postError },
    executePost,
  ] = useAxios({ url: "v1/classschedule", method: "POST" }, { manual: true });
  const [
    {
      data: employeeData,
      loading: getEmployeeLoading,
      error: getEmployeeError,
    },
  ] = useAxios({
    url: "v1/employees",
    params: { collection: "dropdown", type: "" },
  });
  const onSubmit = async (data) => {
    try {
      console.log(data);
      await executePost({
        data: {
          employee: data.employee,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card style={{ width: "25rem" }}>
        <Card.Header>Class Schedule Form</Card.Header>
        <Card.Body>
          {getEmployeeError && <p>error</p>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Select
              items={employeeData}
              title="Employee"
              label="employee"
              ref={register}
            />

            <Select title="Room" label="room" ref={register} />
            <Select title="Section" label="section" ref={register} />
            <Select title="Subject" label="subject" ref={register} />
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ClassScheduleForm;
