import './App.css';
import {useEffect, useState} from "react";
import Axios from "axios";

const server_url = 'http://localhost:3001/';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([])

  const [newReview,setNewReview] = useState('')


  useEffect(()=>{
      Axios.get(`${server_url}api/get`).then((response)=>{
          setMovieList(response.data);
      })
  },[])

  const submitReview = () =>{
      Axios.post(`${server_url}api/insert`,
          {
              movieName:movieName,
              movieReview:review
          }).then((result)=>{
              setMovieList([...movieReviewList,{movieName:movieName, movieReview:review}])
      }).catch((err)=>{
          console.log('user submit');
          console.log(err);
      })
  }

  const deleteReview = (movie)=>{
        Axios.delete(`${server_url}api/delete/${movie}`);
  }

  const updateReview = (movie)=>{
    Axios.put(`${server_url}api/update`,
        {
            movieName:movie,
            movieReview:newReview
        }).then(()=>{
            console.log('succeed update Review');
            setNewReview("");
        }).catch((err)=>{
            console.log(err);
            setNewReview("");
        });
  }

    return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="from">
          <label>Movie Name : </label>
        <input type="text" name="movieName" onChange={(e)=>{
            setMovieName(e.target.value);
        }}/>
          <label>Review : </label>
        <input type="text" name="review" onChange={(e)=>{
            setReview(e.target.value)}}/>
          <button onClick={submitReview}>Submit</button>
          {movieReviewList.map((result)=>{
              return (
                  <div className="card">
                      <h1>{result.movieName}</h1>
                      <p1>{result.movieReview}</p1>
                      <br/>
                      <button onClick={()=>{
                          deleteReview(result.movieName)
                      }}>Delete</button>

                      <input type="text" id="updateInput" onChange={(e)=>{
                          setNewReview(e.target.value);
                      }}/>

                      <button onClick={()=>{updateReview(result.movieName)}}>Update</button>
                  </div>
              )
          })}
      </div>
    </div>
  );
}

export default App;
