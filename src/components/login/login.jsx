import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Teacher from "../classlist/classlist";
import { Formik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";

// API
import { login } from "../../api/user-api";

// Redux
import { connect } from "react-redux";
import { setUser, resetUser } from "../../redux/user/user-actions";

import "./login.css"

const Login = ({ setUser, logout }) => {
    let history = useHistory();
    const [error, setError] = useState("");

    useEffect(() => {
        logout();
    }, []);

    const validate = (values) => {
        let errors = {};

        if (values.username === "") {
            errors.username = "Please enter a username"
        }
        if (values.password === "") {
            errors.password = "Please enter a password"
        }

        return errors;
    }

    const onSubmit = async (values) => {
        let { username, password } = values;

        let res = await login(username, password);
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
            <div className="formTitle ml-2"> Login </div>
            {error !== "" &&
                <div className="inlineError errorMessage text-center">
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
                        <div className="submitButtonContainer">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="submitButton btn-primary btn-block shadow-none blueButton"
                            >
                                Login
                            </button>
                        </div>
                    </Form.Group>
                </Form>
                )}
            </Formik>

            <NavLink to="/signup">
                Don't have an account? Sign up
            </NavLink>

            <br />
        </div>
    )
}

//redux
const mapDispatch = dispatch => ({
    setUser: user => dispatch(setUser(user)),
    logout: () => dispatch(resetUser()),
})

export default connect(null, mapDispatch)(Login);
