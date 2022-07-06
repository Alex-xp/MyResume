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
