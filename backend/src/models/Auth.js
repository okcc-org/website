const prisma = require('../prisma/client.js');

exports.createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

exports.findUserByEmail = async (email, provider ='local') => {
  return prisma.user.findUnique({
    where: { email, provider },
  });
};

exports.findUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
}; 