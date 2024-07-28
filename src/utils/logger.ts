import { createLogger, format, transports } from 'winston'
import path from 'path'

// Configura las rutas de los archivos de logs
const logDirectory = path.join(__dirname, '../../logs')
const combinedLogPath = path.join(logDirectory, 'combined.log')
const errorLogPath = path.join(logDirectory, 'error.log')

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: errorLogPath, level: 'error' }),
    new transports.File({ filename: combinedLogPath }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ]
})

export default logger
