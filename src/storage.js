import fs from 'node:fs';

const TRAINEE_DATA_FILE_PATH = '../data/trainees.json';
const COURSE_DATA_FILE_PATH = '../data/Courses.json';

export function loadTraineeData() {
  const fileContent = fs.readFileSync(TRAINEE_DATA_FILE_PATH, 'utf-8');
  return JSON.parse(fileContent);
}
/* 
For future reference: (+ remainder to delete this later)
JSON.parse will convert the JSON string into a JavaScript.
 */
export function saveTraineeData(updatedTrainees) {
  const traineeSavedData = JSON.stringify(updatedTrainees, null, 2);
  fs.writeFileSync(TRAINEE_DATA_FILE_PATH, traineeSavedData, 'utf-8');
}
/*
i used the name (updatedTrainees) only for the sake of clarity
also a remainder to delete this later.
*/
export function loadCourseData() {
  const fileContent = fs.readFileSync(COURSE_DATA_FILE_PATH, 'utf-8');
  return JSON.parse(fileContent);
}

export function saveCourseData(updatedCourses) {
  const courseSavedData = JSON.stringify(updatedCourses, null, 2);
  fs.writeFileSync(COURSE_DATA_FILE_PATH, courseSavedData, 'utf-8');
}
/*
 i applied the same logic for the course data as well
and used the name (updatedCourses) only for the sake of clarity
( for the future reference, i will delete this later. )
*/
