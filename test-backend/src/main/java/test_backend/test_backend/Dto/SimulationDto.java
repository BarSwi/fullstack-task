package test_backend.test_backend.Dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import test_backend.test_backend.Entities.DailyResult;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SimulationDto(
        long ID,
        @Schema(description = "Nazwa symulacji")
        String N,
        @Schema(description = "Wielkość populacji - Long. (Większa od 0)")
        long P,
        @Schema(description = "Liczba zakażonych - Long. (Większa od 0 i wielkości populacji")
        long I,
        @Schema(description = "Współczynnik  zakażalności - Int. (Większy od 0)")
        int R,

        @Schema(description = "Współczynnik śmiertelności - Double. (0-1)")
        double M,
        @Schema(description = "Dni potrzebne do wyzdrowienia - Int. (Większe od 1 i Tm")
        int Ti,

        @Schema(description = "Dni do zgonu - Int. (Większe od 0, mniejsze od Ti")
        int Tm,

        @Schema(description = "Długość całej symulacji - Int. (Większa od 0)")
        int Ts
) {
}
