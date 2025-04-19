import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

interface VisitorData {
  month: string;
  year: number;
  visitors: number;
}

const VisitorChart = () => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      tension: number;
    }[];
  }>({
    labels: [],
    datasets: [],
  });
  useEffect(()=> {
    axios.post("http://localhost:5050/api/visitors/add");
  });
  useEffect(() => {
    axios.get("http://localhost:5050/api/visitors").then((response) => {
      const data: VisitorData[] = response.data;

      const labels = data.map((item) => `${item.month} ${item.year}`);
      const visitors = data.map((item) => item.visitors);

      setChartData({
        labels,
        datasets: [
          {
            label: "Visitors per Month",
            data: visitors,
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            tension: 0.4,
          },
        ],
      });
    });
  }, []);

  return (
    <div>
      <h2>Monthly Visitor Statistics</h2>
      <Line data={chartData} />
    </div>
  );
};

export default VisitorChart;
