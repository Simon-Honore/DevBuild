import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create 10 users, each with 1 course and 100 relationships between courses and users as students.
const main = async () => {
  const users: any[] = [];

  for (let i = 0; i < 10; i++) {
    users.push(
      await prisma.user.create({
        data: {
          email: faker.internet.email(),
          createdAt: faker.date.past(),
          createdCourses: {
            create: {
              name: faker.lorem.words(3),
              createdAt: faker.date.past(),
              presentation: faker.lorem.paragraph(),
              image: faker.image.url(),
              lessons: {
                createMany: {
                  data: [
                    {
                      name: faker.lorem.words(4),
                      content: faker.lorem.paragraph(),
                      rank: "aaaaaaa",
                    },
                    {
                      name: faker.lorem.words(4),
                      content: faker.lorem.paragraph(),
                      rank: "aaabaaa",
                    },
                  ],
                },
              },
            },
          },
        },
      })
    );
  }

  // link users to courses
  const courses = await prisma.course.findMany();

  for (const course of courses) {
    const random3Users = faker.helpers.arrayElements(users, 3);

    for (const user of random3Users) {
      await prisma.courseOnUser.create({
        data: {
          userId: user.id,
          courseId: course.id,
        },
      });
    }
  }

  // add a name to 8 users
  const random8Users = faker.helpers.arrayElements(users, 8);

  for (const user of random8Users) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: faker.person.fullName(),
      },
    });
  }

  // add an image to 6 users
  const random6Users = faker.helpers.arrayElements(users, 6);

  for (const user of random6Users) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        image: faker.image.url(),
      },
    });
  }

  // change state to PUBLISHED at 8 course
  const random8Courses = faker.helpers.arrayElements(courses, 8);

  for (const course of random8Courses) {
    await prisma.course.update({
      where: {
        id: course.id,
      },
      data: {
        state: "PUBLISHED",
      },
    });
  }

  // change status to PUBLISHED to 12 lessons
  const lessons = await prisma.lesson.findMany();

  const random15Lessons = faker.helpers.arrayElements(lessons, 12);

  for (const lesson of random15Lessons) {
    await prisma.lesson.update({
      where: {
        id: lesson.id,
      },
      data: {
        state: "PUBLISHED",
      },
    });
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });
