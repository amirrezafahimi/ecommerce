import React, {useState} from 'react';
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import {Form, Button} from "react-bootstrap";


const SearchBox = () => {
    const [keyword, setKeyword] = useState("");

    let history = useHistory();

    const submitHandler = (event) => {
        event.preventDefault();

        if (keyword) {
            history.push(`/?keyword=${keyword}`);
        } else {
            history.push(history.push(history.location.pathname))
        }
    };

    return (
        <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control type="text" name="q" className="mr-sm-2 ml-sm-5"
                          onChange={(event) => setKeyword(event.target.value)}>
            </Form.Control>

            <Button type="submit" variant="outline-success" className="p-2">
                Submit
            </Button>
        </Form>
    );
};

export default SearchBox;