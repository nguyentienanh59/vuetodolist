import BaseService from 'services/base.service';
import { useAuthStore } from 'stores/auth-store';

class UserService extends BaseService {
  async login(params) {
    const auth = useAuthStore();
    auth.signIn(params);

    return params;
  }
}

export default new UserService('user');
