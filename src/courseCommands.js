import chalk from 'chalk';
import { saveCourseData, loadCourseData, loadTraineeData } from './storage.js';

// ADD COURSE COMMANDS STARTS HERE: ADDING COURSE TO THE SYSTEM
function addCourse(args) {
  const commandArgs = Array.isArray(args) ? args : [];
  const startDate = commandArgs[commandArgs.length - 1];
  const name = commandArgs.slice(0, -1).join(' ').trim();

  if (!name || !startDate) {
    return chalk.red('ERROR: Must provide name and start date');
  }

  //CHECKING IF THE START DATE IS IN THE CORRECT FORMAT
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
    participants: [], //INITIALIZING PARTICIPANTS AS AN EMPTY ARRAY
  };
  courses.push(newCourse);
  saveCourseData(courses); //SAVING THE NEW COURSE TO THE STORAGE

  return `CREATED: ${newId} ${name} ${startDate}`;
}

//UPDATE COURSE COMMAND STARTS HERE
function updateCourse() {
  const commandArgs = Array.isArray(args) ? args : [];
  const id = commandArgs[0];
  const startDate = commandArgs[commandArgs.length - 1];
  const name = commandArgs.slice(1, -1).join(' ').trim();

  //VALIDATING THE INPUTS
  if (!id || !name || !startDate) {
    return chalk.red('ERROR: Must provide ID, name and start date.');
  }

  const numericId = Number(id);
  const courses = loadCourseData();
  const courseIndex = courses.findIndex((course) => course.id === numericId);

  if (Number.isNaN(numericId) || courseIndex === -1) {
    return chalk.red(`ERROR: Course with ID ${id} does not exist`);
  }
  //CHECKING IF THE START DATE IS IN THE CORRECT FORMAT
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const parsedDate = new Date(startDate);
  const isValidIsoDate =
    dateRegex.test(startDate) &&
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === startDate;

  if (!isValidIsoDate) {
    return chalk.red('ERROR: Invalid start date. Must be in yyyy-MM-dd format');
  }
  //UPDATING THE COURSE DETAILS IN THE SYSTEM
  courses[courseIndex].name = name;
  courses[courseIndex].startDate = startDate;
  saveCourseData(courses);

  return `UPDATED: ${numericId} ${name} ${startDate}`;
}

//DELETE COURSE COMMAND
function deleteCourse() {
  const args = arguments[0];
  const commandArgs = Array.isArray(args) ? args : [];
  const id = commandArgs[0];
  const numericId = Number(id);
  const courses = loadCourseData();
  //VALIDATING THE INPUTS
  if (!id || Number.isNaN(numericId)) {
    return chalk.red(`ERROR: Course with ID ${id} does not exist`);
  }

  const courseIndex = courses.findIndex((course) => course.id === numericId);

  if (courseIndex === -1) {
    return chalk.red(`ERROR: Course with ID ${id} does not exist`);
  }

  const deletedCourse = courses[courseIndex]; //STORING THE DELETED COURSE DETAILS BEFORE REMOVING IT FROM THE SYSTEM
  courses.splice(courseIndex, 1);
  saveCourseData(courses);

  return `DELETED: ${deletedCourse.id} ${deletedCourse.name}`;
}

