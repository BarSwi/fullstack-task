package test_backend.test_backend.Dto;

import java.util.Optional;

public record SimulationDto(
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
