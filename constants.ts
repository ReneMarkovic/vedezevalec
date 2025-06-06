
import { Card } from './types';

export const TAROT_CARDS_DATA: Card[] = [
  { id: 1, name: 'Sonce', keywords: ['radost', 'uspeh', 'vitalnost', 'jasnost'], imageSeed: 'sun_joy_clarity' },
  { id: 2, name: 'Luna', keywords: ['intuicija', 'sanje', 'negotovost', 'skrivnosti'], imageSeed: 'moon_dreams_mystery' },
  { id: 3, name: 'Zvezda', keywords: ['upanje', 'navdih', 'mirnost', 'vodstvo'], imageSeed: 'star_hope_inspiration' },
  { id: 4, name: 'Kolo Sreče', keywords: ['cikli', 'usoda', 'preobrati', 'priložnosti'], imageSeed: 'wheel_fortune_cycles' },
  { id: 5, name: 'Puščavnik', keywords: ['introspekcija', 'modrost', 'samota', 'iskanje'], imageSeed: 'hermit_wisdom_solitude' },
  { id: 6, name: 'Ljubimca', keywords: ['odnosi', 'odločitve', 'harmonija', 'povezanost'], imageSeed: 'lovers_relationships_choices' },
  { id: 7, name: 'Moč', keywords: ['pogum', 'vzdržljivost', 'notranja moč', 'odločnost'], imageSeed: 'strength_courage_power' },
  { id: 8, name: 'Smrt', keywords: ['transformacija', 'konci', 'novi začetki', 'sprememba'], imageSeed: 'death_transformation_change' },
  { id: 9, name: 'Sodba', keywords: ['prebujenje', 'obračun', 'odrešitev', 'jasen pogled'], imageSeed: 'judgement_awakening_reckoning' },
  { id: 10, name: 'Norec', keywords: ['novi začetki', 'vera', 'spontanost', 'brezskrbnost'], imageSeed: 'fool_newbeginnings_faith' },
  { id: 11, name: 'Čarovnik', keywords: ['manifestacija', 'moč volje', 'spretnost', 'resursi'], imageSeed: 'magician_manifestation_willpower' },
  { id: 12, name: 'Svet', keywords: ['izpolnitev', 'zaključek', 'celovitost', 'dosežek'], imageSeed: 'world_completion_fulfillment' },
];

export const NUMBER_OF_CARDS_TO_DRAW = 3;
    