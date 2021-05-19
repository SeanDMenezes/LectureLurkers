import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

// api
import { joinNewCourse } from "../../api/user-api";

// redux
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectUser } from "../../redux/user/user-selector";

import './joinCourse.css';

const JoinCourse = ({ user, show, onHide }) => {
    const [joinID, setJoinID] = useState("");
    const [error, setError] = useState("");

    const joinCourse = async () => {
        let res = await joinNewCourse(user._id, joinID);
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
                <Modal.Title className='modal-title-1'> Join New Course </Modal.Title>
            </Modal.Header>

            <Modal.Body className="action-popup">
                <div>
                    <input
                        value={joinID}
                        onChange={(e) => setJoinID(e.target.value)}
                        placeholder="Enter Course ID"
                    />

                    {error !== "" &&
                        <div className="inlineError m-auto">
                            {error}
                        </div>
                    }

                    <div className="button-row">
                        <Button onClick={joinCourse}>
                            Join
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const mapState = createStructuredSelector({
    user: selectUser,
})

export default connect(mapState, null)(JoinCourse);