//JOIN COURSE COMMAND STARTS HERE
function joinCourse() {
  const [courseId, traineeId] = Array.isArray(arguments[0]) ? arguments[0] : [];
  //VALIDATING THE INPUTS
  if (!courseId || !traineeId) {
    return chalk.red('ERROR: Must provide course ID and trainee ID');
  }

  const numericCourseId = Number(courseId);
  const numericTraineeId = Number(traineeId);
  const courses = loadCourseData();
  const trainees = loadTraineeData();
  //CKECKING IF THE COURSE AND TRAINEE EXIST IN THE SYSTEM
  const course = courses.find((item) => item.id === numericCourseId);
  if (Number.isNaN(numericCourseId) || !course) {
    return chalk.red(`ERROR: Course with ID ${courseId} does not exist`);
  }
  //TRAINEE CHECK TO SEE IF THE TRAINEE EXISTS IN THE SYSTEM
  const trainee = trainees.find((item) => item.id === numericTraineeId);
  if (Number.isNaN(numericTraineeId) || !trainee) {
    return chalk.red(`ERROR: Trainee with ID ${traineeId} does not exist`);
  }
  //CHECKING THE RULES FOR JOINING THE COURSE
  const participants = Array.isArray(course.participants)
    ? course.participants
    : (course.participants = []);
  //IF THE TRAINEE HAS ALREADY JOINED THE COURSE, THEN RETURN AN ERROR
  if (participants.includes(numericTraineeId)) {
    return chalk.red('ERROR: The Trainee has already joined this course');
  }
  //IF THE COURSE HAS ALREADY REACHED THE MAXIMUM NUMBER OF PARTICIPANTS, THEN RETURN AN ERROR
  if (participants.length >= 20) {
    return chalk.red('ERROR: The course is full.');
  }

  const traineeCoursesCount = courses.filter(
    (item) =>
      Array.isArray(item.participants) &&
      item.participants.includes(numericTraineeId)
  ).length;
  //IF THE TRAINEE HAS ALREADY JOINED 5 COURSES, THEN RETURN AN ERROR:BUSSINESS RULE CHECK!
  if (traineeCoursesCount >= 5) {
    return chalk.red(
      'ERROR: A trainee is not allowed to join more than 5 courses.'
    );
  }

  participants.push(numericTraineeId);
  saveCourseData(courses);

  return `${trainee.firstName} ${trainee.lastName} Joined ${course.name}`;
}
//LEAVE COURSE COMMAND
function leaveCourse() {
  const [courseId, traineeId] = Array.isArray(arguments[0]) ? arguments[0] : [];

  if (!courseId || !traineeId) {
    return chalk.red('ERROR: Must provide course ID and trainee ID');
  }
  //VALIDATING THE INPUTS AND CHECKING IF THE COURSE AND TRAINEE EXIST IN THE SYSTEM
  const numericCourseId = Number(courseId);
  const numericTraineeId = Number(traineeId);
  const courses = loadCourseData();
  const trainees = loadTraineeData();

  const course = courses.find((item) => item.id === numericCourseId);
  if (Number.isNaN(numericCourseId) || !course) {
    return chalk.red(`ERROR: Course with ID ${courseId} does not exist`);
  }
  //TRAINEE CHECK TO SEE IF THE TRAINEE EXISTS IN THE SYSTEM
  const trainee = trainees.find((item) => item.id === numericTraineeId);
  if (Number.isNaN(numericTraineeId) || !trainee) {
    return chalk.red(`ERROR: Trainee with ID ${traineeId} does not exist`);
  }

  const participants = Array.isArray(course.participants)
    ? course.participants
    : [];
  //CHECKING IF THE TRAINEE HAS JOINED THE COURSE BEFORE LEAVING IT
  if (!participants.includes(numericTraineeId)) {
    return chalk.red('ERROR: The Trainee did not join the course');
  }
  //REMOVING THE TRAINEE FROM THE COURSE PARTICIPANTS
  const index = participants.indexOf(numericTraineeId);
  participants.splice(index, 1);
  saveCourseData(courses);

  return `${trainee.firstName} ${trainee.lastName} Left ${course.name}`;
}

//GET COURSE COMMAND
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
  //LOADING TRAINEE DATA TO GET THE DETAILS OF THE PARTICIPANTS IN THE COURSE
  const trainees = loadTraineeData();
  const participants = Array.isArray(course.participants)
    ? course.participants
        .map((participantId) =>
          trainees.find((trainee) => trainee.id === participantId)
        )
        .filter(Boolean)
    : [];
  //FORMATTING THE OUTPUT TO DISPLAY COURSE DETAILS AND PARTICIPANTS
  const participantLines = participants
    .map(
      (trainee) => `- ${trainee.id} ${trainee.firstName} ${trainee.lastName}`
    )
    .join('\n');

  return `${course.id} ${course.name} ${course.startDate}\nParticipants (${participants.length}):${participantLines ? `\n${participantLines}` : ''}`;
}

//GET ALL COURSES COMMAND TO SEE ALL COURSES IN THE SYSTEM
function getAllCourses() {
  const sortedCourses = [...loadCourseData()].sort(
    (left, right) => new Date(left.startDate) - new Date(right.startDate)
  );
  //FORMATTING THE OUTPUT TO DISPLAY COURSE DETAILS
  const courseLines = sortedCourses
    .map(({ id, name, startDate, participants = [] }) => {
      const count = participants.length;
      return `${id} ${name} ${startDate} ${chalk.yellow(count)}${count >= 20 ? ` ${chalk.red('FULL')}` : ''}`;
    })
    .join('\n');

  return `\n${chalk.green('Courses:')}\n${courseLines}\n\nTotal: ${chalk.green(sortedCourses.length)}\n`;
}

//EXPORTING MAIN FUNCTION TO HANDLE COURSE COMMANDS
export function handleCourseCommand(subcommand, args) {
  const sub = subcommand?.toLowerCase();
  const commandArgs = Array.isArray(args) ? args : [];

  //ROUTING THE SUBCOMMANDS TO THEIR FUNCTIONS
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
