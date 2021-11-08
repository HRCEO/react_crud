import './App.css';
import {useEffect, useState} from "react";
import Axios from "axios";

const server_url = 'http://localhost:3001/';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');


  useEffect(()=>{
      Axios.get(`${server_url}api/get`).then((response)=>{
          console.log(response);
      })
  },[])

  const submitReview = () =>{
    console.log('user submit');
      Axios.post(`${server_url}api/insert`,
          {
              movieName:movieName,
              movieReview:review
          }).then((result)=>{
              alert('successful insert');
          console.log(result + 'test front');
      }).catch((err)=>{
          console.log(err);
      })
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
      </div>
    </div>
  );
}

export default App;
