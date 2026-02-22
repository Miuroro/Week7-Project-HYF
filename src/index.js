import { parseCommand } from './command-parser.js';
import { handleCourseCommand } from './courseCommands.js';
import { handleTraineeCommand } from './traineeCommands.js';
import promptSync from 'prompt-sync';
import chalk from 'chalk';

// Initialize prompt-sync for user input
const prompt = promptSync();

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
        handleCourseCommand(command);
        break;

      case 'trainee':
        handleTraineeCommand(command.subcommand, command.args);
        break;

      default:
        console.log(chalk.red('Unknown command:'), command.command);
    }
  } catch (err) {
    console.error(chalk.red('Error:'), err.message);
  }
}
