import { parseCommand } from './command-parser.js';
import { handleCourseCommand } from './courseCommands.js';
import { handleTraineeCommand } from './traineeCommands.js';
import { loadTraineeData, loadCourseData } from './storage.js';
import { generateExportHtml } from './exportHtml.js';
import promptSync from 'prompt-sync';
import chalk from 'chalk';
import fs from 'node:fs';

// Initialize prompt-sync for user input
const prompt = promptSync({ sigint: true });

process.on('SIGINT', () => {
  process.exit(0);
});

console.log(chalk.gray('Tip: type quit, q, or press Ctrl + C to exit.'));

while (true) {
  const userInput = prompt('Enter command: ').trim();

  if (!userInput) {
    continue;
  }

  const lowerInput = userInput.toLowerCase();
  if (lowerInput === 'q' || lowerInput === 'quit') {
    process.exit(0);
  }

  try {
    const command = parseCommand(userInput);

    switch (command.command?.toLowerCase()) {
      case 'course':
        handleCourseCommand(command.subcommand, command.args);
        break;

      case 'trainee':
        handleTraineeCommand(command.subcommand, command.args);
        break;

      case 'export':
        if (command.subcommand === 'html') {
          const fileName = command.args[0];
          if (!fileName) {
            console.log('ERROR: Must provide a file name');
            break;
          }
          try {
            const trainees = loadTraineeData();
            const courses = loadCourseData();
            const html = generateExportHtml(trainees, courses);
            fs.writeFileSync(fileName, html, 'utf8');
            console.log(`SAVED ${fileName}`);
          } catch (err) {
            console.log('ERROR:', err.message);
          }
        } else {
          console.log(chalk.red('Unknown export type:'), command.subcommand);
        }
        break;
      default:
        console.log(chalk.red('Unknown command:'), command.command);
    }
  } catch (err) {
    console.error(chalk.red('Error:'), err.message);
  }
}
