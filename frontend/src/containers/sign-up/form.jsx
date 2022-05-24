import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { signUpAPI } from '../../client/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { SHOW_ALART } from "../../redux/actionTypes";

function LoginForm() {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const afterSignUp = (res) => {
        if (res.data.success) {
            dispatch({ type: SHOW_ALART, payload: { message: res.data.msg, variant: 'success' } });
            nav('/login');
        }
        else {
            dispatch({ type: SHOW_ALART, payload: { message: res.data.msg, variant: 'danger' } });
        }
    }

    function signUp(event) {
        event.preventDefault();
        const target = event.target;
        if (target.formPassword.value !== target.formConfirmPassword.value) {
            dispatch({ type: SHOW_ALART, payload: { message: 'Two passwords are not consistant.', variant: 'danger' } });
            return;
        }
        const signUpParams = {
            email: target.formEmail.value,
            firstName: target.formFirstName.value,
            lastName: target.formLastName.value,
            password: target.formPassword.value,
            phone: target.formPhone.value,
            address: target.formAddress.value,
        };
        signUpAPI(signUpParams).then(afterSignUp);
    }

    return (
        <Form className='mx-auto' style={{ width: 400 }} onSubmit={signUp}>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control placeholder="Enter first name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control placeholder="Enter last name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control placeholder="Enter phone number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="Enter address" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password*</Form.Label>
                <Form.Control style={{ width: '100%' }} type="password" placeholder="Enter password" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm password*</Form.Label>
                <Form.Control style={{ width: '100%' }} type="password" placeholder="Enter password again" required />
            </Form.Group>
            <div className='col text-center'>
                <Button className="mx-3 mb-3" variant="primary" type="submit">
                    Submit
                </Button>
            </div>
        </Form>
    );
}

export default LoginForm;
