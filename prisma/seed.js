const {PrismaClient} = require('@prisma/client')
const { faker } = require("@faker-js/faker");

const prisma= new PrismaClient();

async function seedUsers () {
    //seed 3 users
    console.log('Seeding users...')
    const users = await Promise.all(
        [...Array(3)].map(() => {
            return prisma.users.create({
                data: {
                   username: faker.internet.userName(),
                   Password: faker.internet.password(), 
                   first_name: faker.person.firstName(),
                   last_name: faker.person.lastName(),
                   email: faker.internet.email(),
                },
            });
        })
    );
   
    //seed 1 plant per user
    console.log("Seeding plants....")
    await Promise.all(
        users.map(user => {
            return prisma.plants.create({
                data: {
                    species: "carolina azolla",
                    water_frequency: "3 times a week",
                    nickname: "Carol",
                    plant_image: "https://images.unsplash.com/photo-1494516192674-b82b5f1e61dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcm9saW5hJTIwYXpvbGxhJTIwcGxhbnR8ZW58MHx8MHx8fDA%3D",
                    user_id: user.user_id,
                },
            })
        })
    )
}
seedUsers()
    .then(async () => {
        await prisma.$disconnect();
})
.catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
});