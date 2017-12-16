package unl.fct.artbiz.notifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import unl.fct.artbiz.notifications.model.Notification;
import unl.fct.artbiz.notifications.services.NotificationService;

import java.util.List;

@RestController("/notifications")
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @RequestMapping(value = "/{notificationId}", method = RequestMethod.GET)
    public Notification getNotification(@PathVariable Long notificationId) {
        return notificationService.getNotification(notificationId);
    }

    @RequestMapping(value = "/{notificationId}/read", method = RequestMethod.PUT)
    public void readNotification(@PathVariable Long notificationId) {
        notificationService.readNotification(notificationId);
    }

    @RequestMapping(value = "/user/{userId}", method = RequestMethod.GET)
    public List<Notification> getNewNotificationForUser(@PathVariable Long userId) {
        return notificationService.getNewNotificationForUser(userId);
    }
}