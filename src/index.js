import { parseCommand } from './command-parser.js';
import { handleCourseCommand } from './courseCommands.js';
import { handleTraineeCommand } from './traineeCommands.js';
import fs from 'node:fs';

// AI generated HTML for data visualization
export function generateHTML(courses) {
  const rows = courses
    .map(
      (c) => `
        <tr>
            <td style="border:1px solid #ddd; padding:8px;">${c.id}</td>
            <td style="border:1px solid #ddd; padding:8px;">${c.name}</td>
            <td style="border:1px solid #ddd; padding:8px;">${c.startDate}</td>
        </tr>
    `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Course Overview</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th { background: #f4f4f4; padding: 10px; border: 1px solid #ddd; }
        </style>
    </head>
    <body>
        <h1>Course Overview</h1>
        <table>
            <tr>
                <th>ID</th>
                <th>Course Name</th>
                <th>Start Date</th>
            </tr>
            ${rows}
        </table>
    </body>
    </html>
    `;
}

// user input from command line starts from here
const userInput = process.argv.slice(2).join(' ');

if (!userInput) {
  console.log(
    'No command provided. Try: course add --name JS --duration 4weeks'
  );
  process.exit(0);
}

try {
  const command = parseCommand(userInput);

  switch (command.command?.toLowerCase()) {
    case 'course':
      handleCourseCommand(command);
      break;

    case 'trainee':
      handleTraineeCommand(command);
      break;

    default:
      console.log('Unknown command:', command.command);
  }
} catch (err) {
  console.error('Error:', err.message);
}
