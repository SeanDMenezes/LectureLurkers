import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

// api
import { addNewCourse } from "../../api/courses-api";

// redux
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectUser } from "../../redux/user/user-selector";

import './addCourse.css';

const AddCourse = ({ user, show, onHide }) => {
    const [courseName, setCourseName] = useState("");
    const [error, setError] = useState("");

    const addCourse = async () => {
        let res = await addNewCourse(user._id, courseName);
        if (res) {
            if (!res.error) {
                onHide();
            } else {
                setError(res.error);
            }
        } else {
            setError("Something went wrong")
        }
    }

    return (
        <Modal className="action-panel" show={show} onHide={onHide} size="sm" centered>
            <Modal.Header closeButton>
                <Modal.Title className='modal-title-1'> Add New Course </Modal.Title>
            </Modal.Header>

            <Modal.Body className="action-popup">
                <div>
                    <input
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        placeholder="Enter Course Name"
                    />

                    {error !== "" &&
                        <div className="inlineError m-auto">
                            {error}
                        </div>
                    }

                    <div className="button-row">
                        <Button onClick={addCourse}>
                            Add
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        // <Modal
        //     size="lg"
        //     aria-labelledby="contained-modal-title-vcenter"
        //     centered
        //     show={show}
        //     onHide={onHide}
        //     >
        //     <Modal.Header closeButton>
        //         <Modal.Title id="contained-modal-title-vcenter">
        //         Modal heading
        //         </Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //         <h4>Centered Modal</h4>
        //         <p>
        //         Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        //         dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        //         consectetur ac, vestibulum at eros.
        //         </p>
        //     </Modal.Body>
        //     <Modal.Footer>
        //         <Button onClick={onHide}>Close</Button>
        //     </Modal.Footer>
        // </Modal>
    );
}

const mapState = createStructuredSelector({
    user: selectUser,
})

export default connect(mapState, null)(AddCourse);