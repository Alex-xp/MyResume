-- Группы принадлежности пользователей
-- Для отправки общих сообщений и общей обработки данных

DROP TABLE IF EXISTS users_groups;
CREATE TABLE users_groups
(
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "group_name" CHARACTER VARYING(250) NOT NULL DEFAULT(''),
    "info" TEXT NOT NULL DEFAULT(''),
    "ord" INTEGER NOT NULL DEFAULT(0)
);

-- комментируем
COMMENT ON TABLE users_groups IS 'ГРУППЫ ПОЛЬЗОВАТЕЛЕЙ';
COMMENT ON COLUMN users_groups.group_name IS 'Наименование группы';
COMMENT ON COLUMN users_groups.info IS 'Информация о группе';
COMMENT ON COLUMN users_groups.ord IS 'Порядок предоставления группы по видимости';

-- ДОБАВЛЯЕМ ГРУППЫ ПОЛЬЗОВАТЕЛЕЙ

INSERT INTO users_groups (id, group_name, info, ord) VALUES (1, 'Администрация', 'Обобщение всей администрации сайта', 0);
INSERT INTO users_groups (id, group_name, info, ord) VALUES (2, 'Закрытая группа', 'Пользователи закрытой группы', 1);
INSERT INTO users_groups (id, group_name, info, ord) VALUES (3, 'Общая группа', 'Пользователи общей группы', 2);

