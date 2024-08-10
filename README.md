# Sales Dashboard Application

## Live Link :- https://sales-dashboard-application.vercel.app

## Project Overview

The Sales Dashboard Application is a React-based web app designed to visualize and analyze sales data. It includes two dashboards:
1. **Today's Sales**: Displays today's sales data with charts and a table.
2. **Sales Comparison Between Two Dates**: Compares sales data between two selected dates with charts and a table.

## Features

- Graphical representation of sales data using Chart.js.
- Tabular data display using AG Grid.
- Date selection for comparison between two dates.
- Responsive design to support various devices.
- Error handling for API requests and data display.

## Technologies Used

- **Frontend**: React, Chart.js, AG Grid, React Router.
- **Styling**: CSS with media queries for responsiveness.
- **Mock Data**: Static JSON files served from the `public` directory.

## Installation and Setup

To run this application locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Anjali9561Gupta/Sales-Dashboard-Application.git
    cd sales-dashboard-app
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the application:**
    ```bash
    npm start
    ```

4. **Open your browser and navigate to:**
    ```
    http://localhost:3000
    ```

## API Integration

This application uses mock data files located in the `public/mockData` directory:

- **Today's Sales**: `public/mockData/today-sales.json`
- **Sales Comparison**: `public/mockData/compare-sales.json`

The data is fetched from these local JSON files and used to populate the charts and tables.

## Usage

### Dashboard 1: Today's Sales

- **Charts**: Displays sales figures for products and categories.
- **Table**: Shows detailed sales information including product name, category, quantity sold, and sales amount.

### Dashboard 2: Sales Comparison Between Two Dates

- **Date Selection**: Users can select two dates to compare sales data.
- **Charts**: Compares sales figures and category sales between the two selected dates.
- **Table**: Displays a comparison of sales amounts and differences between the selected dates.

## Error Handling

- **Loading State**: Displays a loading message while data is being fetched.
- **Error State**: Displays an error message if data fetching fails.

