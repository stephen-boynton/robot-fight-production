import React, { Component } from 'react';

const ScoreBoard = (props) => {
    return (
        //This is the actual code for mapping over retrieved high scores
        //VVVVVVVVVVVVVVVVVVVV
        // <ul> 
        //     {props.scores.map((score)=>{
        //         return (
        //         <li>
        //             <p>{score.username}</p>
        //             <p>{score.score}</p>
        //         </li>
        //         )
        //     })}
        // </ul>

        //This is filler get rid of it once the db is going
        //VVVVVVVVVVVVVVVVVVVVV
        <ul className="scoreUl">
            <li className="scoreLi">
                <p>Nick</p>
                <p>20</p>
            </li>
            <li className="scoreLi">
                <p>Coolio</p>
                <p>18</p>
            </li>
            <li className="scoreLi">
                <p>Carl</p>
                <p>2</p>
            </li>
        </ul>
    )
}

export default ScoreBoard