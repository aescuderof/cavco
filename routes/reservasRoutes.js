const express = require('express');
const {
  getReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva
} = require('../controllers/reservasController');

const router = express.Router();

router.route('/').get(getReservas).post(createReserva);
router.route('/:id').get(getReservaById).put(updateReserva).delete(deleteReserva);

module.exports = router;
