import { UserModel } from "../models/user.models.js";
import bcrypt from "bcrypt";

export default class UserMongoDB {
  async findByEmail(email) {
    try {
      const response = await UserModel.findOne({ email });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async register(user) {
    try {
      const { email, password } = user;
      const exist = await this.findByEmail(email);

      if (!exist) {
        // Encriptar la contraseña antes de almacenarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({ ...user, password: hashedPassword });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login(email, password) {
    try {
      const userExist = await UserModel.findOne({ email: email });
      console.log('login::', userExist);

      if (userExist) {
        // Verificar la contraseña utilizando bcrypt.compare
        const passwordMatch = await bcrypt.compare(password, userExist.password);
        if (passwordMatch) {
          return userExist;
        }
      }

      return null;
    } catch (error) {
      console.log(error);
    }
  }
}
