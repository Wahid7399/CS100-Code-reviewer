
export enum FeedbackCategory {
  BUG = 'BUG',
  STYLE = 'STYLE',
  PERFORMANCE = 'PERFORMANCE',
  SUGGESTION = 'SUGGESTION',
  SECURITY = 'SECURITY'
}

export interface FeedbackItem {
  line: number;
  category: FeedbackCategory;
  comment: string;
  suggestion: string;
}
