

import { Cities } from './cities.enum.js';
import { Goods } from './goods.enum.js';
import { Location } from './location.type.js';
import { PropertyType } from './property-type.enum.js';
import { User } from './user.type.js';


export type Offer = {
  title: string; // Obligatory, 10-100 symbols
  description: string; // Obligatory, 20-1024 symbols
  postDate: Date //Obligatory
  city: Cities; // One of 6 cities
  previewImage: string; // Obligatory, link
  images: string[]; // Obligatory, 6 photos in total
  isPremium: boolean; //Obligatory
  isFavorite: boolean; // Obligatory
  rating: number; // Obligatory, numbers with 1 symbol after comma
  type: PropertyType; // Obligatory, one of 4 types
  rooms: number; // Obligatory, 1-8
  guests: number; // Obligatory. 1-10
  price: number; // Obligatory, 100-100000
  goods: Goods[]; // Obligatory, from 1 to 8 from list
  host: User; // Obligatory
  commentsCount: number; // Auto count
  location: Location; // Obligatory
  }
