package unl.fct.artbiz.users.utils;

import unl.fct.artbiz.users.exceptions.BrokenConditionException;
import unl.fct.artbiz.users.exceptions.EmailAlreadyExistsException;
import unl.fct.artbiz.users.exceptions.UserNotFoundException;
import unl.fct.artbiz.users.model.User;

public class Utils {

    public static void validateUserUpdate(User curentUser, User user) {
        if (curentUser == null) {
            throw new UserNotFoundException();
        }
        if (curentUser.getId() != user.getId() ||
                user.getEmail().trim().length() == 0 ||
                user.getEmail() == null ||
                user.getPassword().trim().length() == 0 ||
                user.getPassword() == null || user.getAccountType() != curentUser.getAccountType()) {
            throw new BrokenConditionException();
        }

        //Check if user is trying to change is email
        //If so, he cannot change to an email that already exists
        if (!user.getEmail().equals(curentUser.getEmail())) {
            throw new EmailAlreadyExistsException();
        }
    }
}
