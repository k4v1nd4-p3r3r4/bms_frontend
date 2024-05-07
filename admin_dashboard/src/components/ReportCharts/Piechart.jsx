import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function Piechart() {
  const [data, setData] = useState({});
  const [chartWidth, setChartWidth] = useState(400); // Initial width
  const [chartHeight, setChartHeight] = useState(300); // Initial height

  useEffect(() => {
    fetchAvailableQuantities();
    // Update chart dimensions when window is resized
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchAvailableQuantities = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/materialcharts/getMaterialQty"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching available quantities:", error);
    }
  };

  const handleResize = () => {
    // Update chart dimensions based on container size or screen size
    const containerWidth =
      document.getElementById("piechart-container").offsetWidth;
    // Adjust dimensions as needed based on your requirements
    setChartWidth(containerWidth < 400 ? containerWidth : 400);
    setChartHeight(containerWidth < 400 ? containerWidth * 0.75 : 300); // Maintain aspect ratio
  };

  // Define your green color palette
  const greenColors = [
    "#2E8B57",
    "#3CB371",
    "#32CD32",
    "#228B22",
    "#556B2F",
    "#0BDA51",
    "#478778",
    "#ECFFDC",
    "#C9CC3F",
    "#93C572",
    "#40E0D0",
    "#AAFF00",
    "#DFFF00",
  ];

  return (
    <div
      id="piechart-container"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Chart
        type="donut"
        width={chartWidth}
        height={chartHeight}
        series={Object.values(data)}
        options={{
          labels: Object.keys(data),
          chart: {
            offsetY: 5, // Adjust vertical position of the chart
          },
          colors: greenColors, // Apply the green color palette
        }}
      />
    </div>
  );
}

export default Piechart;
