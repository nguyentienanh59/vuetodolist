import UserRepository from 'services/repositories/restful/user.repository';

class RepositoryFactory {
  getRepository(serviceName) {
    switch (serviceName) {
      case 'user':
        return UserRepository;
      default:
        throw Error('Invalid param');
    }
  }
}

export default new RepositoryFactory();
