import { Cities, Goods, PropertyType } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: Cities;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public rating?: number;
  public type?: PropertyType;
  public rooms?: number;
  public guests?: number;
  public price?: number;
  public goods?: Goods[];
  public host?: string;
  public commentsCount?: number;
  public location?: number[];
}
