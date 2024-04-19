package ps.backend.dto;

import java.util.Date;

public record TestDriveRequestDto(String username, String carModel, Date startDate, Date endDate, boolean accepted) {
}
