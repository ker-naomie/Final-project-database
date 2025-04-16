const express = require('express');
const { Appointment } = require('../models/appointment'); // Correct path

const router = express.Router();

// Book Appointment endpoint
router.post('/book-appointment', async (req, res) => {
    const { patientId, doctorId, date, time, description } = req.body;
    
    try {
        const newAppointment = await Appointment.create({
            patientId,
            doctorId,
            date,
            time,
            description
        });

        res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Other CRUD operations omitted for brevity

module.exports = router;
