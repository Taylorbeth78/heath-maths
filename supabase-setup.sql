-- Run this in your Supabase dashboard → SQL Editor
-- It sets up the resources table and file storage

-- 1. Create the resources table
create table resources (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  year_group text,
  topic text,
  file_url text,
  file_name text,
  uploaded_by text,
  created_at timestamp with time zone default now()
);

-- 2. Allow logged-in teachers to read/write resources
alter table resources enable row level security;

create policy "Teachers can view resources"
  on resources for select
  using (auth.role() = 'authenticated');

create policy "Teachers can insert resources"
  on resources for insert
  with check (auth.role() = 'authenticated');

create policy "Teachers can delete their own resources"
  on resources for delete
  using (auth.uid()::text = uploaded_by);

-- 3. Storage bucket for files
-- Go to: Storage → New bucket → name it "resources" → make it Public
-- Then add this policy:
-- (Do this in Storage → resources bucket → Policies tab)

-- INSERT policy for authenticated users:
-- (auth.role() = 'authenticated')

-- SELECT policy (public read):
-- true
