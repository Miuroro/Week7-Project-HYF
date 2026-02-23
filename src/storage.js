import fs from 'node:fs';

const TRAINEE_DATA_FILE_PATH = './data/trainees.json';
const COURSE_DATA_FILE_PATH = './data/courses.json';

export function loadTraineeData() {
  const load = fs.readFileSync(TRAINEE_DATA_FILE_PATH, 'utf8');
  return JSON.parse(load);
}

export function saveTraineeData(data) {
  fs.writeFileSync(TRAINEE_DATA_FILE_PATH, JSON.stringify(data, null, 2));
}

export function loadCourseData() {
  const load = fs.readFileSync(COURSE_DATA_FILE_PATH, 'utf8');
  return JSON.parse(load);
}
export function saveCourseData(data) {
  fs.writeFileSync(COURSE_DATA_FILE_PATH, JSON.stringify(data, null, 2));
}
