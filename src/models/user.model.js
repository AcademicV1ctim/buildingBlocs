const prisma = require('./prismaClient');

module.exports.getAllUsers = async function getAllUsers() {
    return prisma.users.findMany();
};

module.exports.getUserById = async function getUserById(id) {
    const intId = parseInt(id, 10); // Convert to integer
    if (isNaN(intId)) {
        throw new Error("Invalid ID: not a number");
    }

    return await prisma.users.findFirst({
        where: {
            id: intId, 
        },
    });
};

module.exports.getUserByEmail = async function getUserByEmail(email) {
    return await prisma.users.findFirst({
        where: {
            email:email, 
        },
    });
};

module.exports.login = async function login(name) {
    try {
        const user = await prisma.users.findFirst({
            where: {
                name: name,
            },
        });

        if (!user) {
            throw new Error("Invalid username");
        }
        return user;
    } catch (error) {
        console.error("Login Error:", error);
        throw new Error("Error logging in");
    }
}

module.exports.createNewUser = async function createNewUser(name,email,password) {
    const user = await prisma.users.findFirst({
        where: { email: email },
    });

    if (!user) {
        return await prisma.users.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        });
    } else {
        throw new Error("Error Registering New User");
    }
};
