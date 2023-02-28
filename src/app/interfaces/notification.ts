export interface Notification {
  message: Message;
  color: string;
  title: string;
}

export interface Message {
  message?: string;
  error?: { [key: string]: any};
}
