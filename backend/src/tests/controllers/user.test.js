const { getUser, changePassword, updateUser } = require('../../controllers/userController');
const { findUserById, findUserByEmail, changePasswordById, updateUserById } = require('../../models/user');
const { NotFoundError, UnauthorizedError, BadRequestError } = require('../../utils/CustomError');
const { ResponseUtil } = require('../../utils/ResponseDTO');
const bcrypt = require('bcrypt');

jest.mock('../../models/user');
jest.mock('../../utils/ResponseDTO');
jest.mock('bcrypt');

describe('User Controller', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      user: { id: 1, email: 'test@example.com', provider: 'local' },
      body: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('should get user profile successfully', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
        provider: 'local',
        createdAt: '2024-03-20T10:00:00Z',
        address: {
          id: 1,
          address1: '123 Main St',
          city: 'Anytown',
          state: 'FL',
          zip: '12345',
          country: 'USA',
          createdAt: '2024-03-20T10:00:00Z'
        }
      };

      findUserById.mockResolvedValue(mockUser);

      await getUser(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        ResponseUtil.success('User fetched successfully', {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          role: mockUser.role,
          provider: mockUser.provider,
          createdAt: mockUser.createdAt,
          address: mockUser.address
        })
      );
    });

    it('should throw error when user not found', async () => {
      findUserById.mockResolvedValue(null);

      await getUser(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'NotFoundError',
          message: 'User not found',
          status: 404
        })
      );
    });
  });

  describe('updateUser', () => {
    it('should update user profile successfully', async () => {
      const updateData = {
        fullName: 'Updated Name',
        phone: '1234567890',
        address: {
          address1: '456 New St',
          city: 'New City',
          state: 'NY',
          zip: '54321',
          country: 'USA'
        }
      };

      mockReq.body = updateData;
      const updatedUser = {
        id: 1,
        email: 'test@example.com',
        name: updateData.fullName,
        phone: updateData.phone,
        role: 'USER',
        provider: 'local',
        createdAt: '2024-03-20T10:00:00Z',
        address: {
          id: 1,
          ...updateData.address,
          createdAt: '2024-03-20T10:00:00Z'
        }
      };

      updateUserById.mockResolvedValue(updatedUser);

      await updateUser(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        ResponseUtil.success('User info updated successfully', {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          phone: updatedUser.phone,
          role: updatedUser.role,
          provider: updatedUser.provider,
          createdAt: updatedUser.createdAt,
          address: updatedUser.address
        })
      );
    });

    it('should throw error when no fields to update', async () => {
      mockReq.body = {};

      await updateUser(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'BadRequestError',
          message: 'No fields to update',
          status: 400
        })
      );
    });

    it('should throw error when address is incomplete', async () => {
      const updateData = {
        fullName: 'Updated Name',
        address: {
          address1: '456 New St',
          // Missing required fields
        }
      };

      mockReq.body = updateData;

      await updateUser(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'BadRequestError',
          message: 'Address must include address1, city, state, and zipcode',
          status: 400
        })
      );
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      const passwordData = {
        currentPassword: 'oldPassword',
        newPassword: 'newPassword',
        newConfirmPassword: 'newPassword',
      };

      mockReq.body = passwordData;
      findUserByEmail.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      });
      bcrypt.compare.mockResolvedValue(true);
      bcrypt.hash.mockResolvedValue('newHashedPassword');
      changePasswordById.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: 'newHashedPassword',
      });

      await changePassword(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        ResponseUtil.success('Password successfully changed', expect.any(Object))
      );
    });

    it('should throw error when current password is invalid', async () => {
      const passwordData = {
        currentPassword: 'wrongPassword',
        newPassword: 'newPassword',
        newConfirmPassword: 'newPassword',
      };

      mockReq.body = passwordData;
      findUserByEmail.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      });
      bcrypt.compare.mockResolvedValue(false);

      await changePassword(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'UnauthorizedError',
          message: 'Current password is invalid',
          status: 401
        })
      );
    });
  });
}); 