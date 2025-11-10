const { nanoid } = require('../utils/id');

let reservas = [
  {
    id: '1',
    hotel: 'Hotel Paraíso',
    fechaInicio: '2023-05-15',
    fechaFin: '2023-05-20',
    tipoHabitacion: 'doble',
    estado: 'confirmada',
    numHuespedes: 3,
    nombreHuesped: 'Juan Pérez',
    comentarios: 'Llegada estimada a las 15:00.'
  },
  {
    id: '2',
    hotel: 'Hotel Central',
    fechaInicio: '2023-12-22',
    fechaFin: '2023-12-28',
    tipoHabitacion: 'suite',
    estado: 'pendiente',
    numHuespedes: 2,
    nombreHuesped: 'María Gómez',
    comentarios: 'Solicita vista al mar.'
  },
  {
    id: '3',
    hotel: 'Hotel Paraíso',
    fechaInicio: '2023-12-24',
    fechaFin: '2023-12-27',
    tipoHabitacion: 'suite lujo',
    estado: 'pagada',
    numHuespedes: 5,
    nombreHuesped: 'Familia Rodríguez',
    comentarios: 'Celebración familiar.'
  }
];

const normalizar = (valor) => valor?.toString().trim().toLowerCase();

const parseFecha = (valor) => {
  if (!valor) return null;
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? null : fecha;
};

const getReservas = (req, res) => {
  const {
    hotel,
    fecha_inicio: fechaInicio,
    fecha_fin: fechaFin,
    tipo_habitacion: tipoHabitacion,
    estado,
    num_huespedes: numHuespedes
  } = req.query;

  let resultado = [...reservas];

  if (hotel) {
    const hotelFiltrado = normalizar(hotel);
    resultado = resultado.filter((reserva) => normalizar(reserva.hotel) === hotelFiltrado);
  }

  if (tipoHabitacion) {
    const tipoFiltrado = normalizar(tipoHabitacion);
    resultado = resultado.filter(
      (reserva) => normalizar(reserva.tipoHabitacion) === tipoFiltrado
    );
  }

  if (estado) {
    const estadoFiltrado = normalizar(estado);
    resultado = resultado.filter((reserva) => normalizar(reserva.estado) === estadoFiltrado);
  }

  if (numHuespedes) {
    const numero = Number(numHuespedes);
    if (!Number.isNaN(numero)) {
      resultado = resultado.filter((reserva) => reserva.numHuespedes === numero);
    }
  }

  const fechaInicioFiltro = parseFecha(fechaInicio);
  const fechaFinFiltro = parseFecha(fechaFin);

  if (fechaInicioFiltro || fechaFinFiltro) {
    resultado = resultado.filter((reserva) => {
      const inicioReserva = parseFecha(reserva.fechaInicio);
      const finReserva = parseFecha(reserva.fechaFin);
      if (!inicioReserva || !finReserva) return false;

      if (fechaInicioFiltro && inicioReserva < fechaInicioFiltro) {
        return false;
      }

      if (fechaFinFiltro && finReserva > fechaFinFiltro) {
        return false;
      }

      return true;
    });
  }

  res.json({ total: resultado.length, data: resultado });
};

const getReservaById = (req, res) => {
  const { id } = req.params;
  const reserva = reservas.find((item) => item.id === id);

  if (!reserva) {
    return res.status(404).json({ mensaje: `No se encontró la reserva con id ${id}.` });
  }

  return res.json(reserva);
};

const createReserva = (req, res) => {
  const {
    hotel,
    fechaInicio,
    fechaFin,
    tipoHabitacion,
    estado = 'pendiente',
    numHuespedes,
    nombreHuesped,
    comentarios = ''
  } = req.body;

  if (!hotel || !fechaInicio || !fechaFin || !tipoHabitacion || !numHuespedes || !nombreHuesped) {
    return res.status(400).json({
      mensaje:
        'Faltan datos obligatorios. Debes proporcionar hotel, fechas de inicio y fin, tipo de habitación, número de huéspedes y nombre del huésped.'
    });
  }

  const nuevaReserva = {
    id: nanoid(),
    hotel,
    fechaInicio,
    fechaFin,
    tipoHabitacion,
    estado,
    numHuespedes: Number(numHuespedes),
    nombreHuesped,
    comentarios
  };

  reservas.push(nuevaReserva);

  return res.status(201).json(nuevaReserva);
};

const updateReserva = (req, res) => {
  const { id } = req.params;
  const indice = reservas.findIndex((item) => item.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensaje: `No se encontró la reserva con id ${id}.` });
  }

  const reservaActualizada = {
    ...reservas[indice],
    ...req.body,
    numHuespedes:
      req.body.numHuespedes !== undefined
        ? Number(req.body.numHuespedes)
        : reservas[indice].numHuespedes
  };

  reservas[indice] = reservaActualizada;

  return res.json(reservaActualizada);
};

const deleteReserva = (req, res) => {
  const { id } = req.params;
  const indice = reservas.findIndex((item) => item.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensaje: `No se encontró la reserva con id ${id}.` });
  }

  const [eliminada] = reservas.splice(indice, 1);

  return res.json({ mensaje: 'Reserva eliminada correctamente.', data: eliminada });
};

module.exports = {
  getReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva
};
