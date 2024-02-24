import React, { useRef, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Col, Row, Button } from 'react-bootstrap'; // Add Button import
import './CanvasComponent.css'; // Import your custom CSS
import axios from 'axios';
import url from '../configs/urlConfig';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { sourceDestActions } from '../react-redux-components/sourceDest-slice';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const coordinates = useSelector(state => state.coordinate.coordinates)
  const dispath = useDispatch();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = process.env.PUBLIC_URL + 'map.png';
    img.onload = async () => {
      // Set canvas dimensions based on the original image size
      canvas.height = 758;
      canvas.width = 1190;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

      console.log(coordinates);
      await axios.post(url + "/passenger/bookride",
        coordinates
        ,
        {
          headers: {
            "Authorization": "Bearer " + window.sessionStorage.getItem("JWT_TOKEN")
          }
        })
        .then((res) => {
          // toast.success("Coordinates fetched");

          dispath(sourceDestActions.updateFare(Math.round(res.data.cost)));
          const lineCoordinates = res.data.path;
          // Draw the line passing through the points with shadow
          ctx.beginPath();
          ctx.moveTo(lineCoordinates[0].x, lineCoordinates[0].y);
          ctx.strokeStyle = 'purple'; // Set line color to purple
          ctx.lineWidth = 3; // Set line width to make it bold
          ctx.shadowColor = 'rgba(128, 0, 128, 0.5)'; // Set shadow color to purple with transparency
          ctx.shadowBlur = 5; // Set shadow blur radius
          ctx.shadowOffsetX = 2; // Set shadow offset along the x-axis
          ctx.shadowOffsetY = 2; // Set shadow offset along the y-axis
          lineCoordinates.forEach(point => {
            ctx.lineTo(point.x, point.y);
          });
          ctx.stroke();

          // Scroll to maximize visibility of the drawn line
          const lineBoundingBox = getLineBoundingBox(lineCoordinates);
          containerRef.current.scrollTo(lineBoundingBox.x - 50, lineBoundingBox.y - 50);

          // window.scrollTo(0, 0);
        })
        .catch((err) => {
          toast.error("Error fetching coordinates");
        })
    };
  }, [coordinates]);

  const getLineBoundingBox = (lineCoordinates) => {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    lineCoordinates.forEach(point => {
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
    });

    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  };

  return (
    <>
      <div style={{ "margin-top": "22px" }}></div>
      <div
        ref={containerRef}
        className="scrollable-container scrollable-container-xs-sm" // Add a custom class for xs and sm devices
      >
        <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto', "height": "675px" }} />
      </div>
    </>

  );
};

export default CanvasComponent;
