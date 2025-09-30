const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/authRoutes');

// Mock the database to prevent tests from touching the real database
jest.mock('../models/db', () => ({
  query: jest.fn()
    // First time it's called (checking if user exists), return empty
    .mockResolvedValueOnce({ rows: [] }) 
    // Second time (inserting new user), return a fake user
    .mockResolvedValueOnce({ rows: [{ id: 1, name: 'Test User', email: 'test@example.com' }] }) 
}));

// Mock the password hashing library
jest.mock('bcryptjs', () => ({
  genSalt: jest.fn().mockResolvedValue(10),
  hash: jest.fn().mockResolvedValue('hashedpassword'),
}));

// Mock the JWT library
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mocktoken'),
}));

// Create a mini-application for testing purposes
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);


describe('Authentication API Routes', () => {

  it('should register a new user successfully with a status code of 201', async () => {
    // Send a fake request to our test app
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
      
    // Check if the server responded with "201 Created"
    expect(response.statusCode).toEqual(201);
    // Check if the response includes a token
    expect(response.body).toHaveProperty('token');
    // Check if the user's name in the response is correct
    expect(response.body.user.name).toBe('Test User');
  });

});