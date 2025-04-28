import bcrypt from "bcryptjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const videos: Record<string, string> = {
  basketballCaptain: "/videos/basketball-captain.mp4",
  ellieWilliams: "/videos/ellie-williams.mp4",
  ghost: "/videos/ghost.mp4",
  gojoSatoru: "/videos/gojo-satoru.mp4",
  sherlockHolmes: "/videos/sherlock-holmes.mp4",
  spaceAdventurer: "/videos/space-adventurer.mp4",
};

export function getRandomVideo() {
  const videoKeys = Object.keys(videos);
  const randomKey = videoKeys[Math.floor(Math.random() * videoKeys.length)];
  return {
    key: randomKey,
    src: videos[randomKey],
  };
}

export async function hashPassword({
  password,
  salt = 10,
}: {
  password: string;
  salt?: number;
}) {
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}
