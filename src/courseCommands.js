import { saveCourseData, loadCourseData } from './storage.js';

function addCourse(args) {
  // TODO: Implement logic
  const name = args[0];
  const startDate = args[1];

  // we will check now for validation
  if (!name || !startDate) {
    return 'ERROR: Must provide name and start date';
  }
  //checking for date format is correct or not (yyyy-mm-dd)
  const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dataRegex.test(startDate)) {
    return 'ERROR: Invalid start date. Must be in yyyy-MM-dd format';
  }

  const courses = loadCourseData();
  const newId = Math.floor(Math.random() * 100000);

  const newCourse = {
    id: newId,
    name: name,
    startDate: startDate,
    participants: [],
  };

  courses.push(newCourse);
  saveCourseData(courses);

  return `CREATED: ${newId} ${name} ${startDate}`;
}

function updateCourse() {
  // TODO: Implement logic
}

function deleteCourse() {
  // TODO: Implement logic
}

function joinCourse() {
  // TODO: Implement logic
}

function leaveCourse() {
  // TODO: Implement logic
}

function getCourse() {
  // TODO: Implement logic
}

function getAllCourses() {
  // TODO: Implement logic
}

export function handleCourseCommand(command) {
  const sub = command.subcommand?.toLowerCase();
  const args = command.args;
  // Read the subcommand and call the appropriate function with the arguments
  if (sub === 'add') {
    return console.log(addCourse(args));
  }
  console.log('unknown subcommand: ', sub);
}
