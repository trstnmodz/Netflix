export type ContentType = 'movie' | 'anime' | 'series'
export type ContentStatus = 'ongoing' | 'completed'

export interface Content {
  id: string
  title: string
  slug: string
  description: string | null
  content_type: ContentType
  poster_url: string | null
  backdrop_url: string | null
  release_year: number | null
  content_rating: string | null
  runtime_minutes: number | null
  status: ContentStatus | null
  director: string | null
  cast_members: string | null
  is_featured: boolean
  is_published: boolean
  dropbox_shared_url: string | null
  playback_url: string | null
  playback_status: string | null
  created_at: string
  updated_at: string
}

export interface Genre {
  id: string
  name: string
  slug: string
}

export interface Season {
  id: string
  series_id: string
  season_number: number
  title: string | null
  description: string | null
  created_at: string
}

export interface Episode {
  id: string
  season_id: string
  episode_number: number
  title: string
  description: string | null
  runtime_minutes: number | null
  thumbnail_url: string | null
  dropbox_shared_url: string | null
  playback_url: string | null
  playback_status: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  username: string | null
  avatar_url: string | null
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface WatchProgress {
  id: string
  user_id: string
  content_id: string
  episode_id: string | null
  position_seconds: number
  duration_seconds: number | null
  progress_percent: number
  completed: boolean
  last_watched_at: string
}
