const prisma = require('./prisma');


const testDbConnection  = async () => {
    try {
        const result = await prisma.$queryRaw`SELECT now()`;
        console.log(` database service is working ${JSON.stringify(result)}`);
    } catch (error) {
        console.error(error);
    }

}

module.exports = testDbConnection;
