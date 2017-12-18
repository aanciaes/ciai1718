package unl.fct.artbiz.notifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import unl.fct.artbiz.auth.annotations.RestrictedToBuyer;
import unl.fct.artbiz.auth.annotations.RestrictedToMatchingUser;
import unl.fct.artbiz.auth.annotations.RestrictedToMatchingUserGivenId;
import unl.fct.artbiz.auth.annotations.RestrictedToNoficationOwner;
import unl.fct.artbiz.notifications.model.Notification;
import unl.fct.artbiz.notifications.services.NotificationService;

import java.util.List;

@RestController
@RequestMapping(value = "/notifications")
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @RestrictedToNoficationOwner
    @RequestMapping(value = "/{notificationId}", method = RequestMethod.GET)
    public Notification getNotification(@PathVariable Long notificationId) {
        return notificationService.getNotification(notificationId);
    }

    @RestrictedToNoficationOwner
    @RequestMapping(value = "/{notificationId}/read", method = RequestMethod.PUT)
    public void readNotification(@PathVariable Long notificationId) {
        notificationService.readNotification(notificationId);
    }

    @RestrictedToMatchingUserGivenId
    @RequestMapping(value = "/user/{userId}", method = RequestMethod.GET)
    public void getNewNotificationForUser(@PathVariable Long userId) {
        //Through web socket
        notificationService.getNewNotificationForUser(userId);
    }
}