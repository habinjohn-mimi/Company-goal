# Company Goal Tracker

A comprehensive web application for tracking organizational goals, subgoals, department allocations, and employee performance. Built with HTML, CSS, and JavaScript.

## Features

### 🎯 Goal Management
- **Top-Level Goals**: Define organizational goals with name, description, value, and time period
- **Subgoals**: Break down goals into subgoals with percentage allocations (must total 100%)
- **Flexible Time Periods**: Support for quarterly and annual goals

### 🏢 Department & Employee Management
- **Department Configuration**: Add and manage departments
- **Employee Assignment**: Assign employees to departments
- **Overlapping Allocations**: Departments can contribute to multiple subgoals
- **Individual Contributions**: Track employee contributions to specific goals

### 📊 Progress Tracking
- **Real-time Progress**: Update progress for each subgoal
- **Auto-aggregation**: Automatic calculation of department and company-level progress
- **Performance Indicators**: Visual indicators for on-track, warning, and at-risk areas
- **Progress Notes**: Add notes to track progress updates

### 📈 Data Visualization
- **Dashboard Overview**: Key metrics and performance indicators
- **Progress Charts**: Visual representation of goal progress
- **Department Performance**: Department-wise performance tracking
- **Problem Area Highlighting**: Automatic identification of underperforming areas

### 🔧 Configuration & Customization
- **Flexible Structure**: Define your own goals, subgoals, departments, and team structure
- **Local Storage**: Data persistence using browser localStorage
- **Export Functionality**: Export reports as CSV files

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Download or clone the repository
2. Open `index.html` in your web browser
3. Start configuring your organizational goals!

## Usage Guide

### 1. Initial Setup
1. Click the **Configuration** button in the header
2. Add your departments (e.g., Sales, Marketing, Operations)
3. Add employees and assign them to departments
4. Close the configuration modal

### 2. Creating Goals
1. Click **Add New Goal** button
2. Fill in the goal details:
   - **Goal Name**: e.g., "Achieve $5 Million in Revenue"
   - **Total Value**: e.g., 5000000
   - **Time Period**: Select quarter or annual
   - **Year**: Set the target year
   - **Description**: Detailed description of the goal

### 3. Adding Subgoals
1. Click **Add Subgoal** in the goal form
2. For each subgoal, specify:
   - **Subgoal Name**: e.g., "Customer Retention"
   - **Percentage**: e.g., 25% (must total 100% across all subgoals)
3. Add department allocations for each subgoal:
   - Select departments that contribute
   - Assign percentage responsibility
   - Multiple departments can contribute to the same subgoal

### 4. Tracking Progress
1. Click **Progress** button on any goal card
2. Update the current progress percentage for each subgoal
3. Add notes about progress updates
4. Save to update the dashboard

### 5. Monitoring Performance
- **Dashboard Overview**: View overall progress, active goals, and problem areas
- **Goal Cards**: Expand to see detailed subgoal breakdown
- **Charts**: Visual representation of progress and department performance
- **Problem Areas**: Automatically highlighted when progress falls below 70%

### 6. Exporting Reports
1. Click **Export Report** in the header
2. Download CSV file with detailed progress information
3. Use for presentations, meetings, or further analysis

## Data Structure

### Goal Structure
```javascript
{
  id: number,
  name: string,
  value: number,
  period: string, // "Q1", "Q2", "Q3", "Q4", "Annual"
  year: number,
  description: string,
  subgoals: [
    {
      id: string,
      name: string,
      percentage: number,
      allocations: [
        {
          departmentId: number,
          percentage: number
        }
      ]
    }
  ],
  progress: {
    [subgoalId]: number // progress percentage
  },
  notes: {
    [subgoalId]: string // progress notes
  }
}
```

### Department Structure
```javascript
{
  id: number,
  name: string
}
```

### Employee Structure
```javascript
{
  id: number,
  name: string,
  departmentId: number,
  contributions: {} // employee-specific goal contributions
}
```

## Key Features Explained

### Percentage Validation
- Subgoal percentages must equal exactly 100%
- Real-time validation with visual feedback
- Department allocations can exceed 100% (overlapping allowed)

### Progress Calculation
- **Subgoal Progress**: Direct input from user
- **Goal Progress**: Weighted average of subgoal progress
- **Department Progress**: Average of all subgoals the department contributes to
- **Company Progress**: Average of all goal progress

### Problem Area Detection
- **At Risk**: Progress below 50% (red indicator)
- **Warning**: Progress between 50-70% (yellow indicator)
- **On Track**: Progress above 70% (green indicator)

### Data Persistence
- All data stored in browser localStorage
- No server required
- Data persists between browser sessions
- Export functionality for backup

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## File Structure

```
company-goal-tracker/
├── index.html          # Main application file
├── styles.css          # Custom styles and animations
├── script.js           # Application logic and functionality
└── README.md           # This documentation
```

## Customization

### Adding New Features
The modular structure makes it easy to extend:
- Add new chart types in the `initializeCharts()` method
- Implement new export formats in the `exportReport()` method
- Add additional validation rules in form handlers

### Styling
- Uses Tailwind CSS for utility classes
- Custom CSS in `styles.css` for specific styling
- Responsive design for mobile and desktop

### Data Storage
- Currently uses localStorage for simplicity
- Can be easily modified to use a backend API
- Export/import functionality for data migration

## Troubleshooting

### Common Issues

1. **Subgoal percentages don't equal 100%**
   - Ensure all subgoal percentages add up to exactly 100%
   - Check for decimal precision issues

2. **Charts not displaying**
   - Ensure Chart.js is loaded properly
   - Check browser console for JavaScript errors

3. **Data not persisting**
   - Check if localStorage is enabled in your browser
   - Clear browser cache if needed

4. **Export not working**
   - Ensure browser supports Blob API
   - Check if popup blockers are enabled

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Ensure all files are properly loaded
4. Try clearing browser cache and localStorage

---

**Happy Goal Tracking! 🎯** 