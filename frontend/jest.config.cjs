const nextJest = require('next/jest');

/** @type {import('jest').Config} */
const createJestConfig = nextJest({ dir: './' });

const config = {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['text', 'lcov', 'json', 'html'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],

  errorOnDeprecated: true,
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    'test-utils': '<rootDir>/__test__/test-utils.jsx',
  },
  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/e2e'],
};

module.exports = createJestConfig(config);
