import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Cities, Goods, Offer, PropertyType } from '../../types/index.js';

function mapToOffer([
  title, description, postDate, city, previewImage, images, isPremium, isFavorite,
  rating, type, rooms, guests, price, goods, hostData, commentsCount, location
]: string[]): Offer {
  const hostParts = hostData.split(',');
  const [name, email, avatarUrl, password, isPro] = hostParts;
  const locationParts = location.split(';');

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: Cities[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
    previewImage,
    images: images.split(','),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number.parseFloat(rating),
    type: PropertyType[type as 'apartment' | 'house' | 'room' | 'hotel'],
    rooms: Number.parseInt(rooms, 10),
    guests: Number.parseInt(guests, 10),
    price: Number.parseInt(price, 10),
    goods: goods.split(',').map((item) => Goods[item.trim() as 'Breakfast' | 'AirConditioning' | 'LaptopFriendlyWorkspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge']),
    host: {
      name,
      email,
      avatarUrl,
      password: Number.parseFloat(password),
      isPro: isPro === 'true',
    },
    commentsCount: Number.parseFloat(commentsCount),
    location: {
      latitude: Number.parseFloat(locationParts[0]),
      longitude: Number.parseFloat(locationParts[1]),
    }
  };
}


export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('Cannot read from the file');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(mapToOffer);
  }
}
