import { Photo } from './photo';

export interface Nomad {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  lastActive: Date;
  created: Date;
  dateOfBirth: Date;
  isActive: boolean;
  isVisible: boolean;
  isVerified: boolean;
  phone?: string;
  ocupation?: string;
  education?: string;
  passionate?: string;
  numberOfAds: number;
  numberOfApplications: number;
  aboutMe?: string;
  photoUrl: string;
  photos: Photo[];
}
