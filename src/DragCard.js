import React, { useState, useEffect } from 'react';
import './DragCard.css';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AnswerTable from './AnswerTable';

function DragCard({ answers, questions, resultsQuestions, resultsAnswers }) {
  const [selectedId, setSelectedId] = useState(null);
  const [dropTargetId, setDropTargetId] = useState(null);
  const [allHidden, setAllHidden] = useState(false);
  const [answerStyle, setAnswerStyle] = useState(false);
  const [questionStyle, setQuestionStyle] = useState(false);

  console.log('answerStyle', answerStyle);

  const dragStart = (event) => {
    if (event.target.tagName.toLowerCase() === "img") {
      const id = event.target.parentElement.id;
      setSelectedId(id);
    } else {
      const id = event.target.id;
      setSelectedId(id);
    }
  };

  useEffect(() => {
  }, [selectedId]);

  const dragEnter = (event) => {
    event.target.classList.add('over');
  };

  const dragLeave = (event) => {
    event.target.classList.remove('over');
  };

  const dragOver = (event) => {
    event.preventDefault();
  };

  const dragDrop = (event) => {
    event.preventDefault();
    if (event.target.tagName.toLowerCase() === "img") {
      const id = event.target.parentElement.id;
      setDropTargetId(id);
    } else {
      const id = event.target.id;
      setDropTargetId(id);
    } 
  };

  //by using a useEffect we solve our issue of state not being updated when the if then statement is called to check for equality of selectedId and dropTargetId
  useEffect(() => {
    if (selectedId && dropTargetId) {

      const selectedElement = document.getElementById(selectedId);
      const dropTargetElement = document.getElementById(dropTargetId);

      const selectedName = selectedElement.getAttribute('data-name');
      const dropTargetName = dropTargetElement.getAttribute('data-name');

      // if the id of the selected element equals the id of the target element, we continue with our function.
      if (selectedElement !== dropTargetElement && selectedName === dropTargetName) {
        //console.log('Yay it works!');
        const selectedElement = document.getElementById(selectedId);
        const dropTargetElement = document.getElementById(dropTargetId);


        // this is a null check, so if these variables are not assigned values, the if then statement will not run.
        if (selectedElement && dropTargetElement) {
          // selectedElement.style.display = 'none';
          selectedElement.style.display = 'none';
          dropTargetElement.style.display = 'none';

        }
      } else {
        console.log('try again');
      }


      const resetDragStyles = () => {
        const draggableItems = document.querySelectorAll('.draggableItem');
        draggableItems.forEach((item) => {
          item.classList.remove('over');
        });
      };

      resetDragStyles();
      setSelectedId(null);
      setDropTargetId(null);
      setAnswerStyle(false);
    } else {
      console.log("Both elements do not exist yet")
    }

  }, [selectedId, dropTargetId]);

  useEffect(() => {
    if (questions && answers) {
      const draggableListItems = document.querySelectorAll('.draggableItem');
      draggableListItems.forEach((item) => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('dragleave', dragLeave);
      });

      return () => {
        const draggableListItems = document.querySelectorAll('.draggableItem');
        draggableListItems.forEach((item) => {
          item.removeEventListener('dragstart', dragStart);
          item.removeEventListener('dragenter', dragEnter);
          item.removeEventListener('drop', dragDrop);
          item.removeEventListener('dragover', dragOver);
          item.removeEventListener('dragleave', dragLeave);
        });
      };
    }
  }, [questions, answers]);


  useEffect(() => {
    if (selectedId && dropTargetId && questions) {
      // Check if all elements are hidden
      const allHidden = questions.every((question) => { // << change questions to questionList
        const questionElement = document.getElementById(question.id);
        return questionElement.style.display === 'none';
      }) && answers.every((answer) => { // << change answers to answerLIst
        const answerElement = document.getElementById(answer.id);
        return answerElement.style.display === 'none';
      });

      if (allHidden) {
        setAllHidden(true);
        // console.log('All elements are hidden');
      }
    }
  }, [selectedId, dropTargetId, questions]);


  // Check if click events match
  const handleClick = (event) => {
    if (selectedId) {
      // Do the drop functionality - set dropTargetId
      if (event.target.tagName.toLowerCase() === "img") {
        const id = event.target.parentElement.id;
        setDropTargetId(id);
      } else {
        const id = event.target.id;
        setDropTargetId(id);
      } 
    } else {
      // Do the start drag functionality - set selectedId
      if (event.target.tagName.toLowerCase() === "img") {
        const id = event.target.parentElement.id;
        console.log('id is generating TAG NAME', id);
        setSelectedId(id);
        // Check if paper style needs to be updated
        setAnswerStyle(id)
      } else {
        const id = event.target.id;
        console.log('id is generating', id);
        setSelectedId(id);
        // Check if paper style needs to be updated
        setAnswerStyle(id)
      }

    }
  }


  return (
    <Grid container spacing={2} style={{ display: "flex"}}>
      <Grid item xs={6} style={{ display: "flex", flexDirection: "column"}}>
        
      {!allHidden && (
        <h3>Questions:</h3>
          )}

        {/* Generating cards, including image (if exists) */}
        {questions?.map((question) => ( // << change questions to questionList
          <Paper 
            // style = {{ flexGrow: 1 }}
              className="draggableItem questionList"
              key={question.id}
              draggable="true"
              id={question.id}
              data-name={question.name}
              onClick={(e) => handleClick(e)}
              style={{
                outline: answerStyle === question.id ? '3px solid blue' : 'inherit',
                cursor:'grab !important'
              }}
            >
              {question.q}
              <br />
              {question.qImage && (
                <img src={question.qImage}
                style={{ height: "10rem", pointerEvents:'none' }} /> // scale image as rem or px?
                )}
          </Paper>
        ))}
      </Grid>

      <Grid item xs={6} style={{display: "flex", flexDirection: "column"}}>
      {!allHidden && (
        <h3>Answers:</h3>
          )}
        {answers?.map((answer) => ( // << change answers to answerList
          <Paper
            // style={{ flexGrow: 1, textAlign: "center" }}
            className="draggableItem answerList"
            key={answer.id}
            draggable="true"
            id={answer.id}
            data-name={answer.name}
            onClick={(e) => handleClick(e)}
            style={{
              outline: answerStyle === answer.id ? '3px solid blue' : 'inherit',
              cursor:'grab !important'
            }}
          >
            {answer.a}
          </Paper>
        ))}
      </Grid>

      <Grid item xs={12}>
        <Grid container justifyContent="center"> {/* Center the winMessage horizontally */}
          {allHidden && (
            <AnswerTable
              questions={resultsQuestions}
              answers={resultsAnswers}
            />
          )}
          
        </Grid>
      </Grid>

    </Grid>
  );
}

export default DragCard;