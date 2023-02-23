import BaseRepository from './base.repository';

class UserRepository extends BaseRepository {
  constructor() {
    super('/users');
  }

  login(params) {
    // return this.client.post('/login', params);
    return Promise.resolve(params);
  }

  checkLogin() {
    return this.client.get('/checklogin');
  }

  checkLoginV2() {
    this.client.version = 'v2';
    return this.client.get('/checklogin');
  }
}

export default new UserRepository();
