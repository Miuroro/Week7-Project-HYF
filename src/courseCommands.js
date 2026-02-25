import chalk from 'chalk';
import { saveCourseData, loadCourseData, loadTraineeData } from './storage.js';

// Add course
function addCourse(args) {
  const commandArgs = Array.isArray(args) ? args : [];
  const startDate = commandArgs[commandArgs.length - 1];
  const name = commandArgs.slice(0, -1).join(' ').trim();

  if (!name || !startDate) {
    return chalk.red('ERROR: Must provide name and start date');
  }

  const dataRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dataRegex.test(startDate)) {
    return chalk.red('ERROR: Invalid start date. Must be in yyyy-MM-dd format');
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

// Update Courses
function updateCourse() {
  const args = arguments[0];
  const commandArgs = Array.isArray(args) ? args : [];
  const id = commandArgs[0];
  const startDate = commandArgs[commandArgs.length - 1];
  const name = commandArgs.slice(1, -1).join(' ').trim();

  if (!id || !name || !startDate) {
    return chalk.red('ERROR: Must provide ID, name and start date.');
  }

  const numericId = Number(id);
  const courses = loadCourseData();
  const courseIndex = courses.findIndex((course) => course.id === numericId);

  if (Number.isNaN(numericId) || courseIndex === -1) {
    return chalk.red(`ERROR: Course with ID ${id} does not exist`);
  }

  // checking the input for date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const parsedDate = new Date(startDate);
  const isValidIsoDate =
    dateRegex.test(startDate) &&
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === startDate;

  if (!isValidIsoDate) {
    return chalk.red('ERROR: Invalid start date. Must be in yyyy-MM-dd format');
  }

  courses[courseIndex].name = name;
  courses[courseIndex].startDate = startDate;
  saveCourseData(courses);

  return `UPDATED: ${numericId} ${name} ${startDate}`;
}

//delete course starts here
function deleteCourse() {
  const args = arguments[0];
  const commandArgs = Array.isArray(args) ? args : [];
  const id = commandArgs[0];
  const numericId = Number(id);
  const courses = loadCourseData();

  if (!id || Number.isNaN(numericId)) {
    return chalk.red(`ERROR: Course with ID ${id} does not exist`);
  }

  const courseIndex = courses.findIndex((course) => course.id === numericId);

  if (courseIndex === -1) {
    return chalk.red(`ERROR: Course with ID ${id} does not exist`);
  }

  const deletedCourse = courses[courseIndex];
  courses.splice(courseIndex, 1);
  saveCourseData(courses);

  return `DELETED: ${deletedCourse.id} ${deletedCourse.name}`;
}

//join course starts here
function joinCourse() {
  const [courseId, traineeId] = Array.isArray(arguments[0]) ? arguments[0] : [];

  if (!courseId || !traineeId) {
    return chalk.red('ERROR: Must provide course ID and trainee ID');
  }

  const numericCourseId = Number(courseId);
  const numericTraineeId = Number(traineeId);
  const courses = loadCourseData();
  const trainees = loadTraineeData();

  const course = courses.find((item) => item.id === numericCourseId);
  if (Number.isNaN(numericCourseId) || !course) {
    return chalk.red(`ERROR: Course with ID ${courseId} does not exist`);
  }
  const trainee = trainees.find((item) => item.id === numericTraineeId);
  if (Number.isNaN(numericTraineeId) || !trainee) {
    return chalk.red(`ERROR: Trainee with ID ${traineeId} does not exist`);
  }
  //checking the rules to join the course
  const participants = Array.isArray(course.participants)
    ? course.participants
    : (course.participants = []);

  //if the trainee has already join the course return error here
  if (participants.includes(numericTraineeId)) {
    return chalk.red('ERROR: The Trainee has already joined this course');
  }

  //check if the course has already reached the maximum number of participant
  if (participants.length >= 20) {
    return chalk.red('ERROR: The course is full.');
  }

  const traineeCoursesCount = courses.filter(
    (item) =>
      Array.isArray(item.participants) &&
      item.participants.includes(numericTraineeId)
  ).length;

  //checking if the trainee has already joined 5 courses not return error logic
  if (traineeCoursesCount >= 5) {
    return chalk.red(
      'ERROR: A trainee is not allowed to join more than 5 courses.'
    );
  }

  participants.push(numericTraineeId);
  saveCourseData(courses);

  return `${trainee.firstName} ${trainee.lastName} Joined ${course.name}`;
}

//leave course  starts here
function leaveCourse() {
  const [courseId, traineeId] = Array.isArray(arguments[0]) ? arguments[0] : [];

  if (!courseId || !traineeId) {
    return chalk.red('ERROR: Must provide course ID and trainee ID');
  }

  //validating the inputs and checking if the course and trainee exists in the system
  const numericCourseId = Number(courseId);
  const numericTraineeId = Number(traineeId);
  const courses = loadCourseData();
  const trainees = loadTraineeData();

  const course = courses.find((item) => item.id === numericCourseId);
  if (Number.isNaN(numericCourseId) || !course) {
    return chalk.red(`ERROR: Course with ID ${courseId} does not exist`);
  }

  const trainee = trainees.find((item) => item.id === numericTraineeId);
  if (Number.isNaN(numericTraineeId) || !trainee) {
    return chalk.red(`ERROR: Trainee with ID ${traineeId} does not exist`);
  }

  const participants = Array.isArray(course.participants)
    ? course.participants
    : [];

  if (!participants.includes(numericTraineeId)) {
    return chalk.red('ERROR: The Trainee did not join the course');
  }

  const index = participants.indexOf(numericTraineeId);
  participants.splice(index, 1);
  saveCourseData(courses);

  return `${trainee.firstName} ${trainee.lastName} Left ${course.name}`;
}

//Get courses here
function getCourse() {
  const args = arguments[0];
  const commandArgs = Array.isArray(args) ? args : [];
  const id = commandArgs[0];
  const numericId = Number(id);

  const courses = loadCourseData();
  const course = courses.find((item) => item.id === numericId);

  if (!id || Number.isNaN(numericId) || !course) {
    return chalk.red(`ERROR: Course with ID ${id} does not exist`);
  }

  //loading trainee data to get the details of the participants in the course
  const trainees = loadTraineeData();
  const participants = Array.isArray(course.participants)
    ? course.participants
        .map((participantId) =>
          trainees.find((trainee) => trainee.id === participantId)
        )
        .filter(Boolean)
    : [];

  //formatting the output to display course details and participants
  const participantLines = participants
    .map((trainee) => `${trainee.id} ${trainee.firstName} ${trainee.lastName}`)
    .join('\n');

  return `${course.id} ${course.name} ${course.startDate}\nParticipants (${participants.length}):${participantLines ? `\n${participantLines}` : ''}`;
}
//get all courses Subcommand startss
function getAllCourses() {
  const sortedCourses = [...loadCourseData()].sort(
    (left, right) => new Date(left.startDate) - new Date(right.startDate)
  );

  //formatting the output to display course details
  const courseLines = sortedCourses
    .map(({ id, name, startDate, participants = [] }) => {
      const count = participants.length;
      return `${id} ${name} ${startDate} ${chalk.yellow(count)}${count >= 20 ? ` ${chalk.red('FULL')}` : ''}`;
    })
    .join('\n');

  return `\n${chalk.green('Courses:')}\n${courseLines}\n\nTotal: ${chalk.green(sortedCourses.length)}\n`;
}

//exporting main function to handle course commands
export function handleCourseCommand(subcommand, args) {
  const sub = subcommand?.toLowerCase();
  const commandArgs = Array.isArray(args) ? args : [];

  //routing the subcommands to their functions
  if (sub === 'add') {
    return console.log(addCourse(commandArgs));
  }
  if (sub === 'update') {
    return console.log(updateCourse(commandArgs));
  }
  if (sub === 'get') {
    return console.log(getCourse(commandArgs));
  }
  if (sub === 'getall') {
    return console.log(getAllCourses());
  }
  if (sub === 'delete') {
    return console.log(deleteCourse(commandArgs));
  }
  if (sub === 'join') {
    return console.log(joinCourse(commandArgs));
  }
  if (sub === 'leave') {
    return console.log(leaveCourse(commandArgs));
  }
  console.log(chalk.red('ERROR: Unknown subcommand: '), sub);
}

//this export function is only for testing purpose ---> ../tests/course.test.js
export { joinCourse };
