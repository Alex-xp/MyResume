-- создаем таблицу пользователей
DROP TABLE IF EXISTS users;
CREATE TABLE users
(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "login" CHARACTER VARYING(150) NOT NULL DEFAULT(''),
    "password" CHARACTER VARYING(250) NOT NULL DEFAULT(''),
	"u_access" INTEGER NOT NULL DEFAULT(10000),
	"user_data" JSON NOT NULL DEFAULT('{}'),
	"active" BOOLEAN NOT NULL DEFAULT(FALSE),
	"activation_code" CHARACTER VARYING(200) NOT NULL DEFAULT(''),
	"remember_code" CHARACTER VARYING(200) NOT NULL DEFAULT(''),
	"email" CHARACTER VARYING(200) NOT NULL DEFAULT(''),
	"email_active" BOOLEAN NOT NULL DEFAULT(FALSE),
	"email_code" CHARACTER VARYING(200) NOT NULL DEFAULT('')
);

-- комментируем
COMMENT ON TABLE users IS 'пользователи системы';
COMMENT ON COLUMN users.login IS 'Логин';
COMMENT ON COLUMN users.password IS 'Пароль';
COMMENT ON COLUMN users.u_access IS 'Доступ по уровням (0 - супер админ; 10 - админ; 1000 - пользователь; 10000 - гость)';
COMMENT ON COLUMN users.user_data IS 'Дополнительные данные пользователя в формате json';
COMMENT ON COLUMN users.active IS 'Активированность пользователя';
COMMENT ON COLUMN users.activation_code IS 'Код активации пользователя';
COMMENT ON COLUMN users.remember_code IS 'Напоминание пароля';
COMMENT ON COLUMN users.email IS 'email пользователя';
COMMENT ON COLUMN users.email_active IS 'Активность email';
COMMENT ON COLUMN users.email_code IS 'Код активации email';
