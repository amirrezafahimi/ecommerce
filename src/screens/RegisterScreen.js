import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const RegisterScreen = ({location, history}) => {
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const userRegister = useSelector(state => state.userRegister);
    const {error, loading, userInfo} = userRegister;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(register(name, email, password));
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && (<Message variant="danger">{message}</Message>)}

            {error && (<Message variant="danger">{error}</Message>)}
            {loading && <Loader/>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Name" value={name} required
                                  onChange={(e) => setName(e.target.value.toLowerCase())}>

                    </Form.Control>
                </Form.Group>
                <br/>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} required
                                  onChange={(e) => setEmail(e.target.value.toLowerCase())}>

                    </Form.Control>
                </Form.Group>
                <br/>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password} required
                                  onChange={(e) => setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <br/>

                <Form.Group controlId="passwordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} required
                                  onChange={(e) => setConfirmPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <br/>

                <Button type="submit" variant="primary">Register</Button>

            </Form>

            <Row className="py-3">
                <Col>
                    Have an Account?
                    <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;