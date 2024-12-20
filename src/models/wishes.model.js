const { error } = require('console');
const prisma = require('./prismaClient');
const { memoryUsage } = require('process');

module.exports.getAllWishes = async function getAllUsers() {
    return prisma.wishes.findMany();
};

module.exports.getWishesById = async function getUserById(id) {
    const intId = parseInt(id, 10); 
    if (isNaN(intId)) {
        throw new Error("Invalid ID: not a number");
    }

    return await prisma.wishes.findFirst({
        where: {
            id: intId, 
        },
    });
};

module.exports.getUsersWishes = async function getUserByEmail(user_id) {
    return await prisma.wishes.findFirst({
        where: {
            user_id:user_id, 
        },
    });
};

module.exports.createNewWish = async function createNewWish(user_id, message) {
    try {
        const newWish = await prisma.wishes.create({
            data: {
                user_id: user_id,
                message: message,
            }
        });

        if (!newWish) {
            throw new Error('Failed to create a new wish.');
        }

        return newWish;
    } catch (error) {
        console.error('Error creating new wish:', error.message);
        throw new Error('An error occurred while creating the wish. Please try again.');
    }
};

module.exports.deleteWish= async function deleteWish(wish_id) {
    try {
        const deletedWish = await prisma.wishes.delete({
            where: { id: wish_id }
        })

        if (!deletedWish) {
            throw new Error('Failed to delete wish.');
        }

        return deletedMemory;
    } catch (error) {
        console.error('Error deleting wish:', error.message);
        throw new Error('An error occurred while deleting the wish. Please try again.');
    }
}