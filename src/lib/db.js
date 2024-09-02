const primsa = require('@prisma/client') 

const db = new primsa.PrismaClient()

module.exports = db