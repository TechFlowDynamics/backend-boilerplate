import { Types } from "mongoose";

export interface CheckUserInterface {
    userName: string;
    email : string;
}

export interface IncommingUserBody  extends CheckUserInterface{
    password :string
    steps:number;
}

export interface OutGoingUserBody {
    userName:string;
    userId:Types.ObjectId;
    steps:number;
    email:string;
    purpose?:string;
}
