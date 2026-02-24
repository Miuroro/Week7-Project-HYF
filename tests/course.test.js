import { describe, expect, test } from 'vitest';
import { joinCourse } from '../src/courseCommands.js';

import {
  loadTraineeData,
  saveCourseData,
  saveTraineeData,
  loadCourseData,
} from '../src/storage.js';

// This function is used to save the original data before a test and restore it after the test finishes.
function withOriginalData(run) {
  const originalCourses = loadCourseData();
  const originalTrainees = loadTraineeData();
  try {
    run();
  } finally {
    saveCourseData(originalCourses);
    saveTraineeData(originalTrainees);
  }
}

describe('joinCourse testin cases', () => {
  test('should add trainee to course participants', () => {
    withOriginalData(() => {
      const testCourse = {
        id: 1,
        name: 'the principles of software testing',
        startDate: '2026-06-06',
        participants: [],
      };
      const testTrainee = {
        id: 32,
        firstName: 'thomas',
        lastName: 'wilson',
      };

      saveCourseData([testCourse]);
      saveTraineeData([testTrainee]);

      expect(joinCourse([testCourse.id, testTrainee.id])).toBe(
        `${testTrainee.firstName} ${testTrainee.lastName} Joined ${testCourse.name}`
      );

      expect(
        loadCourseData().find((course) => course.id === testCourse.id)
          ?.participants
      ).toContain(testTrainee.id);
    });
  });
});
