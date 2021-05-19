import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import JoinCourse from "../join-course/joinCourse";

// API
import { getUserCourses } from "../../api/user-api";

// redux
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectUser } from "../../redux/user/user-selector";
import { setLecture, resetLecture } from "../../redux/lecture/lecture-actions";

import "./student.css"
import { Link, useHistory } from "react-router-dom";

const Student = ({ user, setLecture, resetLecture }) => {
    let history = useHistory();

    const [courses, setCourses] = useState([]);
    const [showCourseModal, setShowCourseModal] = useState(false);

    useEffect(() => {
        getCourses();
    }, [showCourseModal]);

    useEffect(() => {
        resetLecture();
        getCourses();
    }, [user]);

    const getCourses = async () => {
        let res = await getUserCourses(user._id);
        if (res) {
            if (!res.error) {
                setCourses(res);
            } else {
                console.log(res.error);
            }
        } else {
            console.log("Something went wrong")
        }
    };

    const onSessionJoin = (lecture, course) => {
        setLecture(lecture._id, course._id);
        history.push(`./lecture/${course.courseName}/${lecture.lectureName}`);
    }

    const onSessionView = (lecture, course) => {
        setLecture(lecture._id, course._id);
        history.push(`./lecture/${course.courseName}/${lecture.lectureName}/view`)
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ textAlign: "center" }}>{`Welcome ${user.username}`}</h1>
            <Link red to="./login"> Logout </Link>
            <br />

            {showCourseModal && <JoinCourse show={showCourseModal} onHide={() => setShowCourseModal(false)} />}

            <Accordion>
                {(courses && courses.length) ? courses.map((course, idx) => {
                    return (
                        <Card>
                            <Card.Header className="courseHeader">
                                <Accordion.Toggle
                                    className="button"
                                    as={Button}
                                    variant="primary"
                                    eventKey={idx + 1}
                                >
                                    {course.courseName}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={idx + 1}>
                                <div className="lectureContainer">
                                    {(course.lectures && course.lectures.length) ? course.lectures.map((lecture, idx) => {
                                        return (
                                            <div>
                                                <span className="mb-3" style={{ verticalAlign: "super" }}> {`${lecture.lectureName}:`} </span>
                                                <Button className="lectureBtn ml-3 mb-3" onClick={() => onSessionJoin(lecture, course)} disabled={!lecture.active}>
                                                    Join Session
                                                </Button>
                                                <Button className="lectureBtn ml-3 mb-3" onClick={() => onSessionView(lecture, course)} disabled={lecture.posts.length === 0}>
                                                    View Session
                                                </Button>
                                            </div>
                                        )
                                    })
                                    :
                                    <> </>
                                    }
                                </div>
                            </Accordion.Collapse>
                        </Card>
                    )
                })
                :
                <> </>
                }
                <Card>
                    <Card.Header>
                        <Accordion.Toggle
                            className="button addNewCourseBtn"
                            as={Button}
                            onClick={() => setShowCourseModal(true)}
                            variant="primary"
                            eventKey="0"
                        >
                            + Join new course
                        </Accordion.Toggle>
                    </Card.Header>
                </Card>
            </Accordion>
        </div>
    );
}

const mapState = createStructuredSelector({
    user: selectUser,
});

const mapDispatch = dispatch => ({
    setLecture: (lecture, course) => dispatch(setLecture(lecture, course)),
    resetLecture: () => dispatch(resetLecture()),
});

export default connect(mapState, mapDispatch)(Student);
