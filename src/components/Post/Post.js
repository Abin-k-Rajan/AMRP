import React from "react";
import AddCrew from "./AddCrew";
import PostCast from "./PostCast";
import PostCrew from "./PostCrew";
import PostMovie from "./PostMovie";

function Post() {
    return (
        <>
            <section className="vh-80 gradient-custom">
            <div className="container py-5 h-100">
            <div className="row d-flex  align-items-center h-100">
                <PostCrew designation='actor'/>
                <PostCrew designation='director'/>
                <PostCrew designation='producer'/>
                <PostCrew designation='writer'/>
                <AddCrew />
                <PostCast />
                <PostMovie />
            </div>
            </div>
            </section>
        </>
    );
}

export default Post;