package ps.backend.dto;

import org.antlr.v4.runtime.misc.NotNull;

public class ForgotPasswordDto {

    @NotNull
    private String token;

    @NotNull
    private String newPassword;

    @NotNull
    private String newPasswordRepeat;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getNewPasswordRepeat() {
        return newPasswordRepeat;
    }

    public void setNewPasswordRepeat(String newPasswordRepeat) {
        this.newPasswordRepeat = newPasswordRepeat;
    }
}
