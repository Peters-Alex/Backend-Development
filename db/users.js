const prisma = require("./index");

const checkUsernameAndEmail = async (username, email) => {
    let userName = null;
    let userEmail = null;

    if (username){
        userName = await prisma.users.findUnique({
            where: {
                username,
            },
        });
    }

    if (email) {
        userEmail = await prisma.users.findUnique({
            where: {
                email,
            },
        });
    }
    //troubleshooting the problem
    // console.log("user username", userName, !!userName);
    // console.log("user email", email, !!userEmail);
    // console.log(!!(userName || userEmail))

    return !!(userName || userEmail)
};

const createUser = async (userData) => {
    return prisma.users.create({
        data: userData,
    });
};
module.exports = {
    checkUsernameAndEmail, createUser,
};