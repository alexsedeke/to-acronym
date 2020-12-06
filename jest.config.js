module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: [
    'text',
    'text-summary',
    'lcov',
    'json',
  ],
  moduleFileExtensions: [
    'js'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/__*'
  ],
  reporters: [
    'default'
  ]
}
