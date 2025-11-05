const express = require('express');
const router = express.Router();

const S3_BASE =
  process.env.ARBITROS_S3_BASE ||
  'https://arbitros-imagenes-jj.s3.us-east-1.amazonaws.com';

const img = (n) => `${S3_BASE}/arbitro${n}.jpg`;

/**
 * @swagger
 * /api/partidos:
 *   get:
 *     summary: Obtener todos los partidos
 *     tags: [Partidos]
 *     responses:
 *       200:
 *         description: Lista de partidos
 */
router.get('/', (req, res) => {
  const partidos = [
    {
      id: 1,
      fecha: "2025-11-10",
      hora: "15:00",
      equipoLocal: "Millonarios",
      equipoVisitante: "Nacional",
      estadio: "El Campín",
      ciudad: "Bogotá",
      arbitroPrincipal: "Carlos Mendoza",
      estado: "Programado"
    },
    {
      id: 2,
      fecha: "2025-11-15",
      hora: "18:30",
      equipoLocal: "América",
      equipoVisitante: "Junior",
      estadio: "Pascual Guerrero",
      ciudad: "Cali",
      arbitroPrincipal: "Ana Martínez",
      estado: "Programado"
    },
    {
      id: 3,
      fecha: "2025-11-22",
      hora: "19:00",
      equipoLocal: "Medellín",
      equipoVisitante: "Cali",
      estadio: "Atanasio Girardot",
      ciudad: "Medellín",
      arbitroPrincipal: "Luis Rodríguez",
      estado: "Programado"
    },
    {
      id: 4,
      fecha: "2025-11-25",
      hora: "20:00",
      equipoLocal: "Tolima",
      equipoVisitante: "Once Caldas",
      estadio: "Manuel Murillo Toro",
      ciudad: "Ibagué",
      arbitroPrincipal: "María González",
      estado: "Programado"
    },
    {
      id: 5,
      fecha: "2025-11-28",
      hora: "17:00",
      equipoLocal: "Envigado",
      equipoVisitante: "Equidad",
      estadio: "Polideportivo Sur",
      ciudad: "Envigado",
      arbitroPrincipal: "Jorge Hernández",
      estado: "Pendiente"
    }
  ];

  res.json({
    success: true,
    total: partidos.length,
    data: partidos,
    containerId: process.env.HOSTNAME || 'local',
    timestamp: new Date().toISOString()
  });
});

/**
 * @swagger
 * /api/partidos/{id}:
 *   get:
 *     summary: Obtener un partido por ID
 *     tags: [Partidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del partido
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  // Simulación de datos (si piden un ID fuera de rango, devolvemos el primero)
  const index = parseInt(id) % 5 || 1;

  const partido = {
    id: index,
    fecha: ["2025-11-10", "2025-11-15", "2025-11-22", "2025-11-25", "2025-11-28"][index - 1],
    hora: ["15:00", "18:30", "19:00", "20:00", "17:00"][index - 1],
    equipoLocal: ["Millonarios", "América", "Medellín", "Tolima", "Envigado"][index - 1],
    equipoVisitante: ["Nacional", "Junior", "Cali", "Once Caldas", "Equidad"][index - 1],
    estadio: [
      "El Campín",
      "Pascual Guerrero",
      "Atanasio Girardot",
      "Manuel Murillo Toro",
      "Polideportivo Sur"
    ][index - 1],
    ciudad: ["Bogotá", "Cali", "Medellín", "Ibagué", "Envigado"][index - 1],
    arbitroPrincipal: {
      id: index,
      nombre: ["Carlos Mendoza", "Ana Martínez", "Luis Rodríguez", "María González", "Jorge Hernández"][index - 1],
      imagen: img(index)
    },
    arbitrosAsistentes: [
      {
        id: (index % 10) + 1,
        nombre: "Patricia Silva",
        imagen: img(6)
      },
      {
        id: ((index + 1) % 10) + 1,
        nombre: "Ricardo Pérez",
        imagen: img(7)
      }
    ],
    estado: ["Programado", "Programado", "Programado", "Programado", "Pendiente"][index - 1]
  };

  res.json({
    success: true,
    data: partido,
    containerId: process.env.HOSTNAME || 'local',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
