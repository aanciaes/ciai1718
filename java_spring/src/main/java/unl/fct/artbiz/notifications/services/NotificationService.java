package unl.fct.artbiz.notifications.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import unl.fct.artbiz.notifications.exceptions.NotificationNotFoundException;
import unl.fct.artbiz.notifications.model.Notification;
import unl.fct.artbiz.notifications.model.NotificationRepository;
import unl.fct.artbiz.notifications.model.NotificationState;

import java.util.List;

@Service
public class NotificationService {

    // The SimpMessagingTemplate is used to send Stomp over WebSocket messages.
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    NotificationRepository notificationRepository;


    public void saveNotification(Notification notification) {
        notificationRepository.save(notification);
    }

    public void readNotification(Long notificationId) {
        Notification n = notificationRepository.findOne(notificationId);

        if (n == null) {
            throw new NotificationNotFoundException();
        } else {
            n.setState(NotificationState.READ);
            notificationRepository.save(n);
        }
    }

    public Notification getNotification(Long notificationId) {
        Notification n = notificationRepository.findOne(notificationId);

        if (n == null) {
            throw new NotificationNotFoundException();
        } else {
            return n;
        }
    }

    public void notify(Notification notification, Long userId) {
        messagingTemplate.convertAndSend(
                String.format("/%s/notify", userId), notification
        );
    }

    public void getNewNotificationForUser(Long userId) {
        notificationRepository.getNotificationsByDestinationUserAndAndState(userId, NotificationState.NEW)
        .forEach(notification -> {
            notify(notification, userId);
        });
    }
}