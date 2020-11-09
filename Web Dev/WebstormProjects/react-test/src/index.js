import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetail from "./CommentDetail";
import ApprovalCard from "./ApprovalCard";


const App = () => {
  return (
    <div className="ui container comments">
        <ApprovalCard>
            <div>
                <h4>Warning!</h4>
                Are you sure?
            </div>
        </ApprovalCard>

        <ApprovalCard>
            <CommentDetail
                imgSrc={faker.image.avatar()}
                author="Sam"
                timeAgo="Today at 4:45PM"
                commentText="Nice Post!"
            />
        </ApprovalCard>

        <ApprovalCard>
            <CommentDetail
                imgSrc={faker.image.avatar()}
                author="Alex"
                timeAgo="Today at 2:00AM"
                commentText="Happy to be here!"
            />
        </ApprovalCard>

        <ApprovalCard>
            <CommentDetail
                imgSrc={faker.image.avatar()}
                author="Jane"
                timeAgo="Yesterday at 5:00PM"
                commentText="Big Bois Only"
            />
        </ApprovalCard>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));