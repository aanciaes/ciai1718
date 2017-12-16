package unl.fct.artbiz.notifications.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends CrudRepository<Notification, Long>{

    List<Notification> getNotificationsByDestinationUserAndAndState (Long userId, NotificationState state);

}
