import React, { Component, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Row, Col } from "react-bootstrap";
import "./thumb.png";

import socketIOClient from "socket.io-client"

// API
import { getCourse } from "../../api/courses-api";
import { getLecture, endLecture } from "../../api/lectures-api";

// redux
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectUser } from "../../redux/user/user-selector";
import { selectLecture } from "../../redux/lecture/lecture-selector";

import "./lecture.css";
import { Link, useHistory } from "react-router-dom";

const clientPort = process.env.REACT_APP_API_ENDPOINT;
const socket = socketIOClient(clientPort);

const Post = ({ post, user, isView }) => {
    const [selectedPost, setSelectedPost] = useState(post);

    useEffect(() => {
        socket.on("liked", newPost => {
            newPost._id === selectedPost._id && setSelectedPost({ ...selectedPost, likes: newPost.likes })
        });

        socket.on("removed", (removed, postID) => {
            removed.ok && postID === selectedPost._id && setSelectedPost(null);
        });
    }, []);
    
    const handleLikePost = async () => {
        socket.emit("like", selectedPost._id);
    }

    const handleRemove = async () => {
        socket.emit("remove", selectedPost._id);
    }

    return (
        selectedPost ?
        <Card>
            <Card.Header>
                {(user.role === "teacher" && selectedPost.author) ? selectedPost.author.username : ""}
                {(user.role === "teacher") ?
                    <Button className="float-right" onClick={handleRemove} disabled={isView}>
                        Remove Comment
                    </Button>
                    :
                    <> </>
                }
                <Card.Body>
                    <div className="postContent">
                        {selectedPost.content}
                    </div>
                    

                    <button className="likeButton" onClick={handleLikePost} disabled={isView}>
                        <Row>
                            <Col>
                                <img src={require("./thumb.png")} />
                            </Col>

                            <Col>
                                <p className="thumbs"> {selectedPost.likes}</p>
                            </Col>
                        </Row>
                    </button>
                </Card.Body>
            </Card.Header>
        </Card>
        :
        <> </>
    )

}

const Lecture = ({ user, selectedLecture }) => {
    let history = useHistory();

    const [course, setCourse] = useState(null);
    const [lecture, setLecture] = useState(null);
    const [error, setError] = useState("");
    const [postMessage, setPostMessage] = useState("");

    const isView = window.location.href.includes("view");

    useEffect(() => {
        socket.on("postAdded", (newLecture) => {
            setSelectedLecture(newLecture._id);
        })
    }, []);

    useEffect(() => {
        setSelectedCourse();
        setSelectedLecture(selectedLecture.lectureID);
    }, [selectedLecture]);

    const setSelectedCourse = async () => {
        let res = await getCourse(selectedLecture.courseID);
        if (res) {
            if (!res.error) {
                setCourse(res);
                setError("");
            } else {
                setError(res.error.toString());
            }
        } else {
            setError("Something went wrong");
        }
    }

    const setSelectedLecture = async (lectureID) => {
        let res = await getLecture(lectureID);
        if (res) {
            if (!res.error) {
                setLecture(res);
                setError("");
            } else {
                setError(res.error.toString());
            }
        } else {
            setError("Something went wrong");
        }
    }

    const handleSend = async () => {
        postMessage !== "" && socket.emit("postAdd", lecture._id, user._id, postMessage);
        setPostMessage("");
    }

    const endLectureSession = async () => {
        let res = await endLecture(lecture._id);
        if (res) {
            if (!res.error) {
                history.push("/classlist");
                setError("");
            } else {
                setError(res.error.toString());
            }
        } else {
            setError("Something went wrong");
        }
    }

    return (
        lecture ?
        <div>
            <h1 style={{ textAlign: "center" }}>{`Welcome ${user.username}`}
            </h1>
            <Link onClick={() => history.push("/login")} className="text-center ml-3"> Logout </Link>

            {error !== "" &&
                <div className="inlineError m-auto">
                    {error}
                </div>
            }

            {course && <p className="ml-3" style={{ fontWeight: "bold" }}> {`${course.courseName}: ${lecture.lectureName}`} </p>}
            <p className="ml-3">Ask a question and you classmates and the instructor will see it</p>
  
            <div id="myForm" className="ml-4 mb-3">
                <h1>Questions</h1>
  
                <input
                    type="text"
                    value={postMessage}
                    onChange={(e) => setPostMessage(e.target.value)}
                    placeholder="Type message..."
                    disabled={isView}
                />
                <Button variant="primary" onClick={handleSend} disabled={isView}>
                    Send post
                </Button>
                <Button variant="primary" className="btn cancel" onClick={() => setPostMessage("")} disabled={isView}>
                    Delete message
                </Button>
            </div>
  
            <div className="postContainer">
                {(lecture && lecture.posts && lecture.posts.length) ? lecture.posts.map(post => {
                    if (post) return <Post post={post} user={user} isView={isView} />;
                })
                :
                <> </>
                }
            </div>

            {(user.role === "teacher") ? 
            <Button onClick={endLectureSession} disabled={isView} className="d-block mr-auto ml-auto mt-5">
                End Session
            </Button>
            :
            <> </>
            }
        </div>
        :
        <> </>
    );
};

const mapState = createStructuredSelector({
    user: selectUser,
    selectedLecture: selectLecture
});

export default connect(mapState, null)(Lecture);
