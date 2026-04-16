# Comparison-of-two-scenes

Test task: compare two point cloud scenes with Potree.js.

## Commands

- `npm run check` - validate project integrity and required dependencies.
- `npm run dev` - start the Vite dev server.
- `npm run build` - create a production build in `dist/`.
- `npm run preview` - preview the production build locally.
- `npm run start` - alias for `npm run dev`.

## Note

The app uses Vite as the entry point and keeps Potree assets and point cloud datasets in `public/`, so they are served as static files in both dev and production without a custom Express server.
