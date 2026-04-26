

export interface PortfolioItem {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  longDescription?: string;
  imageUrl: string;
  tags: string[];
  link?: string;
  liveUrl?: string;
  year?: string;
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
