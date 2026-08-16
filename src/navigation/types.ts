import { SessionId } from '../types/dhikr';

export type RootStackParamList = {
  Home: undefined;
  Session: { sessionId: SessionId };
  Completion: { sessionId: SessionId };
};
