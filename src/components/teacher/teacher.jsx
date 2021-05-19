import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AddCourse from "../add-course/addCourse";
import AddLecture from "../add-lecture/addLecture";
import StudentModal from "../student-modal/studentModal";

// API
import { getUserCourses } from "../../api/user-api";
import { deleteLecture, resumeLecture } from "../../api/lectures-api";
import { deleteCourse } from "../../api/courses-api";

// redux
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectUser } from "../../redux/user/user-selector";
import { setLecture, resetLecture } from "../../redux/lecture/lecture-actions";

import "./teacher.css"
import { Link, useHistory } from "react-router-dom";

const Teacher = ({ user, setLecture, resetLecture }) => {
    let history = useHistory();

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [showLectureModal, setShowLectureModal] = useState(false);
    const [showStudentModal, setShowStudentModal] = useState(false);

    useEffect(() => {
        resetLecture();
        getCourses();
    }, [showCourseModal, showLectureModal]);

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

    const addNewLecture = (selected) => {
        setSelectedCourse(selected);
        setShowLectureModal(true);
    }

    const onSessionStart = async (lecture, course) => {
        setLecture(lecture._id, course._id);
        await resumeLecture(lecture._id);
        history.push(`./lecture/${course.courseName}/${lecture.lectureName}`);
    }

    const onSessionView = (lecture, course) => {
        setLecture(lecture._id, course._id);
        history.push(`./lecture/${course.courseName}/${lecture.lectureName}/view`)
    }

    const onDeleteCourse = async (course) => {
        await deleteCourse(course._id);
        resetLecture();
        getCourses();
    }

    const onDeleteLecture = async (lecture) => {
        await deleteLecture(lecture._id);
        resetLecture();
        getCourses();
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ textAlign: "center" }}>{`Welcome ${user.username}`}</h1>
            <Link red to="./login"> Logout </Link>
            <br />

            {showCourseModal && <AddCourse show={showCourseModal} onHide={() => setShowCourseModal(false)} />}
            {showLectureModal && <AddLecture courseID={selectedCourse._id} show={showLectureModal} onHide={() => setShowLectureModal(false)} />}
            {showStudentModal && <StudentModal courseID={selectedCourse._id} show={showStudentModal} onHide={() => setShowStudentModal(false)} />}

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
                                <div>  
                                    {`Enrollment ID: ${course.joinID}`}
                                </div>
                                <Link onClick={() => {setSelectedCourse(course); setShowStudentModal(true)}}>
                                    View student list
                                </Link>
                                <span className="deleteCourse" onClick={() => onDeleteCourse(course)}>
                                    Delete Course
                                </span>
                            </Card.Header>
                            <Accordion.Collapse eventKey={idx + 1}>
                                <div className="lectureContainer">
                                    {(course.lectures && course.lectures.length) ? course.lectures.map((lecture, idx) => {
                                        return (
                                            <div>
                                                <span className="mb-3" style={{ verticalAlign: "super" }}> {`${lecture.lectureName}:`} </span>
                                                <Button className="lectureBtn ml-3 mb-3" onClick={() => onSessionStart(lecture, course)}>
                                                    {lecture.posts.length > 0 ? "Resume Session" : "Start Session"}
                                                </Button>
                                                <Button className="lectureBtn ml-3 mb-3" onClick={() => onSessionView(lecture, course)} disabled={lecture.posts.length === 0}>
                                                    View Session
                                                </Button>
                                                <span className="deleteLecture" onClick={() => onDeleteLecture(lecture)}>
                                                    Delete Lecture
                                                </span>
                                            </div>
                                        )
                                    })
                                    :
                                    <> </>
                                    }
                                    <Button className="addNewCourseBtn mb-3" onClick={() => addNewLecture(course)}>
                                        Add new lecture
                                    </Button>
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
                            + Add new course
                        </Accordion.Toggle>
                    </Card.Header>
                </Card>
            </Accordion>
        </div>
    );
}

const mapState = createStructuredSelector({
    user: selectUser,
})

const mapDispatch = dispatch => ({
    setLecture: (lecture, course) => dispatch(setLecture(lecture, course)),
    resetLecture: () => dispatch(resetLecture()),
});

export default connect(mapState, mapDispatch)(Teacher);
