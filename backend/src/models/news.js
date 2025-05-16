const prisma = require('../prisma/client.js');

exports.findRecent = async () => {
    return prisma.news.findMany({
        select: {
            title: true,
            summary: true,
            thumbnail: true,
            updatedAt: true,
        },
        orderBy: {
            updatedAt: 'desc',
        },
        take: 3
    });
};

exports.findById = async (id) => {
    return prisma.news.findUnique({
        where: { id },
        include: {
            contents: {
                orderBy: { order: 'asc' }
            }
        }
    });
};

exports.create = async (data) => {
    const { contents, ...newsData } = data;
    return prisma.news.create({
        data: {
            ...newsData,
            contents: {
                create: contents
            },
        },
        include: {
            contents: true
        }

    });
};

exports.update = async (id, data) => {
    return prisma.news.update({
        where: { id: id },
        data: {

        }
    });
}

exports.remove = async (id) => {
    return prisma.news.delete({
        where: { id: id },
    });
}


