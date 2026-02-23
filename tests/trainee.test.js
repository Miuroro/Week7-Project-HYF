import { describe, expect, test } from 'vitest';
import {
  addTrainee,
  fetchTrainee,
  fetchAllTrainees,
  getTraineeQuery,
} from '../src/traineeCommands.js';

import { loadTraineeData, saveTraineeData } from '../src/storage.js';

/* To do a safe test i added this function withOriginalData(run)
 It Saves the original trainees data before a test and restores it after the test finishes.

 example:
 The test for adding a trainee will add a trainee to the data,
 but after the test finishes, the original data will be restored,
 so the added trainee will be removed and the data will be back to its original state.
 */
function withOriginalData(run) {
  const original = loadTraineeData();
  try {
    run();
  } finally {
    saveTraineeData(original);
  }
}

describe('Testing Trainee Commands', () => {
  test('adds one trainee', () => {
    withOriginalData(() => {
      const before = loadTraineeData().length;

      const result = addTrainee('Monera', 'Test');
      const after = loadTraineeData();

      expect(result).toMatch(/CREATED: \d+,Monera Test/);
      expect(after.length).toBe(before + 1);
    });
  });

  test('searches trainees', () => {
    withOriginalData(() => {
      addTrainee('Search', 'User');
      const result = getTraineeQuery('sea');

      expect(result).toBe(true);
    });
  });

  test('gets a trainee by id', () => {
    withOriginalData(() => {
      const created = addTrainee('Fetch', 'User');
      const id = created.match(/CREATED: (\d+),/)?.[1];

      const result = fetchTrainee(id);

      expect(result).toBe(true);
    });
  });

  test('gets all trainees', () => {
    withOriginalData(() => {
      const result = fetchAllTrainees();
      expect(result).toBe(true);
    });
  });
});

// Run(  npm test -- --run tests/triainee.test.js   ) to run this test file.
