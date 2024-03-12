package ps.backend.security;

import java.util.regex.Pattern;

final class SecurityConstant {
    static final String AUTH_LOGIN_URL = "/api/login";
    static final String[] AUTH_WHITELIST = {"/api/user/all"}; //URL DE PRUEBA
    static final String API_URL = "/api/**";
    static final String JWT_KEY = "kBLPoylVFL5yWsPuBRkGltt9W3n5yNxkILchku8xEGTCkZsYlLVDkR1AB7sWuLlz";
    static final String TOKEN_HEADER = "Authorization";
    static final String BEARER = "Bearer ";
    static final Pattern BEARER_PATTERN = Pattern.compile("Bearer ", Pattern.LITERAL);
}
