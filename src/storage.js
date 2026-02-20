import fs from 'node:fs';

const TRAINEE_DATA_FILE_PATH = './data/trainees.json';
const COURSE_DATA_FILE_PATH = './data/courses.json';

export function loadTraineeData() {
  // Use the fs module to read the trainees.json file and return the data as a JavaScript object
  const load = fs.readFileSync(TRAINEE_DATA_FILE_PATH, 'utf8');
  return JSON.parse(load);
}

export function saveTraineeData(data) {
  // Use the fs module to write the updated trainee data back to the trainees.json file
  fs.writeFileSync(TRAINEE_DATA_FILE_PATH, JSON.stringify(data, null, 2));
}

export function loadCourseData() {
  // TODO: Implement
  const load = fs.readFileSync(COURSE_DATA_FILE_PATH, 'utf8');
  return JSON.parse(load);
}

export function saveCourseData(data) {
  // TODO: Implement
  fs.writeFileSync(COURSE_DATA_FILE_PATH, JSON.stringify(data, null, 2));
}
