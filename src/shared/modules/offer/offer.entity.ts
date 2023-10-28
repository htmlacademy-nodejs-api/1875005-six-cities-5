import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferDescriptionLength, OfferGuestsNumber, OfferTitleLength, OfferPriceRange, OfferRatingRange, OfferRoomsNumber } from '../../const/index.js';
import { Goods, Cities, PropertyType, Location } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    require: true,
    minlength: OfferTitleLength.Min,
    maxlength: OfferTitleLength.Max,
  })
  public title!: string;

  @prop({
    require: true,
    minlength: OfferDescriptionLength.Min,
    maxlength: OfferDescriptionLength.Max,
  })
  public description!: string;

  @prop({
    require: true,
    default: new Date(),
  })
  public postDate!: Date;

  @prop({
    type: () => String,
    enum: Cities,
    require: true,
  })
  public city!: Cities;

  @prop({
    require: true,
  })
  public previewImage!: string;

  @prop({
    type: () => [String],
    require: true,
    default: [],
  })
  public images!: string[];

  @prop({
    require: true,
    default: false,
  })
  public isPremium!: boolean;

  @prop({
    require: true,
    default: false,
  })
  public isFavorite!: boolean;

  @prop({
    require: true,
    min: OfferRatingRange.Min,
    max: OfferRatingRange.Max,
  })
  public rating!: number;

  @prop({
    type: () => String,
    enum: PropertyType,
    require: true,
  })
  public type!: PropertyType;

  @prop({
    require: true,
    min: OfferRoomsNumber.Min,
    max: OfferRoomsNumber.Max,
  })
  public rooms!: number;

  @prop({
    require: true,
    min: OfferGuestsNumber.Min,
    max: OfferGuestsNumber.Max,
  })
  public guests!: number;

  @prop({
    require: true,
    min: OfferPriceRange.Min,
    max: OfferPriceRange.Max,
  })
  public price!: number;

  @prop({
    type: () => [String],
    enum: Goods,
    require: true,
    default: []
  })
  public goods!: Goods[];

  @prop({
    ref: UserEntity,
    require: true,
  })
  public host!: Ref<UserEntity>;

  @prop({
    default: 0,
  })
  public commentsCount!: number;

  @prop({
    require: true,
  })
  public location!: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
