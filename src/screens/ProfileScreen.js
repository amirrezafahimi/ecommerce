import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails, updateUserProfile} from "../actions/userActions";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";

const ProfileScreen = ({history}) => {
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails;

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user || !user.name || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET});
                dispatch(getUserDetails("profile"));
            } else {
                setName(user.name);
                setEmail(user.email);

            }
        }
    }, [dispatch, history, userInfo, user, success]);

    const submitHandler = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(updateUserProfile({
                "id": user._id,
                "name": name,
                "email": email,
                "password": password
            }));
            setMessage("");
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

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
                        <Form.Control type="password" placeholder="Enter Password" value={password}
                                      onChange={(e) => setPassword(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <br/>

                    <Form.Group controlId="passwordConfirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword}
                                      onChange={(e) => setConfirmPassword(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <br/>
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    );
};

export default ProfileScreen;