// variables needed: selectedId, dropTargetId, matching counter

// drag function: Spanish game has dragStart, dragEnter, dragLeave, dragOver and dragDrop
// dragStart selects current ID, dragEnter and dragLeave deal with a class ('over') by adding or removing it -- these are only called in the function addEventListeners (bottom of page) -- changes color when hovered
// dragOver invokes event.preventDefault
// dragDrop handles removing matches by setting display to none if a match is made, also adds 1 to counter

// checkForMatch function: both ways (dragging English or Spanish ex)
// JS app works by using switch case and booleans (checkForMatch and checkForMatch2 -- both used in dragDrop function)

// counter function (maybe? Spanish game counts to 5, which was the maximum number of matches provided)

// playAgain function: reset cards, shows End message

// useEffect for addEventListener functions

// create static list of questions and ansers with matching IDs then loop through the list to display on page.

import React, { useState, useEffect, useCallback, useRef } from 'react';


function DragCard() {
  // let selectedId;
  // let dropTargetId;
  // let matchingCounter = 0;


  const questionList = [
    {
      q: 'What color is the sky?',
      id: 1
    },
    {
      q: 'What is your name?',
      id: 2
    },
    {
      q: 'Nice to meet you',
      id: 3
    },
    {
      q: 'What is the capitol of Oregon',
      id: 4
    },
    {
      q: 'What is the national bird',
      id: 5
    }

  ];

  const answerList = [
    {
      a: 'Blue',
      id: 1
    },
    {
      a: '¿Cómo te llamas?',
      id: 2
    },
    {
      a: 'Mucho gusto',
      id: 3
    },
    {
      a: 'Salem',
      id: 4
    },
    {
      a: 'the bald eagle',
      id: 5
    }

  ];

  // useEffect(() => {

  // })


  console.log('Logging question IDs:', questionList.map((question) => `${question.q} ${question.id}`));
  
  return (
    <React.Fragment>
      <p>hello world</p>
      <div>
        Questions:
        {questionList.map((question, id) =>
          <p key={id}>{question.q}</p>
        )}
      </div >
      <br />
      <br />
      <div>
        Answers:
        {answerList.map((answer, id) =>
          <p key={id}>{answer.a}
          </p>
        )}
      </div>
    </React.Fragment>
  )
}

export default DragCard;


// ZackCipolletta@gmail.com

// Zachary Cipolletta