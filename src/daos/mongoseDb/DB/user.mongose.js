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
      const userExist = await UserModel.findOne({ email: email });

      if (userExist) {
        console.log('Provided password:', password);
        console.log('Hashed password from database:', userExist.password);

        // Verificar la contraseña utilizando bcrypt.compare
        const passwordMatch = await bcrypt.compare(password, userExist.password);

        console.log('Password match:', passwordMatch);

        if (passwordMatch) {
          return userExist;
        }
      }

      else {
        return null;
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
