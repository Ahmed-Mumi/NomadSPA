export interface Message {
  id: number;
  senderId: number;
  senderFullName: string;
  senderPhotoUrl: string;
  recipientId: number;
  recipientFullName: string;
  recipientPhotoUrl?: string;
  cOntent: string;
  dateRead?: Date;
  messageSent: Date;
  senderEmail: string;
  recipientEmail: string;
}
