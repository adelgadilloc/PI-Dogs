const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dogRouter = require('./dog.js')
const temperamentRouter = require('./temperament.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', dogRouter)
router.use('/', temperamentRouter)

module.exports = router;
