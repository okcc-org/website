const { register, login } = require('../../controllers/authController');
const { findUserByEmail, createUser } = require('../../models/user');
const { ConflictError, UnauthorizedError } = require('../../utils/CustomError');
const { ResponseUtil } = require('../../utils/ResponseDTO');
const bcrypt = require('bcrypt');

jest.mock('../../models/user');
jest.mock('../../utils/ResponseDTO');
jest.mock('bcrypt');

describe('Auth Controller', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      body: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        validatePassword: 'password123',
        fullName: 'Test User',
      };

      mockReq.body = userData;
      findUserByEmail.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      createUser.mockResolvedValue({
        id: 1,
        email: userData.email,
        password: 'hashedPassword',
        name: userData.fullName,
      });

      await register(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        ResponseUtil.success('Registration completed successfully', expect.any(Object))
      );
    });

    it('should throw error when email already exists', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        validatePassword: 'password123',
        fullName: 'Test User',
      };

      mockReq.body = userData;
      findUserByEmail.mockResolvedValue({ id: 1, ...userData });

      await register(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'ConflictError',
          message: 'Email already exists',
          status: 409
        })
      );
    });
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      mockReq.body = loginData;
      findUserByEmail.mockResolvedValue({
        id: 1,
        email: loginData.email,
        password: 'hashedPassword',
      });
      bcrypt.compare.mockResolvedValue(true);

      await login(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        ResponseUtil.success('Login successful', expect.any(Object))
      );
    });

    it('should throw error when email does not exist', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      mockReq.body = loginData;
      findUserByEmail.mockResolvedValue(null);

      await login(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'UnauthorizedError',
          message: 'Invalid email',
          status: 401
        })
      );
    });
  });
}); 