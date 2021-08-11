import React, {useState} from 'react';
import FormContainer from "../components/FormContainer";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddress} from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = ({history}) => {
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        history.push("/payment");
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Address" value={address ? address : ""}
                                  onChange={(event) => setAddress(event.target.value)} required>

                    </Form.Control>
                </Form.Group>
                <br/>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter City" value={city ? city : ""}
                                  onChange={(event) => setCity(event.target.value)} required>

                    </Form.Control>
                </Form.Group>
                <br/>

                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter Postal Code" value={postalCode ? postalCode : ""}
                                  onChange={(event) => setPostalCode(event.target.value)} required>

                    </Form.Control>
                </Form.Group>
                <br/>

                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Enter Country" value={country ? country : ""}
                                  onChange={(event) => setCountry(event.target.value)} required>

                    </Form.Control>
                </Form.Group>
                <br/>

                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>

        </FormContainer>
    );
};

export default ShippingScreen;