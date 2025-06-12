import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
const [category, setCategory] = useState('');
const [userId, setUserId] = useState('');
const [questions, setQuestions] = useState([]);
const [displayedQuestion, setDisplayedQuestion] = useState(null);

useEffect(() => {
const fetchQuestions = async () => {
const params = {};
if (category) params.category = category;
if (userId) params.userId = userId;

const res = await axios.get('http://localhost:5000/api/questions', { params });
setQuestions(res.data);
if (res.data.length > 0) {
const rand = Math.floor(Math.random() * res.data.length);
setDisplayedQuestion(res.data[rand]);
} else {
setDisplayedQuestion(null);
}
};

fetchQuestions();
}, [category, userId]);

return (
<div style={{ textAlign: 'center', marginTop: '2rem' }}>
<h1>Question Picker</h1>

<select onChange={(e) => setCategory(e.target.value)} defaultValue="">
<option value="">-- Select Category --</option>
<option value="Tech">Tech</option>
<option value="Science">Science</option>
<option value="Philosophy">Philosophy</option>
</select>

<input
type="text"
placeholder="Enter your user ID"
value={userId}
onChange={(e) => setUserId(e.target.value)}
style={{ marginLeft: '10px' }}
/>

<div style={{ marginTop: '3rem', fontSize: '1.5rem' }}>
{displayedQuestion ? (
<>
<p><strong>Question:</strong> {displayedQuestion.text}</p>
<p><em>by {displayedQuestion.createdBy.username}</em></p>
</>
) : (
<p>No questions found.</p>
)}
</div>
</div>
);
}

export default Home;