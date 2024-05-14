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
            "/api/user/register",
            "/api/user/sendEmail",
            "/api/test-drive-car/all",
            "/api/test-drive-request/form",
            "/api/test-drive-request/occupied-dates",
            "/api/tpv/notification/**",
            "/api/rent-vehicles/all",
            "/api/rent-vehicle-request/public/**",
            "/api/user/password/forgot",
            "/api/user/password/reset",
            "/api/blog/public/**"
    };
    static final String API_URL = "/api/**";
    static final SecretKey JWT_KEY = Keys.hmacShaKeyFor("kBLPoylVFL5yWsPuBRkGltt9W3n5yNxkILchku8xEGTCkZsYlLVDkR1AB7sWuLlz".getBytes());
    static final String TOKEN_HEADER = "Authorization";
    static final String BEARER = "Bearer ";
    static final Pattern BEARER_PATTERN = Pattern.compile("Bearer ", Pattern.LITERAL);
}
