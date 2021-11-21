import React, {useState} from 'react';

const Card = ({deleteCall,update, movieName,movieReview}) => {
    const [newReview, setNewReview] = useState('')

    return (
        <>
            <div className="card">
                <h1>{movieName}</h1>
                <p1>{movieReview}</p1>
                <br/>
                <button onClick={()=>{
                    deleteCall(movieName)
                }}>Delete</button>

                <input type="text" id="updateInput" onChange={(e)=>{
                    setNewReview(e.target.value);
                }}/>

                <button onClick={()=>{update(movieName,newReview)}}>Update</button>
            </div>
        </>
    );
};

export default Card;