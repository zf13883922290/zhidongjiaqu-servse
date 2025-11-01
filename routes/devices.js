const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all devices
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM devices ORDER BY id');
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching devices:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch devices'
    });
  }
});

// Get device by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM devices WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Device not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching device:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch device'
    });
  }
});

// Create new device
router.post('/', async (req, res) => {
  try {
    const { name, type, status, location } = req.body;
    const result = await db.query(
      'INSERT INTO devices (name, type, status, location, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [name, type, status || 'offline', location]
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating device:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create device'
    });
  }
});

// Update device
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, status, location } = req.body;
    
    const result = await db.query(
      'UPDATE devices SET name = $1, type = $2, status = $3, location = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
      [name, type, status, location, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Device not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating device:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update device'
    });
  }
});

// Delete device
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM devices WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Device not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Device deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting device:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete device'
    });
  }
});

module.exports = router;
