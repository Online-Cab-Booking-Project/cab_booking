import React, { useRef, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Col, Row, Button } from 'react-bootstrap'; // Add Button import
import './CanvasComponent.css'; // Import your custom CSS
import axios from 'axios';
import url from '../configs/urlConfig';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollToMax, setScrollToMax] = useState(false);
  const coordinates = useSelector(state => state.coordinate.coordinates)

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = process.env.PUBLIC_URL + 'map.png';
    img.onload = () => {
      // Set canvas dimensions based on the original image size
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Define your line coordinates (replace with your data)
      // const lineCoordinates = [
      //   { x: 153, y: 247 },
      //   { x: 165, y: 363 },
      //   { x: 258, y: 362 },
      //   { x: 392, y: 423 },
      //   { x: 491, y: 492 },
      //   // Add more points as needed
      // ];

      axios.post("http://192.168.1.6:8080/passenger/bookRide",
        {
          sourceX: "93",
          sourceY: "135",
          destX: "915",
          destY: "400"
        }
        // coordinates
        ,
        {
          headers: {
            "Authorization": "Bearer" + window.sessionStorage.getItem("JWT_TOKEN")
          }
        })
        .then((res) => {
          toast.success("Coordinates fetched");

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
          if (scrollToMax) {
            const lineBoundingBox = getLineBoundingBox(lineCoordinates);
            containerRef.current.scrollTo(lineBoundingBox.x - 50, lineBoundingBox.y - 50);
            setScrollToMax(false);
          }
        })
        .catch((err) => {
          toast.error("Error fetching coordinates");
        })
    };
  }, [scrollToMax]);

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

  const handleAutoScroll = () => {
    setScrollToMax(true);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={10} lg={10}>
          <div
            ref={containerRef}
            className="scrollable-container scrollable-container-xs-sm" // Add a custom class for xs and sm devices
          >
            <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto' }} />
          </div>
          <Button onClick={handleAutoScroll}>Auto Scroll</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CanvasComponent;
