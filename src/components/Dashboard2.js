
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './Dashboard2.css'; // Import CSS
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement, 
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard2 = () => {
  const [salesData, setSalesData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (startDate && endDate) {
      fetch(`http://localhost:3000/mockData/today-sales.json?startDate=${startDate}&endDate=${endDate}`)
        .then(response => response.json())
        .then(data => {
          setSalesData(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [startDate, endDate]);

  const productComparisonData = {
    labels: salesData.map(item => item.product),
    datasets: [
      {
        label: `Sales on ${startDate}`,
        data: salesData.map(item => item.salesDate1),
        borderColor: 'blue',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
      {
        label: `Sales on ${endDate}`,
        data: salesData.map(item => item.salesDate2),
        borderColor: 'green',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
      },
    ],
  };

  const categoryComparisonData = {
    labels: salesData.map(item => item.category),
    datasets: [
      {
        label: `Sales on ${startDate}`,
        data: salesData.map(item => item.categorySalesDate1),
        borderColor: 'blue',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
      {
        label: `Sales on ${endDate}`,
        data: salesData.map(item => item.categorySalesDate2),
        borderColor: 'green',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
      },
    ],
  };

  const columnDefs = [
    { headerName: 'Product Name', field: 'product' },
    { headerName: 'Category', field: 'category' },
    { headerName: 'Date 1 Sales Amount', field: 'salesDate1' },
    { headerName: 'Date 2 Sales Amount', field: 'salesDate2' },
    { headerName: 'Difference', field: 'difference' },
  ];

  const rowData = salesData.map(item => ({
    product: item.product,
    category: item.category,
    salesDate1: item.salesDate1,
    salesDate2: item.salesDate2,
    difference: item.salesDate2 - item.salesDate1,
  }));

  return (
    <div className="dashboard-container">
      <h1>Sales Comparison Between Two Dates</h1>
      <div className="date-picker-container">
        <input type="date" onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" onChange={(e) => setEndDate(e.target.value)} />
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="chart-container">
          <Line data={productComparisonData} options={{ responsive: true }} />
          <Line data={categoryComparisonData} options={{ responsive: true }} />
        </div>
      )}
      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination
          filter
          sortable
        />
      </div>
    </div>
  );
};

export default Dashboard2;

