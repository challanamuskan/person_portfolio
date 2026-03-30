

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  tags: string[];
  link?: string;
  year: string;
  modalStyle?: 'achievement';
}

export interface ContentCategory {
  title: string;
  items: PortfolioItem[];
}

// FIX: Add and export the ChatMessage interface for use in the Chatbot component.
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
