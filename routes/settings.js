const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all settings
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM settings ORDER BY key');
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch settings'
    });
  }
});

// Get setting by key
router.get('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const result = await db.query('SELECT * FROM settings WHERE key = $1', [key]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Setting not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching setting:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch setting'
    });
  }
});

// Update or create setting
router.put('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { value, description } = req.body;
    
    const result = await db.query(
      `INSERT INTO settings (key, value, description, updated_at) 
       VALUES ($1, $2, $3, NOW()) 
       ON CONFLICT (key) 
       DO UPDATE SET value = $2, description = $3, updated_at = NOW() 
       RETURNING *`,
      [key, value, description]
    );
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating setting:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update setting'
    });
  }
});

module.exports = router;
