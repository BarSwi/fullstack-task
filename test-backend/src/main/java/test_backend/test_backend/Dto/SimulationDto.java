package test_backend.test_backend.Dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import test_backend.test_backend.Entities.DailyResult;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SimulationDto(
        long ID,
        String N,
        long P,
        long I,
        int R,
        double M,
        int Ti,
        int Tm,
        int Ts
) {
}
