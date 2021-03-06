package unl.fct.artbiz.users.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findAll ();

    User getUserByEmail (String name);

    boolean existsByEmail (String email);

}
