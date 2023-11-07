import { Expose } from 'class-transformer';

export class OfferRdo {

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: string;

  @Expose()
  public previewImage: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: string;

  @Expose()
  public price: string;

  @Expose()
  public commentsCount: number;

}
