module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true, // Enable coverage collection
  coverageDirectory: 'coverage', // Output directory for coverage reports
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // Types of coverage reports
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // Adjust this line if your directory structure differs
  },
};
