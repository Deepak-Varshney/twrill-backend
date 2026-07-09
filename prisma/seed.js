import 'dotenv/config'
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon"

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter })

import users from "../demo_users.json" with { type: "json" };

const main = async () => {
    console.log("Seeding Users...");

    try {
        await prisma.$connect()
        for (const user of users) {
            await prisma.user.create({
                data: user
            })
            console.log(`${user.name} added to db`)
        }
    } catch (error) {
        console.log("Seeding error: ", error.message)
    }
    console.log("Seeding completed")
}

main().catch((err) => {
    console.error(err)
    process.exit()
}).finally(async () => await prisma.$disconnect())