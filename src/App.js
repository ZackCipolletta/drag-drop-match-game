import React, { useState, useEffect } from 'react';
import './App.css';
import DragCard from './DragCard';
import { v4 } from "uuid";
// import DragCardParent from './DragCardParent';
import { collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from './firebase';
import { Draggable } from './Draggable';


// if w > h
const w = window.innerWidth;
const h = window.innerHeight;

let left;
let right;

// if h > w
const adjustedW = w * .8;
const adjustedH = h * .8;

let top;
let bottom;

if (w > h) {
  left = adjustedW * 0.5
  right = w - adjustedW * 0.5
  } else if (h > w) {
  top = adjustedH * 0.5
  bottom = h - adjustedH * 0.5
}

// if w > h
function rightPosition() {
  const position = left + Math.floor(Math.random() * (right * 0.8));
  
  if (position > (w * .85) || position < (w * .5)) {
    return rightPosition(); // Call itself again
  }
  
  return position;
}

function leftPosition() {
  return Math.floor(Math.random() * (left * 0.9));
}

// if h > w
function topPosition() {
  return Math.floor(Math.random() * (top * 0.9));
}

function bottomPosition() {
  const position = top + Math.floor(Math.random() * (bottom * 0.8));
  
  if (position > (h * .85) || position < (h * .5)) {
    return bottomPosition(); // Call itself again
  }
  
  return position;
}

let Multiple;
if (w > h) {

  Multiple = () => (
    <main>
  
  
      <Draggable onDragStart={(rect) => { console.log('onDragStart => ', rect); }}
        style={{
          left: leftPosition(), top: Math.floor(Math.random() * adjustedH)
        }}
      >
        <div>question 1</div>
      </Draggable>
  
      <Draggable
        style={{ left: leftPosition(), top: Math.floor(Math.random() * adjustedH) }}
      >
        <div style={{ backgroundColor: '#2196f3' }}>question 2</div>
      </Draggable>
  
      <Draggable
        style={{ left: leftPosition(), top: Math.floor(Math.random() * adjustedH) }}
      >
        <div style={{ backgroundColor: '#1fb230' }}>question 3</div>
      </Draggable>
  
  
  
      {/* answer divs */}
      <Draggable
        // style={{ left: left + Math.floor(Math.random() * (right *.8) ), top: Math.floor(Math.random() * adjustedH) }}
        style={{ left: rightPosition(), top: Math.floor(Math.random() * adjustedH) }}
      >
        <div style={{ backgroundColor: '#7a1fb2' }}>Answer 1</div>
      </Draggable>
  
      <Draggable
        style={{ left: rightPosition(), top: Math.floor(Math.random() * adjustedH) }}
      >
        <div style={{ backgroundColor: '#e928a9' }}>Answer 2</div>
      </Draggable>
  
    </main>
  );
  
} else if (h > w) {
  
  Multiple = () => (
    <main>
  
  
      <Draggable onDragStart={(rect) => { console.log('onDragStart => ', rect); }}
        style={{
          left: Math.floor(Math.random() * adjustedW), top: topPosition()
        }}
      >
        <div>question 1</div>
      </Draggable>
  
      <Draggable
        style={{
          left: Math.floor(Math.random() * adjustedW), top: topPosition()
        }}
      >
        <div style={{ backgroundColor: '#2196f3' }}>question 2</div>
      </Draggable>
  
      <Draggable
        style={{
          left: Math.floor(Math.random() * adjustedW), top: topPosition()
        }}
      >
        <div style={{ backgroundColor: '#1fb230' }}>question 3</div>
      </Draggable>
  
  
  
      {/* answer divs */}
      <Draggable
        // style={{ left: left + Math.floor(Math.random() * (right *.8) ), top: Math.floor(Math.random() * adjustedH) }}
        style={{
          left: Math.floor(Math.random() * adjustedW), top: bottomPosition()
        }}
      >
        <div style={{ backgroundColor: '#7a1fb2' }}>Answer 1</div>
      </Draggable>
  
      <Draggable
        style={{
          left: Math.floor(Math.random() * adjustedW), top: bottomPosition()
        }}
      >
        <div style={{ backgroundColor: '#e928a9' }}>Answer 2</div>
      </Draggable>
  
    </main>
  );
}

function App() {
  const [studyset, setStudyset] = useState([]);
  console.log('studyset', studyset)
  useEffect(() => {
    getStudySet();
  }, [])

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const getStudySet = async () => {
    try {
      const studysetRef = doc(db, 'sets', 'Gv9UBUTE25vsvZzCjgUD');

      onSnapshot(studysetRef, (doc) => {
        setStudyset(doc.data().cards)
      })

    } catch (error) {
      console.log('Error getting single study set', error);
    }
  }

  useEffect(() => {
    if (studyset) {
      // initiate question array
      let qs = [];
      // initiate answer array
      let as = [];

      // maps information from firebase to be mapped, allows for questions to have images or not
      studyset.map((x) => {
        const question = { q: x.question, id: v4(), name: x.id };
        const correctAnswer = { a: x.correctAnswerList[0].answer, id: v4(), name: x.id };
  
        if (x.questionImage && x.questionImage[0] && x.questionImage[0].url) {
          question.qImage = x.questionImage[0].url;
        }
  
        qs.push(question);
        as.push(correctAnswer);

        setQuestions(qs);
        setAnswers(as);
      });

      // shuffle question and answer elements for matching game
      const shuffleArray = (arr) => {
        arr.sort(() => Math.random() - 0.5);
      }

      let shuffledAs = [...as];
      let shuffledQs = [...qs];

      shuffleArray(shuffledAs);
      shuffleArray(shuffledQs);

      setShuffledQuestions(shuffledQs);
      setShuffledAnswers(shuffledAs);

    }
  }, [studyset])

  return (
    <div className="App">
      <DragCard
        answers={shuffledAnswers}
        questions={shuffledQuestions}
        resultsQuestions={questions}
        resultsAnswers={answers}
      />

      {shuffledQuestions?.map((question) => (
        <Draggable
          questions={shuffledQuestions}
          key={question.id}
          id={question.id}
          draggable="true"
          style={{
            left: Math.floor(Math.random() * adjustedW), top: topPosition()
          }}
              >
                  <div key={question.id}>
                    {question.q}
                    <br />
                    {question.qImage && (
                      <img src={question.qImage} style={{ height: "10rem", pointerEvents: 'none' }} />
                    )}
                  </div>
                
      </Draggable>
      ))}
    </div>
  );
}

export default App;
