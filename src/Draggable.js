import React, { useCallback, useEffect, useRef } from 'react';

function Draggable({ children, questions, style, className, onDragStart, onDragEnd }) {
  const dragRef = useRef(null);
  let isMouseDown = false;
  let offset = [0, 0];

  const onMouseDown = (e) => {
    isMouseDown = true;
    const dragDiv = dragRef.current;
    if (!dragDiv) return;

    const isTouch = /touch/g.test(e.type);
    const x = isTouch ? e.touches[0].clientX : e.clientX;
    const y = isTouch ? e.touches[0].clientY : e.clientY;

    offset = [
      dragDiv.offsetLeft - x,
      dragDiv.offsetTop - y
    ];

    if (onDragStart) {
      const rect = dragDiv?.getBoundingClientRect();
      onDragStart(rect);
    }

    dragDiv.addEventListener('mouseup', onMouseUp, true);
    dragDiv.addEventListener('touchend', onMouseUp, true);

    document.addEventListener('contextmenu', onContextMenu, false);
    document.addEventListener('touchmove', onMouseMove, true);
    document.addEventListener('mousemove', onMouseMove, true);
  }

  const onMouseUp = () => {
    isMouseDown = false;
    if (!isMouseDown && onDragEnd) {
      const rect = dragRef.current?.getBoundingClientRect();
      onDragEnd(rect);
    }

    document.removeEventListener('touchmove', onMouseMove, true);
    document.removeEventListener('mousemove', onMouseMove, true);
    document.removeEventListener('contextmenu', onContextMenu, false);
  }

  const onMouseMove = useCallback((e) => {
    const isTouch = /touch/g.test(e.type);

    if (!isTouch) {
      e.preventDefault();
    }

    if (isMouseDown && dragRef.current) {
      const x = isTouch ? e.touches[0].clientX : e.clientX;
      const y = isTouch ? e.touches[0].clientY : e.clientY;

      dragRef.current.style.left = (x + offset[0]) + 'px';
      dragRef.current.style.top = (y + offset[1]) + 'px';
    }
  }, [isMouseDown, offset]);

  const onContextMenu = () => {
    document.removeEventListener('mousemove', onMouseMove, true);
    document.removeEventListener('touchmove', onMouseMove, true);
  }

  useEffect(() => {
    const dragDiv = dragRef.current;

    dragDiv?.addEventListener('touchstart', onMouseDown, true);
    dragDiv?.addEventListener('mousedown', onMouseDown, true);

    return () => {
      dragDiv?.removeEventListener('mousedown', onMouseDown, true);
      dragDiv?.removeEventListener('mouseup', onMouseUp, true);
      document.removeEventListener('mousemove', onMouseMove, true);

      dragDiv?.removeEventListener('touchstart', onMouseDown, true);
      dragDiv?.removeEventListener('touchend', onMouseUp, true);
      document.removeEventListener('touchmove', onMouseMove, true);

      document.removeEventListener('contextmenu', onContextMenu, false);
    }
  }, []);

  return (
    <div>
      {questions?.map((question) => (      
        <div
        ref={dragRef}
        className={className || "drag-react"}
        style={{ position: 'fixed', left: '10px', top: '10px', zIndex: 99999, cursor: 'move', ...style }}
        >
          {/* {children} */}
          {question.q}
              <br />
              {question.qImage && (
                <img src={question.qImage}
                style={{ height: "10rem", pointerEvents:'none' }} /> // scale image as rem or px?
                )}
        </div>
      ))}

    </div>
  );
}

export { Draggable };
