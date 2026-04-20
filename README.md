# Comparison-of-two-scenes

Тестовое задание: приложение для сравнения двух облаков точек с использованием Potree.js.

![общий вид](https://github.com/AATerekhov/Comparison-of-two-scenes/blob/main/public/images/Potree.png)

## Commands

- `npm run check` - validate project integrity and required dependencies.
- `npm run dev` - start the Vite dev server.
- `npm run build` - create a production build in `dist/`.
- `npm run preview` - preview the production build locally.
- `npm run start` - alias for `npm run dev`.

## Note

Приложение построено на базе Vite и предназначено для одновременного отображения двух облаков точек в отдельных viewport’ах.

Основные возможности:

- Отображение двух сцен рядом
- Изменяемый размер окон (разделитель)
- Синхронизация камер между окнами
- Переключение режимов визуализации (например, по высоте)
- Панель состояния и панель управления

Все ассеты Potree и данные облаков точек размещаются в директории `public/` и раздаются как статические файлы.

## Установка и запуск

### 1. Установить зависимости

```bash
npm install
```

### 2. Подготовить ресурсы Potree

Перед запуском необходимо вручную скопировать файлы Potree в директорию public/.
Структура должна выглядеть так:

```bash
public/
  build/
    potree/
      potree.js
      potree.css
  libs/
    three.js/
    jquery/
    d3/
    proj4/
    openlayers3/
    spectrum/
    jstree/
  pointclouds/
    <ваши датасеты>
```
### 3. Где взять Potree

Официальный репозиторий:

https://github.com/potree/potree

Оттуда нужно взять:

- build/potree
- libs
- (опционально) примеры pointcloud

## Примечания
- Приложение не использует сервер — всё работает через Vite
- Все ресурсы Potree должны находиться в public/
- Данные point cloud должны быть предварительно сконвертированы в формат Potree (cloud.js)
- Не все датасеты содержат одинаковые атрибуты (например, intensity может отсутствовать)
