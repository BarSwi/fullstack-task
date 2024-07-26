package test_backend.test_backend.Dto;

import java.util.Optional;

public record SimulationDto(
        String N,
        int P,
        int I,
        int R,
        float M,
        int Ti,
        int Tm,
        int Ts
) {
}
