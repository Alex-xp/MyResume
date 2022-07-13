


-- СОЗДАЕМ ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ РАБОТЫ С ПОЛЬЗОВАТЕЛЯМИ

-- найти пользователя для авторизации (тест)
CREATE FUNCTION get_user_auth( VARCHAR(150), VARCHAR(250) ) RETURNS users AS $$
SELECT * FROM users WHERE "login"=$1 AND "password"=$2 AND "active"=TRUE;
$$
LANGUAGE SQL;





CREATE FUNCTION find_users( VARCHAR(150) ) RETURNS SETOF users AS $$
SELECT u.* FROM users AS u
WHERE u.login LIKE concat('%', $1, '%') ORDER BY u.active DESC, u.u_access ASC, u.login ASC LIMIT 1000
$$
LANGUAGE SQL;




