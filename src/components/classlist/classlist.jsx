import React from "react";

import Teacher from "../teacher/teacher";
import Student from "../student/student";

// Redux
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectUser } from "../../redux/user/user-selector";

const ClassList = ({ user }) => {
    let activeView = null;
    
    if (user.role === "teacher") {
        activeView = <Teacher />;
    } else {
        activeView = <Student />
    }

    return (
        <>
            {activeView}
        </>
    )
};

const mapState = createStructuredSelector({
    user: selectUser,
})

export default connect(mapState, null)(ClassList);
