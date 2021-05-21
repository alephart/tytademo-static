module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: {
    '^@/components/(.*)': '<rootDir>/src/components/$1',
    '^@/utils/(.*)': '<rootDir>/src/utils/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  } 
};

// fix path jest with nextjs
// https://github.com/kulshekhar/ts-jest/issues/269#issuecomment-318163416
// I use: https://nextjs.org/docs/advanced-features/module-path-aliases