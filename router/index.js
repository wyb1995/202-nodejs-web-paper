import homeworks from './routers/homeworks';
import sections from './routers/sections';
import papers from './routers/papers';

export default function (app) {
  app.use('/homeworks', homeworks);
  app.use('/sections', sections);
  app.use('/papers', papers);
}