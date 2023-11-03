import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';


@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const offersCount = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .aggregate([
        { $sort: { date: SortType.Down } },
        { $limit: offersCount },
        {
          $lookup: {
            from: 'comments',
            let: { offerId: '$_id' },
            pipeline: [
              { $match: { offerId: '$$offerId' } },
              { $project: { rating: 1 } },
            ],
            as: 'ratings',
          },
        },
        {
          $addFields: {
            id: { $toString: '$_id' },
            commentsNumber: { $size: '$ratings' },
            rating: {
              $cond: [{ $size: '$ratings' }, { $avg: '$ratings' }, 0]
            },
          },
        },
        { $unset: ['ratings', '_id', 'hostId'] },
      ])
      .exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .exec();
  }

  public async findByCity(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ city })
      .populate('userId','offerId')
      .exec();
  }

  public async findIsPremium(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({city})
      .populate(['userId','offerId'])
      .exec();
  }

  public async findIsFavorite(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .populate('userId','offerId')
      .exec();
  }

  public async updateRating(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .aggregate([
        {
          $match: {
            $expr: {
              $eq: [
                '$_id',
                {
                  $toObjectId: offerId,
                },
              ],
            },
          },
        },
        {
          $lookup: {
            from: 'comments',
            let: {
              offerId: '$_id',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$$offerId', '$offerId'],
                  },
                },
              },
            ],
            as: 'comments',
          },
        },
        {
          $set: {
            rating: {
              $avg: '$comments.rating',
            },
          },
        },
        {
          $unset: 'comments',
        },
      ])
      .exec()
      .then(([result]) => result ?? null);
  }


  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.
      findByIdAndUpdate(offerId, dto, {new: true}).
      populate('userId').
      exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }


  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }


}
