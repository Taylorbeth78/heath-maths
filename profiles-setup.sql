create table if not exists profiles (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  display_name text,
  role text default 'Teacher',
  subjects text[] default '{}',
  year_groups text[] default '{}',
  bio text,
  created_at timestamp with time zone default now()
);
