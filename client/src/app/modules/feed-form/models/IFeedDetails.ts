import { IAddress } from './IAddress';

export interface IFeedDetails {
  fedAt: Date;
  foodItems: Array<String>;
  ducksQty: Number;
  totalFoodUsed: Number;
  address: IAddress;
}
