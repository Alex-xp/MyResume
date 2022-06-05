// import the library
import { library } from '@fortawesome/fontawesome-svg-core';

// импортируем все разделы (для импорта в виде библиотеек - нужно указать список импортируемых иконок)
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(
    far,
    fab,
    fas
    // сюда необходимо добавить список импортируемых иконок (в текущем примере добавляются все иконки)
);
