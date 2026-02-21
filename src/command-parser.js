export function parseCommand(userInput) {
  // TODO: Implement the logic to parse the user input and return an object with the command, subcommand, and arguments

  try {
    if (!userInput || typeof userInput !== 'string') {
      return { command: null, subcommand: null, args: [] };
    }
    const parts = userInput.trim().split(/\s+/);
    return {
      command: parts[0],
      subcommand: parts[1],
      args: parts.slice(2),
    };
  } catch (error) {
    throw new Error('parsing error');
  }
}
