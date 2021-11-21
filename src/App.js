import './App.css';
import {useEffect, useState} from "react";
import Axios from "axios";
import Card from "../src/conponents/card.js";

const server_url = 'http://localhost:3001/';

function App() {

    const [movieName, setMovieName] = useState('');
    const [review, setReview] = useState('');
    const [movieReviewList, setMovieList] = useState([])

    useEffect(() => {
        Axios.get(`${server_url}api/get`).then((response) => {
            setMovieList(response.data);
        })
    }, [movieReviewList])

    const deleteReview = (movie) => {
        Axios.delete(`${server_url}api/delete/${movie}`).then(()=>{
            setMovieList([...movieReviewList]);
        })
    }

    const updateReview = (movie,newReview) => {
        Axios.put(`${server_url}api/update`,
            {
                movieName: movie,
                movieReview: newReview
            }).then((e) => {
                setMovieList([...movieReviewList])
            console.log('succeed update Review');
        }).catch((err) => {
            console.log(err);
        });
    }

    const submitReview = () => {
        Axios.post(`${server_url}api/insert`,
            {
                movieName: movieName,
                movieReview: review
            }).then((result) => {
            setMovieList([...movieReviewList, {movieName: movieName, movieReview: review}])
        }).catch((err) => {
            console.log('user submit');
            console.log(err);
        })
    }
    return (
        <div className="App">
            <h1>CRUD APPLICATION</h1>
            <div className="from">
                <label>Movie Name : </label>
                <input type="text" name="movieName" onChange={(e) => {
                    setMovieName(e.target.value);
                }}/>
                <label>Review : </label>
                <input type="text" name="review" onChange={(e) => {
                    setReview(e.target.value)
                }}/>
                <button onClick={submitReview}>Submit</button>
                {movieReviewList.map((result) => {
                    return (
                        <Card deleteCall={deleteReview} update={updateReview} movieName={result.movieName} movieReview={result.movieReview}/>
                    )
                })}
            </div>
        </div>
    );
}

export default App;
