
import morgan, { StreamOptions } from 'morgan'
import logger from '../utils/logger'

// Configurar el stream de morgan para usar winston
const stream: StreamOptions = {
  write: (message) => logger.info(message.trim()),
}

// Configurar morgan para usar el formato 'combined'
const morganMiddleware = morgan('combined', { stream })

export default morganMiddleware
