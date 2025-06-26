// Типы для работы с базой данных

export interface User {
  id: string;
  telegramId: bigint;
  firstName: string;
  lastName?: string | null;
  username?: string | null;
  languageCode?: string | null;
  timezone: string;
  settings?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface WeeklyRating {
  id: string;
  userTelegramId: bigint;
  weekStartDate: Date;
  rating: number; // 1-5
  description?: string | null;
  mediaUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}

// DTO для создания пользователя
export interface CreateUserData {
  telegramId: bigint;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  timezone?: string;
  settings?: Record<string, unknown>;
}

// DTO для создания оценки недели
export interface CreateWeeklyRatingData {
  userTelegramId: bigint;
  weekStartDate: Date;
  rating: number;
  description?: string;
  mediaUrls?: string[];
}

// DTO для обновления оценки недели
export interface UpdateWeeklyRatingData {
  rating?: number;
  description?: string;
  mediaUrls?: string[];
}

// Результат с пагинацией
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Статистика недельных оценок
export interface WeeklyRatingStats {
  totalRatings: number;
  averageRating: number;
  ratingDistribution: {
    [rating: number]: number;
  };
  bestWeek?: WeeklyRating;
  worstWeek?: WeeklyRating;
} 
