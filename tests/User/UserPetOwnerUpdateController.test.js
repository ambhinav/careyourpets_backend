import _ from 'lodash';
import Assert from 'assert';
import Chai from 'chai';
import ChaiHttp from 'chai-http';
import pool from '../../src/Utils/DBUtils';
import UserFixtures from '../Fixtures/UserFixtures';
import App from '../../src/App';
import GenderUtils from '../../src/Utils/GenderUtils';
import AreaUtils from '../../src/Utils/AreaUtils';

Chai.use(ChaiHttp);

describe('Test UserPetOwnerUpdate Controller', () => {
  beforeEach('UserPetOwnerUpdate beforeEach', async () => {
    await pool.query('DELETE FROM pet_owners');
  });

  afterEach('UserPetOwnerUpdate afterEach', async () => {
    await pool.query('DELETE FROM pet_owners');
  });

  it('Should update pet owner', async () => {
    const users = await UserFixtures.SeedPetOwners(2);
    const {email, accessToken} = users[0];
    const name = 'test';
    const gender = GenderUtils.MALE;
    const contact = 'test';
    const area = AreaUtils.NORTH;
    const location = 'test';
    const bio = 'test';

    await Chai.request(App)
      .post('/user/update/petowner')
      .set('accessToken', accessToken)
      .send({
        name,
        gender,
        contact,
        area,
        location,
        bio,
      });

    const {rows} = await pool.query(
      `SELECT * FROM pet_owners WHERE email='${email}'`,
    );

    Assert.deepStrictEqual(
      {
        email,
        name,
        gender,
        contact,
        area,
        location,
        bio,
        is_deleted: false,
      },
      _.omit(rows[0], ['password']),
    );
  });

  it('Should return 422 for missing name', async () => {
    const users = await UserFixtures.SeedPetOwners(2);
    const {accessToken} = users[0];
    const gender = GenderUtils.MALE;
    const contact = 'test';
    const area = AreaUtils.NORTH;
    const location = 'test';
    const bio = 'test';

    const res = await Chai.request(App)
      .post('/user/update/petowner')
      .set('accessToken', accessToken)
      .send({
        gender,
        contact,
        area,
        location,
        bio,
      });

    Assert.deepStrictEqual(422, res.status);
  });

  it('Should return 422 for missing gender', async () => {
    const users = await UserFixtures.SeedPetOwners(2);
    const {accessToken} = users[0];
    const name = 'test';
    const contact = 'test';
    const area = AreaUtils.NORTH;
    const location = 'test';
    const bio = 'test';

    const res = await Chai.request(App)
      .post('/user/update/petowner')
      .set('accessToken', accessToken)
      .send({
        name,
        contact,
        area,
        location,
        bio,
      });

    Assert.deepStrictEqual(422, res.status);
  });

  it('Should return 422 for missing contact', async () => {
    const users = await UserFixtures.SeedPetOwners(2);
    const {accessToken} = users[0];
    const name = 'test';
    const gender = GenderUtils.MALE;
    const area = AreaUtils.NORTH;
    const location = 'test';
    const bio = 'test';

    const res = await Chai.request(App)
      .post('/user/update/petowner')
      .set('accessToken', accessToken)
      .send({
        name,
        gender,
        area,
        location,
        bio,
      });

    Assert.deepStrictEqual(422, res.status);
  });

  it('Should return 422 for missing area', async () => {
    const users = await UserFixtures.SeedPetOwners(2);
    const {accessToken} = users[0];
    const name = 'test';
    const gender = GenderUtils.MALE;
    const contact = 'test';
    const location = 'test';
    const bio = 'test';

    const res = await Chai.request(App)
      .post('/user/update/petowner')
      .set('accessToken', accessToken)
      .send({
        name,
        gender,
        contact,
        location,
        bio,
      });

    Assert.deepStrictEqual(422, res.status);
  });

  it('Should return 422 for missing location', async () => {
    const users = await UserFixtures.SeedPetOwners(2);
    const {accessToken} = users[0];
    const name = 'test';
    const gender = GenderUtils.MALE;
    const contact = 'test';
    const area = AreaUtils.NORTH;
    const bio = 'test';

    const res = await Chai.request(App)
      .post('/user/update/petowner')
      .set('accessToken', accessToken)
      .send({
        name,
        gender,
        contact,
        area,
        bio,
      });

    Assert.deepStrictEqual(422, res.status);
  });

  it('Should return 422 for missing bio', async () => {
    const users = await UserFixtures.SeedPetOwners(2);
    const {accessToken} = users[0];
    const name = 'test';
    const gender = GenderUtils.MALE;
    const contact = 'test';
    const location = 'test';
    const area = AreaUtils.NORTH;

    const res = await Chai.request(App)
      .post('/user/update/petowner')
      .set('accessToken', accessToken)
      .send({
        name,
        gender,
        contact,
        location,
        area,
      });

    Assert.deepStrictEqual(422, res.status);
  });

  it('Should return 422 for invalid gender', async () => {
    const users = await UserFixtures.SeedPetOwners(2);
    const {accessToken} = users[0];
    const name = 'test';
    const gender = 'test';
    const contact = 'test';
    const area = AreaUtils.NORTH;
    const location = 'test';
    const bio = 'test';

    const res = await Chai.request(App)
      .post('/user/update/petowner')
      .set('accessToken', accessToken)
      .send({
        name,
        gender,
        contact,
        area,
        location,
        bio,
      });

    Assert.deepStrictEqual(422, res.status);
  });

  it('Should return 422 for invalid area', async () => {
    const users = await UserFixtures.SeedPetOwners(2);
    const {accessToken} = users[0];
    const name = 'test';
    const gender = GenderUtils.MALE;
    const contact = 'test';
    const area = 'test';
    const location = 'test';
    const bio = 'test';

    const res = await Chai.request(App)
      .post('/user/update/petowner')
      .set('accessToken', accessToken)
      .send({
        name,
        gender,
        contact,
        area,
        location,
        bio,
      });

    Assert.deepStrictEqual(422, res.status);
  });

  it('Should return 401 for missing accesstoken', async () => {
    const name = 'test';
    const gender = GenderUtils.MALE;
    const contact = 'test';
    const area = AreaUtils.NORTH;
    const location = 'test';
    const bio = 'test';

    const res = await Chai.request(App).post('/user/update/petowner').send({
      name,
      gender,
      contact,
      area,
      location,
      bio,
    });

    Assert.deepStrictEqual(401, res.status);
  });
});
