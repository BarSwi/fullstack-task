package test_backend.test_backend.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import test_backend.test_backend.Dto.SimulationDto;
import test_backend.test_backend.Entities.Simulation;
import test_backend.test_backend.Repositories.SimulationRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class SimulationService {
    private final SimulationRepository simulationRepository;



    public SimulationDto addSimulation(SimulationDto simulationDto){
        //TODO: Implement validation logic

        Simulation simulation = simulationRepository.save(dtoToEntity(simulationDto));
        return entityToDto(simulation);
    }

    public List<SimulationDto> getAll(){
        return simulationRepository.findAll()
                .stream()
                .map(this::entityToDto)
                .toList();
    }

    private Simulation dtoToEntity(SimulationDto simulationDto){
        return  Simulation.builder()
                .ID(simulationDto.ID().orElse(null))
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
                Optional.ofNullable(simulation.getID()),
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
}
