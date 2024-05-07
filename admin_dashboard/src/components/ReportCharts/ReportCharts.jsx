import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function ReportCharts() {
  const [foodData, setFoodData] = useState([]);
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    // Fetch total food quantity by date
    axios
      .get("http://127.0.0.1:8000/api/manucharts/getTotalFoodQtyByDate")
      .then((response) => {
        // Sort the data by date
        const sortedFoodData = response.data.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setFoodData(sortedFoodData);
      })
      .catch((error) => {
        console.error("Error fetching food data:", error);
      });

    // Fetch total item quantity by date
    axios
      .get("http://127.0.0.1:8000/api/manucharts/getTotalItemQtyByDate")
      .then((response) => {
        // Sort the data by date
        const sortedItemData = response.data.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setItemData(sortedItemData);
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
      });
  }, []);

  // Combine food and item data into one series array
  const seriesData = [
    {
      name: "Foods",
      data: foodData.map((data) => data.total_qty),
    },
    {
      name: "Hand-Crafts",
      data: itemData.map((data) => data.total_qty),
    },
  ];

  // Options for the chart
  const options = {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    markers: {
      size: 4,
    },
    colors: ["#4154f1", "#2eca6a"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.3,
        opacityTo: 0.04,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      categories: foodData.map((data) => data.date),
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <Chart options={options} series={seriesData} type="area" height={350} />
  );
}

export default ReportCharts;
