import axios from 'axios';
import { useState } from 'react';
import useUser from '../hooks/useUser';

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');
    const { user } = useUser();

    const addComment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText,
        }, { 
            headers,
        });
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');
    }

    return (
        <div id="add-comment-form">
            <h3>Add a comment if you really want to</h3>
            {user && <p>you are posting as {user.email}</p>}
            <label><br />
                <textarea 
                    rows="4" 
                    cols="50"
                    value={commentText}
                    onChange={event => setCommentText(event.target.value)}
                />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )

}

export default AddCommentForm;