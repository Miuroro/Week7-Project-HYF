import { parseCommand } from './command-parser.js';
import { handleTraineeCommand } from './traineeCommands.js';

// This is the entry point of your application.
// Ask user for input, parse the command, and call the appropriate handler.

const parsed = parseCommand();

if (parsed && parsed.command?.toLowerCase() === 'trainee') {
  handleTraineeCommand(parsed.subcommand?.toLowerCase(), parsed.args);
}
