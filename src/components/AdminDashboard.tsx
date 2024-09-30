import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Sales',
      backgroundColor: '#a8dadc',
      borderColor: '#457b9d',
      borderWidth: 1,
      hoverBackgroundColor: '#f1faee',
      hoverBorderColor: '#1d3557',
      data: [65, 59, 80, 81, 56],
    },
  ],
};

export default function AdminDashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Bar data={data} />
    </div>
  );
}
