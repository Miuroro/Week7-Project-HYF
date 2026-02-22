//parse command from user input
export function parseCommand(userInput) {
  if (typeof userInput !== 'string' || !userInput.trim()) {
    return { command: null, subcommand: null, args: [] };
  }

  const parts = userInput.trim().split(/\n/);

  return {
    command: parts[0]?.toLowerCase() ?? null,
    subcommand: parts[1]?.toLowerCase() ?? null,
    args: parts.slice(2),
  };
}
