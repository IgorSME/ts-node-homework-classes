import { Server } from "http";
import { IUser } from "../../types/appTypes";

import mongoose from "mongoose";
import request from "supertest";
import bcrypt from "bcryptjs";
import App from "../../app";
import { User } from "../../models/user";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, PORT } = process.env;

describe("test auth routes", () => {
  let server:Server;
  const app = new App();
  beforeAll(() => {
    if (!DB_HOST || !PORT) {
      throw new Error("Missing required environment variables");
    }
    server = app.getApp().listen(parseInt(PORT, 10))
  });
  afterAll(() => server.close());

  beforeEach(() => {
    if (!DB_HOST) {
      throw new Error("Missing required environment variables");
    }
    mongoose.connect(DB_HOST);
  });

  afterEach(() => {
    mongoose.connection.close();
  });
  let newUser:IUser;
  const existingEmail = "example@gmail.com";
  const tmpPass = "password_hash";
  beforeEach(async () => {
    const encryptedPassword = await bcrypt.hash(tmpPass, 10);
    newUser = await User.create({
      email: existingEmail,
      password: encryptedPassword,
      avatarURL: "public/avatars/6356bc767e162fefe20469b6_IMG_0106.JPG",
    });
  });
  afterEach(async () => {
    await User.findByIdAndDelete(newUser._id);
  });
  test("should return 200", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: existingEmail, password: tmpPass });
    expect(response.statusCode).toBe(200);

    expect(response.body.data.token).toBeDefined();
    const { user } = response.body.data;
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});
