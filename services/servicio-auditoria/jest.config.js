module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    '^@telemed/common$': '<rootDir>/test/mocks/common.ts',
    '^@telemed/contracts$': '<rootDir>/test/mocks/contracts.ts',
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.spec.json',
      isolatedModules: true,
    }],
  },
};
