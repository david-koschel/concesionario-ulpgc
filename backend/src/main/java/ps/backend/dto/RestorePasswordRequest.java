package ps.backend.dto;

import lombok.Getter;

@Getter
public class RestorePasswordRequest {
    // Getters y setters
    private String email;
    private String password;

    // Constructor
    public RestorePasswordRequest() {
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
