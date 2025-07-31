import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}


export function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Get the time difference in milliseconds
  const timeDiff = d2.getTime() - d1.getTime();

  // Convert milliseconds to full days
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return dayDiff;
}


export function getChartData(startDate, endDate) {
  const start = new Date(startDate);
  const now = new Date();

  // If no end date, assume +50 days
  const end = endDate
    ? new Date(endDate)
    : new Date(start.getTime() + 50 * 24 * 60 * 60 * 1000);

  const elapsed = Math.floor((now - start) / (1000 * 60 * 60 * 24)); // in days
  const totalDuration = Math.floor((end - start) / (1000 * 60 * 60 * 24));

  const percent = Math.min((elapsed / totalDuration) * 100, 100);

  return [
    {
      name: 'Elapsed',
      visitors: percent,
      elapse: elapsed,
      fill: 'var(--color-safari)',
    },
  ];
}


export function generateChartData2(project) {
  const today = new Date();
  const projectStart = new Date(project.start_date);

  // If no due date, assume +50 days
  const projectEnd = project.due_date
    ? new Date(project.due_date)
    : new Date(projectStart.getTime() + 50 * 24 * 60 * 60 * 1000);

  const totalProjectDays = Math.max(
    Math.floor((projectEnd - projectStart) / (1000 * 60 * 60 * 24)),
    1
  );

  const colorVars = ['--chart-2', '--chart-3', '--chart-4', '--chart-5', '--chart-6'];

  const data = [
    {
      browser: 'project',
      visitors: 100,
      fill: 'var(--chart-1)', 
    },
  ];

  const config = {
    visitors: { label: 'Progress' },
    project: { label: 'Project', color: 'var(--chart-1)' },
  };

  project.users?.forEach((user, index) => {
    const pivot = user.pivot;
    const userStart = new Date(pivot.start_date);
    const userEnd = pivot.end_date ? new Date(pivot.end_date) : today;

    const userDays = Math.max(
      Math.floor((userEnd - userStart) / (1000 * 60 * 60 * 24)),
      0
    );
    const percent = Math.min(Math.round((userDays / totalProjectDays) * 100), 100);
    const color = `var(${colorVars[index % colorVars.length]})`;
console.log(percent)
    data.push({
      browser: user.name,
      visitors: percent,
      fill: color,
    });

    config[user.name] = {
      label: user.name,
      color,
    };
  });

  console.log(data)

  return { data, config };
}



export function calculateWorkloadPercentage(userProjectsCount, totalProjects) {
  if (totalProjects === 0) return 0;

  return ((userProjectsCount / totalProjects) * 100).toFixed(1); // returns a string like "23.5"
}
