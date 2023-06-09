import React, { useState, useEffect } from 'react';
import './DragCard.css';
import { Grid, Paper } from '@mui/material';

function DragCard() {
  const [selectedId, setSelectedId] = useState(null);
  const [dropTargetId, setDropTargetId] = useState(null);
  const [matchingCounter, setMatchingCounter] = useState(0);

  useEffect(() => {
    const addEventListeners = () => {
      const draggableListItems = document.querySelectorAll('.draggableItem');
      draggableListItems.forEach((item) => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('dragleave', dragLeave);
      });
    };

    const removeEventListeners = () => {
      const draggableListItems = document.querySelectorAll('.draggableItem');
      draggableListItems.forEach((item) => {
        item.removeEventListener('dragstart', dragStart);
        item.removeEventListener('dragenter', dragEnter);
        item.removeEventListener('drop', dragDrop);
        item.removeEventListener('dragover', dragOver);
        item.removeEventListener('dragleave', dragLeave);
      });
    };

    const dragStart = (event) => {
      const id = event.target.id;
      setSelectedId(id);
    };

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
      const id = event.target.id;
      setDropTargetId(id);

      if (checkForMatch(selectedId, dropTargetId)) {
        document.getElementById(selectedId).style.display = 'none';
        document.getElementById(dropTargetId).style.display = 'none';
        console.log('Yay it works!');
        setMatchingCounter((prevCounter) => prevCounter + 1);
      }

      event.target.classList.remove('over');
    };

    const checkForMatch = (selectedId, dropTargetId) => {
      return selectedId === dropTargetId;
    };

    addEventListeners();

    return () => {
      removeEventListeners();
    };
  }, []);

  const questionList = [
    {
      q: 'What color is the sky?',
      id: 1,
    },
    {
      q: 'What is your name?',
      id: 2,
    },
    {
      q: 'Nice to meet you',
      id: 3,
    },
    {
      q: 'What is the capital of Oregon',
      id
