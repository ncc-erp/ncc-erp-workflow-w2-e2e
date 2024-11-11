import { faker } from "@faker-js/faker";

function getSequentialDates(startDate: Date, daysCount: number) {
  const dates = [];
  for (let i = 0; i < daysCount; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    dates.push(formattedDate);
  }
  return dates;
}

export function getRandomDates() {
  const baseDate = new Date(2024, 0, 1);
  const randomFutureDate = faker.date.future();
  const startDate = new Date(baseDate.getTime() + (randomFutureDate.getTime() - new Date().getTime()));
  const [start, end] = getSequentialDates(startDate, 2);
  return { startDate: start, endDate: end };
}

export function getRandomDatesForProbationaryConfirmation() {
  const startDate = new Date();
  const [start, end] = getSequentialDates(startDate, 3);
  return { startDate: start, endDate: end };
}

export function getMultiFutureDates(count) {
  const dates = [];

  for (let i = 0; i < count; i++) {
    const date = faker.date.future();
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    dates.push(formattedDate);
  }

  return dates.join(", ");
}

export function getRandomContent() {
  return `${faker.lorem.lines()}`;
}

export function getRandomDevice() {
  return `${faker.vehicle.bicycle()}`;
}

export function getRandomPastDate() {
  return `${faker.date.past()}`;
}

export function getRandomFutureDate() {
  return `${faker.date.future()}`;
}
