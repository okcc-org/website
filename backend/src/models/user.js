const prisma = require('../prisma/client.js');

exports.createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

exports.findUserByEmail = async (email, provider ='local') => {
  return prisma.user.findUnique({
    where: {
      email: email,
      provider: provider,
    },
  });
};

exports.findUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id: id },
    include: {
      address: true
    }
  });
}; 

exports.updateUserById = async (id, data) => {
  return prisma.user.update({
    where: { id: id },
    data: data,
    include: {
      address: true
    }
  })
}

exports.changePasswordById = async (id, password) => {
  return prisma.user.update({
    where: { id: id },
    data: {
      password: password,
    },
  })
}