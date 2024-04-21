package ps.backend.security;

import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.regex.Pattern;

final class SecurityConstant {
    static final String AUTH_LOGIN_URL = "/api/login";
    static final String[] AUTH_WHITELIST = {
            "/api/contact_message/form",
            "/api/catalogue/all",
            "/api/vehicle/public/**",
    };
    static final String API_URL = "/api/**";
    static final SecretKey JWT_KEY = Keys.hmacShaKeyFor("kBLPoylVFL5yWsPuBRkGltt9W3n5yNxkILchku8xEGTCkZsYlLVDkR1AB7sWuLlz".getBytes());
    static final String TOKEN_HEADER = "Authorization";
    static final String BEARER = "Bearer ";
    static final Pattern BEARER_PATTERN = Pattern.compile("Bearer ", Pattern.LITERAL);
}
