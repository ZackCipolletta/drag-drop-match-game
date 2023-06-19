import React, { useState, useEffect } from 'react';
import './DragCard.css';
import { Grid, Paper } from '@mui/material';

function DragCard({answers, questions}) {
  const [selectedId, setSelectedId] = useState(null);
  const [dropTargetId, setDropTargetId] = useState(null);
  const [matchingCounter, setMatchingCounter] = useState(0);
  const [hiddenElements, setHiddenElements] = useState([]);
  const [triumphMessage, setTriumphMessage] = useState(false);
  const [allHidden, setAllHidden] = useState(false);

  const dragStart = (event) => {
    const id = event.target.id;
    setSelectedId(id);
    console.log('drag started');
  };

  useEffect(() => {
    console.log(selectedId);
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

    // change this to check if target is class is != to selectedId class?
    const id = event.target.id;
    setDropTargetId(id);
  };

  useEffect(() => {
    console.log(selectedId);
    console.log(dropTargetId);
  }, [selectedId, dropTargetId]);


// ------------------------------------------------------------------------------
  // const dragDrop = (event) => {
  //   event.preventDefault();
  //   const id = event.target.id;
  //   const targetClass = event.target.class;

  //   const selectedElement = document.getElementById(selectedId);
  //   const selectedClass = selectedElement.class;

  //   // change this to check if target is class is != to selectedId class?
  //   if (targetClass !== selectedClass) {
  //     setDropTargetId(id);
  //   }
  // };
// ------------------------------------------------------------------------------



  //by using a useEffect we solve our issue of state not being updated when the if then statement is called to check for equality of selectedId and dropTargetId
  useEffect(() => {


    // Null check to verify that both selectedId and dropTargetId have values before running the rest of the code.
    if (selectedId && dropTargetId) {
      
      const selectedElement = document.getElementById(selectedId);
      const dropTargetElement = document.getElementById(dropTargetId);
    
      const selectedName = selectedElement.getAttribute("name");
      const dropTargetName = dropTargetElement.getAttribute("name");

      console.log(selectedElement.parentElement);
      console.log(dropTargetElement.parentElement);

      console.log(selectedName);
      console.log(dropTargetName);

      if (selectedName !== dropTargetName) {


        // if the id of the selected element equals the id of the target element, we continue with our function.
        if (selectedId === dropTargetId) {
          console.log('Yay it works!');
          const selectedElement = document.getElementById(selectedId);
          const dropTargetElement = document.getElementById(dropTargetId);
        
    
          // this is a null check, so if these variables are not assigned values, the if then statement will not run.
          if (selectedElement && dropTargetElement) {

            selectedElement.classList.add('hidden');
            dropTargetElement.classList.add('hidden');
    
            // Find matching answer element with the same ID value and set its display to 'none'
            const matchingAnswerElement = document.querySelector(
              `.answerList.draggableItem[id="${dropTargetId}"]`
            );
    
            // same here - if matchingAnswerElement is not assigned a value, the statement will not run. This prevents the error: Cannot read properties of null (reading 'style')
            if (matchingAnswerElement) {
              matchingAnswerElement.style.display = 'none';
            }
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
      } else {
        console.log("same class")
      }
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
        console.log('All elements are hidden');
      }
    }
  }, [selectedId, dropTargetId, questions]);


  return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper>
            <h3>Questions77:</h3>
            {questions?.map((question, id) => ( // << change questions to questionList
              <p className="draggableItem questionList"
                name={`questionList`}
                key={id}
                draggable="true"
                id={question.id}>
                {question.q}
              </p>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <h3>Answers:</h3>
            {answers?.map((answer, id) => ( // << change answers to answerList
              <p className="draggableItem answerList"
              name={`answerList`}
                key={id}
                draggable="true"
                id={answer.id}>
                {answer.a}
              </p>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
        <Grid container justifyContent="center"> {/* Center the winMessage horizontally */}
          {allHidden && <p className='winMessage'>You win!</p>}
        </Grid>
      </Grid>

      </Grid>
  );
}

export default DragCard;



// const questionList = [
//   {
//     q: 'What color is the sky?',
//     id: 1,
//   },
//   {
//     q: 'What is your name?',
//     id: 2,
//   },
//   {
//     q: 'Nice to meet you',
//     id: 3,
//   },
//   {
//     q: 'What is the capital of Oregon',
//     id: 4,
//   },
//   {
//     q: 'What is the national bird',
//     id: 5,
//   },
// ];

// const answerList = [
//   {
//     a: 'Blue',
//     id: 1,
//   },
//   {
//     a: '¿Cómo te llamas?',
//     id: 2,
//   },
//   {
//     a: 'Mucho gusto',
//     id: 3,
//   },
//   {
//     a: 'Salem',
//     id: 4,
//   },
//   {
//     a: 'the bald eagle',
//     id: 5,
//   },
// ];



useEffect(() => {
  if (studyset) {
    let qs = [];
    let as = [];
    studyset.map((x) => {
      const question = { q: x.question, id: x.id };
      const correctAnswer = { a: x.correctAnswerList[0].answer, id: x.id };

      if (x.questionImage && x.questionImage[0] && x.questionImage[0].url) {
        question.qImage = x.questionImage[0].url;
      }

      qs.push(question);
      as.push(correctAnswer);
    });

    const shuffleArray = (arr) => {
      arr.sort(() => Math.random() - 0.5);
    };

    shuffleArray(qs);
    shuffleArray(as);

    setQuestions(qs);
    setAnswers(as);
  }
}, [studyset]);
