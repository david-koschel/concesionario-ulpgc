package ps.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.stream.Collectors;

import static ps.backend.security.SecurityConstant.*;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        Optional<UsernamePasswordAuthenticationToken> authenticationToken = getAuthentication(request);
        authenticationToken.ifPresent(usernamePasswordAuthenticationToken -> SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken));
        chain.doFilter(request, response);
    }

    private Optional<UsernamePasswordAuthenticationToken> getAuthentication(HttpServletRequest request) {
        try {
            String token = request.getHeader(TOKEN_HEADER);
            if ((token != null && !token.isEmpty()) && token.startsWith(BEARER)) {
                Jws<Claims> parsedToken = Jwts.parser()
                        .verifyWith(JWT_KEY)
                        .build()
                        .parseSignedClaims(BEARER_PATTERN.matcher(token).replaceAll(Matcher.quoteReplacement("")));
                String username = parsedToken.getPayload().getSubject();
                if (username != null && !username.isEmpty()) {
                    List<SimpleGrantedAuthority> authorities = ((List<?>) parsedToken.getPayload()
                            .get("rol")).stream()
                            .map(authority -> new SimpleGrantedAuthority((String) authority))
                            .collect(Collectors.toList());
                    return Optional.of(new UsernamePasswordAuthenticationToken(username, null, authorities));
                }
            }
            return Optional.empty();
        } catch (ExpiredJwtException e) {
            return Optional.empty();
        }
    }
}
