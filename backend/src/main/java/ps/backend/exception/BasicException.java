package ps.backend.exception;

public class BasicException extends RuntimeException {
    public BasicException() {
    }

    public BasicException(String message) {
        super(message);
    }
}
