const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all users
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT id, username, email, created_at FROM users ORDER BY id');
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT id, username, email, created_at FROM users WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user'
    });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await db.query(
      'INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, username, email, created_at',
      [username, email, password]
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create user'
    });
  }
});

module.exports = router;
