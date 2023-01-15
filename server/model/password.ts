import { Document, model, Schema } from "mongoose";

export type TPassword = {
  email: string;
  password: string;
  username: string;
  title: String;
};

export interface IPassword extends TPassword, Document {}

const PasswordSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const Password = model<IPassword>("Password", PasswordSchema);

export default Password;
