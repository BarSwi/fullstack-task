package test_backend.test_backend.Services;

import com.fasterxml.jackson.databind.exc.ValueInstantiationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import test_backend.test_backend.Dto.SimulationDto;
import test_backend.test_backend.Entities.Simulation;
import test_backend.test_backend.Errors.ValidationErrorsCombined;
import test_backend.test_backend.Repositories.SimulationRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class SimulationService {
    private final SimulationRepository simulationRepository;
    private final DailyResultService dailyResultService;



    public SimulationDto addSimulation(SimulationDto simulationDto){
        validation(simulationDto);

        Simulation simulation = simulationRepository.save(dtoToEntity(simulationDto));
        dailyResultService.calculateResults(simulation);
        return entityToDto(simulation);
    }

    public List<SimulationDto> getAll(){
        return simulationRepository.findAll()
                .stream()
                .map(this::entityToDto)
                .toList();
    }

    public void deleteSimulation(long id){
        simulationRepository.deleteByID(id);
    }

    public SimulationDto editSimulation(long id, SimulationDto simulationDto){
        validation(simulationDto);

        Optional<Simulation> optionalSim = simulationRepository.findById(id);
        if(optionalSim.isPresent()){
            Simulation simulation = optionalSim.get();
            simulation.setN(simulationDto.N());
            simulation.setP(simulationDto.P());
            simulation.setI(simulationDto.I());
            simulation.setR(simulationDto.R());
            simulation.setM(simulationDto.M());
            simulation.setTi(simulationDto.Ti());
            simulation.setTm(simulationDto.Tm());
            simulation.setTs(simulationDto.Ts());
            dailyResultService.calculateResults(simulation);
            simulationRepository.save(simulation);
            return entityToDto(simulation);
        }

        return null;
    }
    private Simulation dtoToEntity(SimulationDto simulationDto){
        return  Simulation.builder()
                .N(simulationDto.N())
                .P(simulationDto.P())
                .I(simulationDto.I())
                .R(simulationDto.R())
                .M(simulationDto.M())
                .Ti(simulationDto.Ti())
                .Tm(simulationDto.Tm())
                .Ts(simulationDto.Ts())
                .build();
    }

    private SimulationDto entityToDto(Simulation simulation){
        return new SimulationDto(
                simulation.getN(),
                simulation.getP(),
                simulation.getI(),
                simulation.getR(),
                simulation.getM(),
                simulation.getTi(),
                simulation.getTm(),
                simulation.getTs()
        );
    }

    private void validation(SimulationDto simulationDto) throws ValidationErrorsCombined {
        List<String> errors = new ArrayList<>();
        final long maxValue = 900000000000000L;

        // Main validation
        if(simulationDto.I() <= 0 ) errors.add("Liczba osób zakażonych musi być większa od 0 i liczbą całkowitą");
        if(simulationDto.R() <= 0 ) errors.add("Współczynnik R musi być większy od 0 i liczbą całkowitą");
        if(simulationDto.P() <= 0) errors.add("Populacja musi być większa od 0 i liczbą całkowitą");
        if(simulationDto.N().isBlank()) errors.add("Nazwa nie może być pusta");
        if(simulationDto.M() <= 0.0 || simulationDto.M() > 1.0) errors.add("Współczynnik M musi się zawierać między 0 i 1");
        if(simulationDto.Ti() < 1) errors.add("Czas do wyzdrowienia (w dniach) musi być większy od 0 i liczbą całkowitą");
        if(simulationDto.Tm() < 1) errors.add("Czas do śmierci (w dniach) musi być większy od 0 i liczbą całkowitą" );
        if(simulationDto.Ts() < 1) errors.add("Czas symulacji (w dniach) musi być większy od 0 i liczbą całkowitą");

        //Detailed validation
        if(simulationDto.Ti() <= simulationDto.Tm()) errors.add("Czas do wyzdrowienia powinien być większy niż czas do śmierci (w przeciwnie skrajnym wypadku symulacja nie ma sensu)");
        if(simulationDto.I() > simulationDto.P()) errors.add("Liczba osób zakażonych nie może być większa  niż cała populacja");
        if(simulationDto.P() > maxValue) errors.add("Liczba populacji nie może być większa niż: " + maxValue);

        if(!errors.isEmpty()) throw new ValidationErrorsCombined(errors);
    }
}
