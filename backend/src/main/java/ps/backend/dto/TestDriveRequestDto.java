package ps.backend.dto;

import ps.backend.entity.TestDriveCar;

import java.util.Date;

public record TestDriveRequestDto(String name, String email, TestDriveCar carModel, Date startDate, Date endDate, boolean accepted) {
}
