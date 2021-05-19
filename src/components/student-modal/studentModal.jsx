import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

// api
import { getCourseUsers } from "../../api/courses-api";

const StudentModal = ({ courseID, show, onHide }) => {
    const [error, setError] = useState("");
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = async () => {
        let res = await getCourseUsers(courseID);
        if (res) {
            if (!res.error) {
                setStudents(res);
            } else {
                setError(res.error);
            }
        } else {
            setError("Something went wrong");
        }
    }

    return (
        <Modal className="action-panel" show={show} onHide={onHide} size="sm" centered>
            <Modal.Header closeButton>
                <Modal.Title className='modal-title-1'> Student List </Modal.Title>
            </Modal.Header>

            <Modal.Body className="action-popup">
                <div>
                    {error !== "" &&
                        <div className="inlineError m-auto">
                            {error}
                        </div>
                    }
                    {students.map(student => {
                        return <div> {student.username} </div>
                    })}
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default StudentModal;