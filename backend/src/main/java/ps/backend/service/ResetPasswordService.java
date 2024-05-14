package ps.backend.service;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import org.springframework.stereotype.Service;
import ps.backend.dto.ForgotPasswordDto;
import ps.backend.entity.User;
import ps.backend.exception.BasicException;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.concurrent.TimeUnit;

@Service
public class ResetPasswordService {

    private final Cache<String, String> tokenCache;
    private final Cache<String, Boolean> usernameHasChangedPswCache;
    private final UserService userService;
    private final EmailService emailService;

    public ResetPasswordService(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
        tokenCache = CacheBuilder.newBuilder().expireAfterWrite(5, TimeUnit.MINUTES).build();
        usernameHasChangedPswCache = CacheBuilder.newBuilder().expireAfterWrite(4, TimeUnit.HOURS).build();
    }

    public void requestPasswordChange(String username) {
        try {
            User user = userService.findByUsername(username);
            if (usernameHasChangedPassword(username)) {
                throw new BasicException(
                        "La contraseña ha sido restablecida recientemente. Vuelva a intentarlo más tarde");
            }
            String token = generateToken();
            tokenCache.put(token, username);
            emailService.sendEmail(user.getEmail(), "Restablecer contraseña - Concesionario ULPGC", String.format("""
                    Link para restablecer la contraseña: http://localhost:4200/reset-password/%s
                    Este link caducará en 5 minutos.
                    """, token));
        } catch (BasicException e) {
            System.out.println(e.getMessage());
        }
    }

    public void resetPassword(ForgotPasswordDto dto) {
        String username = tokenCache.getIfPresent(dto.getToken());
        if (username == null || usernameHasChangedPassword(username)) {
            throw new BasicException("El token es inválido o ha expirado");
        }
        if (!dto.getNewPassword().equals(dto.getNewPasswordRepeat())) {
            throw new BasicException("Las contraseñas no coinciden");
        }
        tokenCache.invalidate(dto.getToken());
        userService.changeForgottenPassword(username, dto.getNewPassword());
        usernameHasChangedPswCache.put(username, true);
    }

    private boolean usernameHasChangedPassword(String username) {
        Boolean cacheResult = usernameHasChangedPswCache.getIfPresent(username);
        return cacheResult != null && cacheResult;
    }

    private String generateToken() {
        return new BigInteger(256, new SecureRandom()).toString(32);
    }
}
