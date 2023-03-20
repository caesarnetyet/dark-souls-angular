import { io } from 'socket.io-client';
import { API_URL } from './endpoint';
export const socket = io(API_URL);
