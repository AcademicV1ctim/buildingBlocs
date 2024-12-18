const { error } = require('console');
const prisma = require('./prismaClient');
const { memoryUsage } = require('process');

module.exports.getAllMemories = async function getAllUsers() {
    return prisma.memories.findMany();
};

module.exports.getMemoryById = async function getUserById(id) {
    const intId = parseInt(id, 10); 
    if (isNaN(intId)) {
        throw new Error("Invalid ID: not a number");
    }

    return await prisma.memories.findFirst({
        where: {
            id: intId, 
        },
    });
};

module.exports.getUsersMemories = async function getUserByEmail(user_id) {
    return await prisma.memories.findFirst({
        where: {
            user_id:user_id, 
        },
    });
};

module.exports.createNewMemory = async function createNewMemory(user_id, message, image_url) {
    try {
        const newMemory = await prisma.memories.create({
            data: {
                user_id: user_id,
                message: message,
                image_url: image_url
            }
        });

        if (!newMemory) {
            throw new Error('Failed to create a new memory.');
        }

        return newMemory;
    } catch (error) {
        console.error('Error creating new memory:', error.message);
        throw new Error('An error occurred while creating the memory. Please try again.');
    }
};

module.exports.updateMemory = async function updateMemory(user_id, memory_id, message) {
    try {
        const memory = await prisma.memories.findFirst({
            where: {
                user_id: user_id,
                id: memory_id
            }
        });

        if (!memory) {
            throw new Error('Failed to find memory.');
        };

        const updatedMemory = await prisma.memories.update({
            where: {
                id: memory_id
            },
            data: {
                message: message
            }
        });

        return updatedMemory;
    } catch (error) {
        console.error('Error updating memory:', error.message);
        throw new Error('An error occurred while updating the memory. Please try again.');
    }
}

module.exports.deleteMemory = async function deleteMemory(memory_id) {
    try {
        const deletedMemory = await prisma.memories.delete({
            where: { id: memory_id }
        })

        if (!deletedMemory) {
            throw new Error('Failed to delete memory.');
        }

        return deletedMemory;
    } catch (error) {
        console.error('Error deleting memory:', error.message);
        throw new Error('An error occurred while deleting the memory. Please try again.');
    }
}