
import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './Dashboard1.css'; // Import CSS
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement, // Register LineElement for line charts
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard1 = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
   fetch('http://localhost:3000/mockData/today-sales.json')
      .then(response => response.json())
      .then(data => {
        setSalesData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const productSales = salesData.map(item => ({ name: item.product, value: item.sales }));
  const categorySales = salesData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.sales;
    return acc;
  }, {});

  const productChartData = {
    labels: productSales.map(item => item.name),
    datasets: [{
      label: 'Sales',
      data: productSales.map(item => item.value),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const categoryChartData = {
    labels: Object.keys(categorySales),
    datasets: [{
      label: 'Sales by Category',
      data: Object.values(categorySales),
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    }],
  };

  const lineChartData = {
    labels: ['January', 'February', 'March', 'April'], // Example labels
    datasets: [
      {
        label: 'Sales Over Time',
        data: [30, 45, 60, 20],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'category'
      },
      y: {
        type: 'linear'
      }
    }
  };

  const columnDefs = [
    { headerName: 'Product Name', field: 'product' },
    { headerName: 'Category', field: 'category' },
    { headerName: 'Quantity Sold', field: 'quantity' },
    { headerName: 'Sales Amount', field: 'sales' },
  ];

  const rowData = salesData;

  return (
    <div className="dashboard-container">
      <h1>Today's Sales</h1>
      {loading ? <p>Loading...</p> : (
        <>
          <div className="chart-container">
            <div className="chart-item">
              <Bar data={productChartData} options={{ responsive: true }} />
            </div>
            <div className="chart-item">
              <Pie data={categoryChartData} options={{ responsive: true }} />
            </div>
            <div className="chart-item">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>
          <div className="ag-theme-alpine">
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination
              filter
              sortable
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard1;

