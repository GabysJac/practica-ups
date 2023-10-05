const assert = require('assert');
const app = require('../src/index');
const request = require('supertest');

describe('Empleado Controller', () => {
    describe('GET /empleados', () => {
        it('Debería obtener una lista de empleados', (done) => {
            request(app)
                .get('/api/empleados')
                .expect(200)
                .end((err, res) => {
                    assert(Array.isArray(res.body), 'No se recibió una matriz de empleados');
                    done();
                });
        });
    });

    describe('POST fail /empleados', () => {

        it('No Debería crear un nuevo empleado',  (done) => {
            const nuevoEmpleado = {
                nombre: 'Nuevo Empleado',
                cargo: 'Desarrollador',
                sueldo: 50000,
            };

            const res =  request(app)
                .post('/api/empleados')
                .send(nuevoEmpleado)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });
    });
    describe('GET /empleados/:id', () => {
        it('Debería obtener un empleado por su ID', (done) => {
            const empleadoID = '65178ff83bd9c74b277d6ee3';

            request(app)
                .get(`/api/empleados/${empleadoID}`)
                .expect(200)
                .end((err, res) => {
                    assert.strictEqual(res.body._id, empleadoID);
                    done();
                });
        });
        it('No Debería obtener un empleado por su ID', (done) => {
            const empleadoIDFalse = '65178ff83bd9c74b277d6ee3e3';

            request(app)
                .get(`/api/empleados/${empleadoIDFalse}`)
                .expect(500)
                .end((err, res) => {
                    done();
                });
        });
    });
});