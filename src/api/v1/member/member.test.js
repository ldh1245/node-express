import config from 'config';
import app from 'app';
import request from 'supertest';
import { expect } from 'chai';
import { logger } from 'utils/logger';

const { HOST, PORT } = config;

describe('MEMBERS', () => {
    let server;

    before((done) => {
        server = app.listen(PORT, () => {
            logger.debug(`Server running at ${HOST}:${PORT}`);
            done();
        });
    });

    after(() => {
        server.close();
    });

    describe('GET /v1/members', () => {
        it('should return array', (done) => {
            request(server)
                .get('/v1/members?page=1&limit=5')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }

                    expect(res.body).instanceOf(Array);

                    done();
                });
        });
    });
});
