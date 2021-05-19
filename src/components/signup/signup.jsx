import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Teacher from "../classlist/classlist";
import { Formik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";

// API
import { signup } from "../../api/user-api";

// Redux
import { connect } from "react-redux";
import { setUser } from "../../redux/user/user-actions";

import "./signup.css"

const Signup = ({ setUser }) => {
    let history = useHistory();

    const [error, setError] = useState("");

    const validate = (values) => {
        let errors = {};

        if (values.username === "") {
            errors.username = "Please enter a username";
        }
        if (values.password === "") {
            errors.password = "Please enter a password";
        }
        if (values.role === "") {
            errors.role = "Please select a role";
        }

        return errors;
    }

    const onSubmit = async (values) => {
        let { username, password, role } = values;
        let res = await signup(username, password, role);
        if (res) {
            if (!res.error) {
                setUser(res);
                history.push("/classlist");
            } else {
                setError(res.error);
            }
        } else {
            setError("Something went wrong");
        }
    }
  
    return (
        <div className="formContainer">
            <h1 className="header">Welcome to Lecture Lurkers!</h1>
            <br />
            <div className="formTitle ml-2"> Signup </div>

            {error !== "" &&
                <div className="inlineError m-auto">
                    {error}
                </div>
            }

            <Formik
                validate={validate}
                onSubmit={async (values, { setSubmitting }) => {
                    await onSubmit(values);
                    setSubmitting(false); 
                }}
                initialValues={{
                    username: "",
                    password: "",
                    role: ""
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                    values,
                    touched,
                    errors,
                }) => (
                <Form onSubmit={handleSubmit} className="mt-4">
                    <Form.Group className="mt-4">
                        <Form.Control
                            name="username"
                            className="form-control formCustomControl shadow-none m-auto"
                            type="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.username && errors.username}
                            placeholder="Enter username"
                        />
                        <Form.Control.Feedback type="invalid" className="inlineError errorMessage">{errors.username}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mt-4">
                        <Form.Control
                            name="password"
                            className="form-control formCustomControl shadow-none m-auto"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.password && errors.password}
                            placeholder="Enter password"
                        />
                        <Form.Control.Feedback type="invalid" className="inlineError errorMessage">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mt-4">
                        <Form.Control
                            name="role"
                            as="select"
                            className="form-control formCustomControl shadow-none m-auto"
                            value={values.role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.role && errors.role}
                            placeholder="Select a role"
                        >
                            <option value=""> Select a role </option>
                            <option value="student"> Student </option>
                            <option value="teacher"> Teacher </option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mt-4">
                        <div className="submitButtonContainer">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="submitButton btn-primary btn-block shadow-none blueButton"
                            >
                                Signup
                            </button>
                        </div>
                    </Form.Group>
                </Form>
                )}
            </Formik>

            <NavLink to="/login">
                Already have an account? Login
            </NavLink>

            <br />
        </div>
    )
}

//redux
const mapDispatch = dispatch => ({
    setUser: user => dispatch(setUser(user)),
})

export default connect(null, mapDispatch)(Signup);
