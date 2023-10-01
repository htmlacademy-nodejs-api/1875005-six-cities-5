import { Cities } from '../types/cities.enum.js';
import { Goods } from '../types/goods.enum.js';
import { Offer } from '../types/offer.type.js';
import { PropertyType } from '../types/property-type.enum.js';


export function createOffer(offerData: string): Offer {
  const [
    title, description, postDate, city, previewImage, images, isPremium, isFavorite,
    rating, type, rooms, guests, price, goods, hostData, commentsCount, location
  ] = offerData.replace('\n', '').split('\t');

  const hostParts = hostData.split(',');
  const [name, email, avatarUrl, password, isPro] = hostParts;
  const locationParts = location.split(',');

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
