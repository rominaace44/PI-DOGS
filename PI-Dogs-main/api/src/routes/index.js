const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs= require('./dog')
const temperament= require('./temperamento')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dog', dogs)
router.use('/temperament', temperament)


module.exports = router;
