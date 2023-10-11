import { PrismaClient } from "@prisma/client";

declare global {
    var prisma : PrismaClient | undefined;
}
// Best practise else multiple PrismaClient instances are created during hot reloading.
const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client;