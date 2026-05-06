import { Timestamp } from "firebase/firestore";

export interface ITransaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  type: "income" | "expense";
  userId: string;
  createdAt: Timestamp;
}
