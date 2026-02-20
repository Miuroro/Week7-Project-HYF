import promptSync from 'prompt-sync';
const prompt = promptSync();

export function parseCommand() {
  const firstName = prompt('Enter first name: ');
  const lastName = prompt('Enter last name: ');

  if (typeof firstName !== 'string' || typeof lastName !== 'string') {
    return null;
  }

  const command = 'trainee';
  const subcommand = 'add';
  const args = [firstName, lastName];

  return {
    command,
    subcommand,
    args,
  };
}
