import { Cities, PropertyType, Goods, Location, User } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: Cities;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public rating: number;
  public type: PropertyType;
  public rooms: number;
  public guests: number;
  public price: number;
  public goods: Goods[];
  public host: User;
  public commentsCount: number;
  public location: Location;
}
