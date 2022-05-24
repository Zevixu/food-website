import Form from "./form";
import Modal from "react-bootstrap/Modal";

function SignUp() {
    return (
        <Modal.Dialog centered={true}>
            <Modal.Header className="mx-auto">
                Sign Up
            </Modal.Header>
          <Form/>
        </Modal.Dialog>
    )
}

export default SignUp;
