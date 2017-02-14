import homeworks from './routers/homeworks';

export default function(app) {
    app.use('/homeworks', homeworks);
}