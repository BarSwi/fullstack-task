package test_backend.test_backend;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.filter.RequestContextFilter;
import org.springframework.web.servlet.view.RedirectView;
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

    @DeleteMapping("simulation/deleteSimulation")
    void deleteSimulation(@RequestParam long id){
        simulationService.deleteSimulation(id);
    }

    @PutMapping("simulation/editSimulation")
    SimulationDto editSimulation(@RequestParam long id, @RequestBody SimulationDto requestDto){
        return simulationService.editSimulation(id, requestDto);
    }

    @GetMapping("simulation/getSimulation")
    Simulation getSimulation(@RequestParam long id){
        return simulationService.getSimulation(id).orElse(null);
    }

    // Prowizoryczny endpoint w celu ujednolicenia ścieżek dokumentacji.
    @Hidden
    @GetMapping("/api-docs")
    public RedirectView redirectToSwaggerUi() {
        return new RedirectView("/swagger-ui.html");
    }
}
