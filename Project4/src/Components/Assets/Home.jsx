import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';

function Home() {
    const [category, setCategory] = useState('');
    const [userId, setUserId] = useState('');
    const [questions, setQuestions] = useState([]);
    const [displayedQuestion, setDisplayedQuestion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            setError(null);

            try {
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
            } catch (err) {
                setError('Failed to fetch questions. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [category, userId]);

    return (
        <div className="picker" style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>Question Picker</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <select onChange={(e) => setCategory(e.target.value)} defaultValue="">
                        <option value="">-- Select Category --</option>
                        {/* Add category options dynamically if needed */}
                        <option value="math">Math</option>
                        <option value="science">Science</option>
                        <option value="history">History</option>
                    </select>

                    {displayedQuestion ? (
                        <div style={{ marginTop: '2rem' }}>
                            <h2>Question:</h2>
                            <p>{displayedQuestion.question}</p>
                        </div>
                    ) : (
                        <p>No questions available. Please select a category.</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Home;