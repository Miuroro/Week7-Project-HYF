import { saveTraineeData, loadTraineeData } from './storage.js';

function addTrainee(firstName, lastName) {
  const trainees = loadTraineeData();
  // Generate a unique ID for the new trainee
  const newId = Math.floor(Math.random() * 100000); // 0 to 99999

  const newTrainee = {
    id: newId,
    firstName,
    lastName,
  };

  trainees.push(newTrainee);
  saveTraineeData(trainees);
  console.log(`TRAINEE ADD ${firstName} ${lastName}`);
}

function updateTrainee() {
  // TODO: Implement the logic
}
function deleteTrainee() {
  // TODO: Implement the logic
}

function fetchTrainee() {
  // TODO: Implement the logic
}

function fetchAllTrainees() {
  // TODO: Implement the logic
}

export function handleTraineeCommand(subcommand, args) {
  // Read the subcommand and call the appropriate function with the arguments
  if (subcommand === 'add') {
    const [firstName, lastName] = args;
    addTrainee(firstName, lastName);
  }
}
