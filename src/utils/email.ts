import { expect } from "@playwright/test";

export type ListEmail = {
  results: Result[];
  totalResults: number;
  totalPages: number;
};

export type Result = {
  id: string;
  sender: string;
  recipients: string[];
  subject: string;
  timeCreated: number;
};

export type Mail = Result & {
  html: boolean;
  body: string;
};

const FIVE_MINUTES = 5 * 60 * 1000;
const getListMail = async (email: string, page = 0, limit = 100): Promise<ListEmail> => {
  const queryParam = new URLSearchParams({
    recipient: email,
    page: page.toString(),
    limit: limit.toString(),
  });

  await new Promise((r) => setTimeout(r, 1000));
  const responseListEmail = await fetch(`${process.env.SMTP_URL}?${queryParam}`);
  return await responseListEmail.json();
};
const findFirstMail = async (email: string, subject: string) => {
  let totalPages = 0;
  let page = 0;
  let mail: Result | null;
  let isNotFoundMail = true;
  while (page <= totalPages && isNotFoundMail) {
    const listEmail = await getListMail(email);
    mail = listEmail.results.find((mail) => mail.subject.includes(subject));
    if (mail) {
      isNotFoundMail = false;
    } else {
      totalPages = listEmail.totalPages;
      page += 1;
    }
  }

  return mail;
};
const getDetailMail = async (email: string, subject: string): Promise<Mail> => {
  const result = await findFirstMail(email, subject);
  const responseEmail = await fetch(`${process.env.SMTP_URL}/${result.id}`);
  const mail = (await responseEmail.json()) as Mail;

  return mail;
};
export const verifyMail = async (email: string, subject: string) => {
  const currentTime = new Date();
  const mail = await getDetailMail(email, subject);
  expect(mail).not.toBeNull();
  expect(mail.subject).toContain(subject);
  expect(mail.recipients).toContain(email);
  expect(mail.timeCreated - currentTime.getTime()).toBeLessThan(FIVE_MINUTES);
};
