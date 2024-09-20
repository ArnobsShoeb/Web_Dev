const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig');

// Route to delete a gig
router.delete('/deletegig/:id', async (req, res) => {
  try {
    const gigId = req.params.id;
    const result = await Gig.findByIdAndDelete(gigId);

    if (result) {
      res.json({ success: true, message: 'Gig deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Gig not found' });
    }
  } catch (error) {
    console.error('Error deleting gig:', error);
    res.status(500).json({ success: false, message: 'Failed to delete gig. Please try again.' });
  }
});

module.exports = router;
