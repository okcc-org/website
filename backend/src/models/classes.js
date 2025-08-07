const prisma = require('../prisma/client.js');

exports.getProgram = async (programType, subProgram) => {
    const program = await prisma.programs.findUnique({
        where: {
            type: programType,
        },
        include: {
            sub_programs: {
                where: {
                    name: subProgram
                }
            }
        } 
    });
    return program;
};
