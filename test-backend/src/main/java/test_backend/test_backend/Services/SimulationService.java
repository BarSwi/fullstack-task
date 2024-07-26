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
    private final DailyResultService dailyResultService;



    public SimulationDto addSimulation(SimulationDto simulationDto){
        //TODO: Implement validation logic
        // Ts > Tm
        // M między 0 i 1
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
}
