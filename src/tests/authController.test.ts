import { Request, Response } from 'express';
import {
  registerUserController,
  loginUserController,
  deleteUserController,
  changeUserPasswordController,
  checkUsernameValidty,
} from '../controllers/authController';
import * as authService from '../services/authService';

jest.mock('../services/authService');

describe('Auth Controllers', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;
  let cookieMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    cookieMock = jest.fn();

    res = {
      status: statusMock,
      json: jsonMock,
      cookie: cookieMock,
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUserController', () => {
    beforeEach(() => {
      req = {
        body: {
          email: 'test@example.com',
          password: 'password123',
          username: 'testuser',
        },
      };
    });

    it('should register a user successfully', async () => {
      (authService.registerUser as jest.Mock).mockResolvedValueOnce(undefined);

      await registerUserController(req as Request, res as Response);

      expect(authService.registerUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
      });
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        message: 'User registered successfully',
      });
    });

    it('should handle errors during registration', async () => {
      const error = new Error('Registration error');
      (authService.registerUser as jest.Mock).mockRejectedValueOnce(error);

      await registerUserController(req as Request, res as Response);

      expect(authService.registerUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
      });
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'Failed to register user',
      });
    });
  });

  describe('loginUserController', () => {
    beforeEach(() => {
      req = {
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      };
    });

    it('should login a user successfully', async () => {
      const token = 'mockToken';
      (authService.loginUser as jest.Mock).mockResolvedValueOnce(token);

      await loginUserController(req as Request, res as Response);

      expect(authService.loginUser).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      );
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(cookieMock).toHaveBeenCalledWith('access_token', token, {
        httpOnly: true,
      });
      expect(jsonMock).toHaveBeenCalledWith({ token });
    });

    it('should handle errors during login', async () => {
      const error = new Error('Invalid credentials');
      (authService.loginUser as jest.Mock).mockRejectedValueOnce(error);

      await loginUserController(req as Request, res as Response);

      expect(authService.loginUser).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      );
      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });
  });

  describe('deleteUserController', () => {
    beforeEach(() => {
      req = {
        params: {
          userId: 'mockUserId',
        },
      };
    });

    it('should delete a user successfully', async () => {
      (authService.deleteUser as jest.Mock).mockResolvedValueOnce(undefined);

      await deleteUserController(req as Request, res as Response);

      expect(authService.deleteUser).toHaveBeenCalledWith('mockUserId');
      expect(jsonMock).toHaveBeenCalledWith({
        message: 'User deleted successfully',
      });
    });

    it('should handle errors during user deletion', async () => {
      const error = new Error('Deletion error');
      (authService.deleteUser as jest.Mock).mockRejectedValueOnce(error);

      await deleteUserController(req as Request, res as Response);

      expect(authService.deleteUser).toHaveBeenCalledWith('mockUserId');
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Failed to delete user' });
    });
  });

  describe('changeUserPasswordController', () => {
    beforeEach(() => {
      req = {
        params: {
          userId: 'mockUserId',
        },
        body: {
          newPassword: 'newPassword123',
        },
      };
    });

    it('should change user password successfully', async () => {
      (authService.changeUserPassword as jest.Mock).mockResolvedValueOnce(
        undefined
      );

      await changeUserPasswordController(req as Request, res as Response);

      expect(authService.changeUserPassword).toHaveBeenCalledWith(
        'mockUserId',
        'newPassword123'
      );
      expect(jsonMock).toHaveBeenCalledWith({
        message: 'Password changed successfully',
      });
    });

    it('should handle errors during password change', async () => {
      const error = new Error('Password change error');
      (authService.changeUserPassword as jest.Mock).mockRejectedValueOnce(
        error
      );

      await changeUserPasswordController(req as Request, res as Response);

      expect(authService.changeUserPassword).toHaveBeenCalledWith(
        'mockUserId',
        'newPassword123'
      );
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'Failed to change password',
      });
    });
  });

  describe('checkUsernameValidty', () => {
    beforeEach(() => {
      req = {
        params: {
          username: 'testuser',
        },
      };
    });

    it('should check if username is taken', async () => {
      (authService.isUsernameTaken as jest.Mock).mockResolvedValueOnce(true);

      await checkUsernameValidty(req as Request, res as Response);

      expect(authService.isUsernameTaken).toHaveBeenCalledWith('testuser');
      expect(jsonMock).toHaveBeenCalledWith({ exists: true });
    });

    it('should handle errors during username check', async () => {
      const error = new Error('Username check error');
      (authService.isUsernameTaken as jest.Mock).mockRejectedValueOnce(error);

      await checkUsernameValidty(req as Request, res as Response);

      expect(authService.isUsernameTaken).toHaveBeenCalledWith('testuser');
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'Failed to check username',
      });
    });
  });
});
