import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const TRAINEE_DATA_FILE_PATH = fileURLToPath(
  new URL('../data/trainees.json', import.meta.url)
);
const COURSE_DATA_FILE_PATH = fileURLToPath(
  new URL('../data/courses.json', import.meta.url)
);

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
