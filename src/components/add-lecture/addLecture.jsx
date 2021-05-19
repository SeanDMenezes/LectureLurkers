import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

// api
import { addNewLecture } from "../../api/lectures-api";

import './addLecture.css';

const AddLecture = ({ courseID, show, onHide }) => {
    const [lectureName, setLectureName] = useState("");
    const [error, setError] = useState("");

    const addLecture = async () => {
        let res = await addNewLecture(courseID, lectureName);
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
                <Modal.Title className='modal-title-1'> Add New Lecture </Modal.Title>
            </Modal.Header>

            <Modal.Body className="action-popup">
                <div>
                    <input
                        value={lectureName}
                        onChange={(e) => setLectureName(e.target.value)}
                        placeholder="Enter Lecture Name"
                    />

                    {error !== "" &&
                        <div className="inlineError m-auto">
                            {error}
                        </div>
                    }

                    <div className="button-row">
                        <Button onClick={addLecture}>
                            Add Lecture
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddLecture;