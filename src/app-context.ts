import { IBowlingScoreApp } from 'domain/types';
import { createContext } from 'react';

export const AppContext = createContext<IBowlingScoreApp | null>(null);
