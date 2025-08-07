process.env.JWT_SECRET = 'test-secret';
process.env.JWT_EXPIRES_IN = '1h';

// Mocking CustomErrors
jest.mock('../utils/CustomError', () => ({
  ConflictError: jest.fn().mockImplementation((message) => ({
    name: 'ConflictError',
    message,
    status: 409
  })),
  UnauthorizedError: jest.fn().mockImplementation((message) => ({
    name: 'UnauthorizedError',
    message,
    status: 401
  })),
  NotFoundError: jest.fn().mockImplementation((message) => ({
    name: 'NotFoundError',
    message,
    status: 404
  })),
  BadRequestError: jest.fn().mockImplementation((message) => ({
    name: 'BadRequestError',
    message,
    status: 400
  }))
}));

// Mocking ResponseUtil
jest.mock('../utils/ResponseDTO', () => ({
  ResponseUtil: {
    success: jest.fn().mockImplementation((message, data) => ({
      success: true,
      message,
      data
    }))
  }
}));

// Mocking models
jest.mock('../models/user', () => ({
  findUserByEmail: jest.fn(),
  findUserById: jest.fn(),
  createUser: jest.fn(),
  updateUserById: jest.fn(),
  changePasswordById: jest.fn(),
}));

// Mocking bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn().mockResolvedValue(true),
}));

// Mocking jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock.jwt.token'),
  verify: jest.fn().mockReturnValue({ id: 1, email: 'test@example.com' }),
})); 