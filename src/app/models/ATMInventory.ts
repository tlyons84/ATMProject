export interface UserProfile {
  name:string;
  email:string;
  phone?:number;
  AccountNumber:Account[];

}

export interface Account {
  accountNumber:number;
  pin:number;
  valueOfAccount:number;
  typeOfAccount:string;
  transactionHistory?:TransAction[];


}
export interface TransAction {
  completed:boolean
  amount:number
  TransactionType:string
  dateTime:string
  MSG:string
}
export interface Funds {
  sufficient: boolean;
  denomination:number;
 
}
export interface insufficiant {
  funds:Funds[];
 inssuficiant:boolean;
}
export interface ATMInventory {
  inventory:Currency[];
  totalValue:number;
}
export interface WithDrawal{
  AmountToWithdraw:number
  DenomTrack:Currency[]
}

export interface Currency {
    amount:number;
    denomination:number;
    countryCurrency?:string;
}
export interface restockSelection {
  Denom:number;
  value:number;
}
