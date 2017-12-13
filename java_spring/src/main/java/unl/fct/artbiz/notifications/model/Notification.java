package unl.fct.artbiz.notifications.model;

public class Notification {

    private String message;
    private NotificationState state;

    public Notification(String message) {
        this.message = message;
        this.state=NotificationState.NEW;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public NotificationState getState() {
        return state;
    }

    public void setState(NotificationState state) {
        this.state = state;
    }
}

