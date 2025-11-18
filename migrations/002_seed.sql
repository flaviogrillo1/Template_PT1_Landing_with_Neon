-- user demo: email demo@finwise.dev / password: Demo123!
INSERT INTO users (email, password_hash, name)
VALUES (
  'demo@finwise.dev',
  '$2b$10$8t7Y7O3d6m2y2xKk2IY0zOuPq5o9G6ZzF7t2Xr2v3z7d8w9a1b2Cq', -- bcrypt de "Demo123!"
  'Demo User'
)
ON CONFLICT (email) DO NOTHING;

-- Opcional: categorías demo para el usuario demo (reemplaza USER_ID en tiempo de seed si quieres)
