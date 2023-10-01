import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems, getRandomDate } from '../../helpers/index.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_COMMENTS = 1;
const MAX_COMMENTS = 10;


export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItems<string>(this.mockData.titles).join(';');
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = getRandomDate(FIRST_WEEK_DAY,LAST_WEEK_DAY);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const image = getRandomItem(this.mockData.images);
    const isPremium = getRandomItem<string>(['true', 'false']);
    const isFavorite = getRandomItem<string>(['true', 'false']);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const type = getRandomItem<string>(this.mockData.types);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const goods = getRandomItem(this.mockData.goods);
    const name = getRandomItem(this.mockData.hostNames);
    const email = getRandomItem(this.mockData.hostEmails);
    const avatarUrl = getRandomItem(this.mockData.hostAvatarURLs);
    const password = getRandomItem(this.mockData.hostPasswords);
    const isPro = getRandomItem<string>(['true', 'false']);
    const commentsCount = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS).toString();
    const location = getRandomItem(this.mockData.coordinates);

    return [
      title, description, postDate, city,
      previewImage, image, isPremium, isFavorite, rating,
      type, rooms, guests, price, goods, name, email,
      avatarUrl, password, isPro, commentsCount, location
    ].join('\t');
  }
}
