import { expect } from "@playwright/test";

export type Notification = {
  id: string;
  sendTo: string;
  message: string;
  status: number;
  systemResponse: string;
  creationTime: string;
  creatorId: string | null;
};

export type ListNotification = Notification[];

const FIVE_MINUTES = 5 * 60 * 1000;

export function formatDate(date: Date): string {
  return date.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

const getListNotification = async (
  userName?: string,
  fromTime?: string,
  toTime?: string
): Promise<ListNotification> => {
  const queryParam = new URLSearchParams();
  if (userName) queryParam.append("userName", userName);
  if (fromTime) queryParam.append("fromTime", fromTime);
  if (toTime) queryParam.append("toTime", toTime);
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const response = await fetch(`${process.env.BASE_URL}api/app/komu/komu-message-log-list?${queryParam}`);

  return response.json();
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
};
const findLatestNotification = (notifications: Notification[], message: string): Notification | null => {
  const normalizedMessage = message ? message.replace(/\n/g, "").trim() : "";

  return (
    notifications
      .filter((notif) => notif.message.replace(/\n/g, "").includes(normalizedMessage))
      .sort((a, b) => new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime())[0] || null
  );
};

export const verifyNotification = async (sendTo: string, message: string): Promise<void> => {
  sendTo = sendTo.split("@")[0];
  const notifications = await getListNotification(sendTo);
  const notification = findLatestNotification(notifications, message);

  expect(notification).not.toBeNull();
  if (notification) {
    const creationTime = new Date(notification.creationTime).getTime();
    const currentTime = new Date().getTime();
    expect(notification.message).toContain(message);
    expect(notification.sendTo).toContain(sendTo);
    expect(currentTime - creationTime).toBeLessThan(FIVE_MINUTES);
  }
};

export const verifyNotificationWithinTimeRange = async (
  sendTo: string,
  message: string,
  fromTime: string,
  toTime: string
): Promise<void> => {
  sendTo = sendTo.split("@")[0];
  const notifications = await getListNotification(sendTo, fromTime, toTime);
  const notification = findLatestNotification(notifications, message);

  expect(notification).not.toBeNull();
  if (notification) {
    expect(notification.message).toContain(message);
    expect(notification.sendTo).toContain(sendTo);
  }
};
