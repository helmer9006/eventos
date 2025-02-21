import {
  modules,
  roles,
  permissions,
  users,
  rolesPermissions,
} from './constants';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // create modules
  await prisma.modules.createMany({
    data: modules,
  });
  // create roles
  await prisma.roles.createMany({
    data: roles,
  });

  // create permissions
  await prisma.permissions.createMany({
    data: permissions,
  });

  // create users
  await prisma.users.createMany({
    data: users,
  });

  // create roles permisions
  await prisma.rolesPermissions.createMany({
    data: rolesPermissions,
  });


  // RESET SEQUENCES
  await prisma.$queryRawUnsafe(`alter sequence "Roles_id_seq" RESTART WITH 5`);
  await prisma.$queryRawUnsafe(
    `alter sequence "Modules_id_seq" RESTART WITH 3`,
  );
  await prisma.$queryRawUnsafe(
    `alter sequence "Permissions_id_seq" RESTART WITH 4`,
  );
  await prisma.$queryRawUnsafe(`alter sequence "Users_id_seq" RESTART WITH 2`);
}
main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
