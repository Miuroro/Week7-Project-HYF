import { saveTraineeData, loadTraineeData, loadCourseData } from './storage.js';
import chalk from 'chalk';

export function addTrainee(firstName, lastName) {
  // trim first name and last name to reject empty strings with only spaces
  const trimmedFirstName = firstName?.trim();
  const trimmedLastName = lastName?.trim();

  if (!trimmedFirstName || !trimmedLastName) {
    console.log(chalk.red('ERROR: Must provide first name and last name'));
    return false;
  }

  // check if first name and last name contain only letters (no numbers, spaces, or special characters)
  const nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(trimmedFirstName) || !nameRegex.test(trimmedLastName)) {
    console.log(
      chalk.red('ERROR: First name and last name must contain only letters')
    );
    return false;
  }

  const trainees = loadTraineeData();
  // keeps generating new id between 0 and 99999 until ID is unique in existing trainees.
  let newId = Math.floor(Math.random() * 100000);
  while (trainees.some((trainee) => trainee.id === newId)) {
    newId = Math.floor(Math.random() * 100000);
  }

  const newTrainee = {
    id: newId,
    firstName: trimmedFirstName,
    lastName: trimmedLastName,
  };

  trainees.push(newTrainee);
  saveTraineeData(trainees);
  return `CREATED: ${newId} ${trimmedFirstName} ${trimmedLastName}`;
}

export function updateTrainee(id, firstName, lastName) {
  // trim first name and last name to reject empty strings with only spaces
  const trimmedFirstName = firstName?.trim();
  const trimmedLastName = lastName?.trim();
  const numericId = Number(id);

  // check if id is provided and is a number, and first name and last name are provided
  if (
    id === undefined ||
    id === null ||
    id === '' ||
    !trimmedFirstName ||
    !trimmedLastName
  ) {
    console.log(chalk.red('ERROR: Must provide ID, first name and last name'));
    return false;
  }

  // check if id is a number
  if (Number.isNaN(numericId)) {
    console.log(chalk.red(`ERROR: invalid ID must be a number`));
    return false;
  }

  const trainees = loadTraineeData();
  const traineeIndex = trainees.findIndex(
    (trainee) => trainee.id === numericId
  );

  // check if trainee with the given ID exists
  if (traineeIndex === -1) {
    console.log(
      chalk.red(`ERROR: Trainee with ID ${numericId} does not exist`)
    );
    return false;
  }
  // check if first name and last name contain only letters
  const nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(trimmedFirstName) || !nameRegex.test(trimmedLastName)) {
    console.log(
      chalk.red('ERROR: First name and last name must contain only letters')
    );
    return false;
  }

  // if the trainee is found, we update the first name and last name of the trainee.
  trainees[traineeIndex].id = numericId;
  trainees[traineeIndex].firstName = trimmedFirstName;
  trainees[traineeIndex].lastName = trimmedLastName;
  saveTraineeData(trainees);
  return `UPDATED: ${numericId} ${trimmedFirstName} ${trimmedLastName}`;
}

export function deleteTrainee(id) {
  const trainees = loadTraineeData();
  const numericId = Number(id);

  // check if id is a number
  if (Number.isNaN(numericId)) {
    console.log(chalk.red(`ERROR: invalid ID must be a number`));
    return false;
  }

  // find the index of the trainee with the given ID
  const traineeIndex = trainees.findIndex(
    (trainee) => trainee.id === numericId
  );

  // check if trainee with the given ID exists
  if (traineeIndex === -1) {
    console.log(chalk.red(`ERROR: Trainee with ID ${id} does not exist`));
    return false;
  }
  // if the trainee is found, remove from the array and save the updated array back to the file.
  const deletedTrainee = trainees[traineeIndex];
  trainees.splice(traineeIndex, 1);
  saveTraineeData(trainees);
  console.log(
    `DELETED: ${deletedTrainee.id} ${deletedTrainee.firstName} ${deletedTrainee.lastName}`
  );
  return true;
}

export function fetchTrainee(id) {
  const numericId = Number(id);
  // check if id is provided and is a number
  if (Number.isNaN(numericId)) {
    console.log(chalk.red(`ERROR: invalid ID must be a number`));
    return false;
  }
  // check if trainee with the given ID exists
  const trainees = loadTraineeData();
  const trainee = trainees.find((item) => item.id === numericId);
  if (trainee === undefined) {
    console.log(chalk.red(`ERROR: Trainee with ID ${id} does not exist`));
    return false;
  }

  const courses = loadCourseData();
  const participantCourses = courses
    .filter(
      (course) =>
        Array.isArray(course.participants) &&
        course.participants.includes(trainee.id)
    )
    .map((course) => course.name);

  console.log(`${trainee.id} ${trainee.firstName} ${trainee.lastName}`);
  console.log(
    `Courses: ${
      participantCourses.length > 0
        ? participantCourses.join(', ')
        : chalk.yellow('None')
    }`
  );
  return true;
}

export function fetchAllTrainees() {
  const trainees = loadTraineeData();
  // sort trainees by last name, then by first name
  const sortedTrainees = [...trainees].sort((left, right) => {
    const lastNameCompare = left.lastName.localeCompare(right.lastName); // compare last names first
    if (lastNameCompare !== 0) {
      return lastNameCompare;
    }
    return left.firstName.localeCompare(right.firstName); // if last names are equal, compare first names
  });

  console.log('');
  console.log(chalk.green('Trainees:'));
  sortedTrainees.forEach((trainee) => {
    console.log(`${trainee.id} ${trainee.firstName} ${trainee.lastName}`);
  });
  console.log('');
  console.log(`Total: ${chalk.green(sortedTrainees.length)}`);
  console.log('');

  return true;
}

// Bonus commands : trainee search.
export function getTraineeQuery(query) {
  const normalizedQuery = query?.trim().toLowerCase();

  if (!normalizedQuery) {
    console.log(chalk.red('ERROR: Must provide a query'));
    return false;
  }

  const trainees = loadTraineeData();
  const matchedTrainees = trainees.filter(
    (trainee) =>
      trainee.firstName.toLowerCase().includes(normalizedQuery) ||
      trainee.lastName.toLowerCase().includes(normalizedQuery)
  );
  console.log('');
  console.log(chalk.cyan('Results:'));
  matchedTrainees.forEach((trainee) => {
    console.log(`${trainee.id} ${trainee.firstName} ${trainee.lastName}`);
  });
  console.log('');
  console.log(`Total: ${chalk.green(matchedTrainees.length)}`);
  console.log('');

  return true;
}

export function handleTraineeCommand(subcommand, args) {
  const sub = subcommand?.toLowerCase();
  const commandArgs = Array.isArray(args) ? args : [];

  const result =
    sub === 'add'
      ? addTrainee(commandArgs[0], commandArgs[1])
      : sub === 'update'
        ? updateTrainee(commandArgs[0], commandArgs[1], commandArgs[2])
        : sub === 'delete'
          ? deleteTrainee(commandArgs[0])
          : sub === 'get'
            ? fetchTrainee(commandArgs[0])
            : sub === 'getall'
              ? fetchAllTrainees()
              : sub === 'search'
                ? getTraineeQuery(commandArgs.join(' '))
                : null;

  if (typeof result === 'string') {
    console.log(result);
    return;
  }

  if (result === null) {
    console.log(chalk.red('Unknown subcommand:'), subcommand);
  }
}
