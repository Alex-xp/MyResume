

--***************************************************************************************************************************************
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

-- Добавляем суперпользователя ( пароль: 000000 ключ 'sha256' - 'alex-xp')
INSERT INTO users ("login", "password", "u_access", "user_data", "active", "email", "email_active") 
    VALUES ('alex-xp@list.ru', 'd72caa76c5c6e35a318c5d63cea753ef1c5791aef79da91532671d5bc2e8ab9e', 0, '{}', TRUE, 'alex-xp@list.ru', TRUE);

INSERT INTO users ("login", "password", "u_access", "user_data", "active", "email", "email_active") 
    VALUES ('test', 'd72caa76c5c6e35a318c5d63cea753ef1c5791aef79da91532671d5bc2e8ab9e', 10000, '{}', TRUE, 'alex-xp@list.ru', TRUE);


--***************************************************************************************************************************************
-- создаем таблицу сессий пользователей

DROP TABLE IF EXISTS users_sessions;
CREATE TABLE users_sessions
(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "uid" BIGINT NOT NULL DEFAULT(0),
	"key_uid" CHARACTER VARYING(250) NOT NULL DEFAULT(''),
	"sess_key" CHARACTER VARYING(250) NOT NULL DEFAULT(''),
	"started" TIMESTAMP NOT NULL DEFAULT(CURRENT_TIMESTAMP),
    "expires" TIMESTAMP NOT NULL DEFAULT(CURRENT_TIMESTAMP),
	"sess_data" JSON NOT NULL DEFAULT('{}')
);
COMMENT ON TABLE users_sessions IS 'сессии пользователей';
COMMENT ON COLUMN users_sessions.uid IS 'ИД пользователя';
COMMENT ON COLUMN users_sessions.key_uid IS 'sha256(uid)';
COMMENT ON COLUMN users_sessions.sess_key IS 'sha256(id + "_" + uid)';
COMMENT ON COLUMN users_sessions.expires IS 'Время жизни сессии';
COMMENT ON COLUMN users_sessions.sess_data IS 'Данные сессии';









