import Redis from "ioredis";

export const redisClient = new Redis(
  "rediss://default:AXI4AAIjcDE5Yzc0OWRkZGQ3NzI0MzMyYWFiNzQ4ODY5ODYxMTA5NHAxMA@fun-tiger-29240.upstash.io:6379"
);

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

redisClient.on("connect", () => {
  console.log("Connected to redis");
});
