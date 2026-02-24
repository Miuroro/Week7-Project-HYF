import { describe, expect, test } from 'vitest';
import {
  loadTraineeData,
  saveTraineeData,
  loadCourseData,
  saveCourseData,
} from '../src/storage.js';

function originalStorageData(type, run) {
  const isTrainee = type === 'trainee';
  const original = isTrainee ? loadTraineeData() : loadCourseData();
  const saveFunc = isTrainee ? saveTraineeData : saveCourseData;

  try {
    run();
  } finally {
    saveFunc(original);
  }
}

describe('Testing Storage-function', () => {
  test('saves and loads trainee data correctly', () => {
    originalStorageData('trainee', () => {
      const CheckTrainee = [{ id: 123, firstName: 'joe', lastName: 'doe' }];

      saveTraineeData(CheckTrainee);

      const loaded = loadTraineeData();
      expect(loaded).toEqual(CheckTrainee);
      expect(loaded[0].firstName).toBe('joe');
    });
  });

  test('save & loads courses data correctly', () => {
    originalStorageData('course', () => {
      const testCourses = [
        { id: 456, name: 'storage test course', participants: [] },
      ];

      saveCourseData(testCourses);

      const loaded = loadCourseData();
      expect(loaded).toEqual(testCourses);
      expect(loaded[0].name).toBe('storage test course');
    });
  });
  test('return an array for trainees and courses', () => {
    const trainees = loadTraineeData();
    const courses = loadCourseData();

    expect(Array.isArray(trainees)).toBe(true);
    expect(Array.isArray(courses)).toBe(true);
  });
});
