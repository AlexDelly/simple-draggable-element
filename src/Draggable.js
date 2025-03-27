import React, { useEffect, useState } from "react";

const Draggable = ({ childElement, initialPosition }) => {
  const [isAttached, setIsAttached] = useState(false);
  const [elementPosition, setElementPosition] = useState({
    x: 0,
    y: 0,
  });
  const [clickedMousePosition, setClickedMousePosition] = useState({});
  const [mousePosition, setMousePosition] = useState({});

  const handleFocus = () => {
    setClickedMousePosition({
      x: mousePosition.x,
      y: mousePosition.y,
    });

    if (!isAttached) {
      setIsAttached(true);
    }
  };

  const mouseMoveHandler = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
    if (
      event.clientY <= 0 ||
      event.clientX <= 0 ||
      event.clientX >= window.innerWidth ||
      event.clientY >= window.innerHeight
    ) {
      setIsAttached(false);
    }
  };

  const handleDefocus = () => {
    setIsAttached(false);
    setElementPosition({
      x: mousePosition.x - (clickedMousePosition.x - elementPosition.x),
      y: mousePosition.y - (clickedMousePosition.y - elementPosition.y),
    });
  };

  useEffect(() => {
    if (initialPosition) {
      setElementPosition(initialPosition);
    }

    window.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [initialPosition]);

  return (
    <div
      style={{
        position: "absolute",
        cursor: "pointer",
        left: isAttached
          ? mousePosition.x - (clickedMousePosition.x - elementPosition.x)
          : elementPosition.x,
        top: isAttached
          ? mousePosition.y - (clickedMousePosition.y - elementPosition.y)
          : elementPosition.y,
      }}
      onMouseDown={handleFocus}
      onMouseUp={handleDefocus}
    >
      {childElement}
    </div>
  );
};

export default Draggable;
