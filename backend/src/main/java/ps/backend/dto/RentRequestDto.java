package ps.backend.dto;

import ps.backend.entity.RentVehicle;

import java.time.LocalDate;

public record RentRequestDto(RentVehicle rentVehicle, LocalDate startDate, LocalDate endDate, boolean bought, Integer id) {
}
