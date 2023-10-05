
const { getInstance } = require('../app');

const app = getInstance();

app.listen(app.get('puerto'), () => {
    console.log('Nombre de la App', app.get('nombreApp'));
    console.log('Puerto del servidor', app.get('puerto'));
});

module.exports = app;
