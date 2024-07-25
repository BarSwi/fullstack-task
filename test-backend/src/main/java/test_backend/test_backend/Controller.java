package test_backend.test_backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.filter.RequestContextFilter;
import test_backend.test_backend.Dto.SimulationDto;
import test_backend.test_backend.Entities.Simulation;
import test_backend.test_backend.Services.SimulationService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class Controller {

    private final SimulationService simulationService;

    @PostMapping("simulation/createSimulation")
    SimulationDto addSimulation(@RequestBody SimulationDto requestDto){
        return simulationService.addSimulation(requestDto);
    }

    @GetMapping("simulation/getAll")
    List<SimulationDto> getSimulations(){
        return simulationService.getAll();
    }
}
