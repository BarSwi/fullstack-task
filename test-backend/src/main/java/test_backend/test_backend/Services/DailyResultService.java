package test_backend.test_backend.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import test_backend.test_backend.Entities.DailyResult;
import test_backend.test_backend.Entities.Simulation;
import test_backend.test_backend.Repositories.DailyResultRepository;

import java.util.*;

@Service
@RequiredArgsConstructor
public class DailyResultService {
    private final DailyResultRepository dailyResultRepository;

    private Queue<Integer> deathsQueue;
    private Queue<Integer> recoverQueue;
    private List<DailyResult> list;

    public void calculateResults(Simulation simulation){
        initializeIterables(simulation.getTi(), simulation.getTm());
        dailyResultRepository.deleteBySimulationID(simulation.getID());
        list.add(createBaseDailyResult(simulation));

        for(int i = 1; i < simulation.getTs(); i++){
            DailyResult previousResult = list.get(i-1);
            int Pr = calculatePr(previousResult);
            int Pm = calculatePm(previousResult, simulation);
            int Pi = calculatePi(previousResult, simulation, Pr, Pm);
            int Pv = calculatePv(simulation, Pi, Pr, Pm);

            int numberOfInfected = Math.abs(previousResult.getPv() - Pv);
            addToQueues(simulation.getM(), numberOfInfected);
            list.add(createDailyResult(Pv,Pi,Pr,Pm,simulation));
        }
        dailyResultRepository.saveAllAndFlush(list);
    }
    private void initializeIterables(int Ti, int Tm){
        list = new ArrayList<>();
        recoverQueue = new ArrayDeque<>(Ti);
        deathsQueue = new ArrayDeque<>(Tm);
        recoverQueue.addAll(Collections.nCopies(Ti-1, 0));
        deathsQueue.addAll(Collections.nCopies(Tm-1, 0));
    }

    private DailyResult createBaseDailyResult(Simulation simulation){
        addToQueues(simulation.getM(), simulation.getI());
        return DailyResult.builder()
                .Pv(simulation.getP()-simulation.getI())
                .Pi(simulation.getI())
                .simulation(simulation)
                .build();
    }

    private DailyResult createDailyResult(int Pv, int Pi, int Pr, int Pm, Simulation simulation){
        return DailyResult.builder()
                .Pv(Pv)
                .Pi(Pi)
                .Pr(Pr)
                .Pm(Pm)
                .simulation(simulation)
                .build();
    }

    private void addToQueues(float M, int value){
        deathsQueue.add(value);
        recoverQueue.add(value - (int) (value * M));
    }

    private int calculatePr(DailyResult previousResult){
        return recoverQueue.isEmpty() ? 0 : recoverQueue.poll() + previousResult.getPr();
    }

    private int calculatePm(DailyResult previousResult, Simulation simulation){
        int Pm = deathsQueue.isEmpty() ? 0 : deathsQueue.poll();
        return (int) Math.floor(Pm * simulation.getM() + previousResult.getPm());
    }

    private int calculatePi(DailyResult previousResult, Simulation simulation, int Pr, int Pm){
        int PiMax = previousResult.getPi() * simulation.getR();
        int PiValidResult = PiMax + previousResult.getPi() - Pr - Pm;

        return PiMax < previousResult.getPv() ? PiValidResult : simulation.getP() - Pr - Pm;
    }

    private int calculatePv(Simulation simulation, int Pi, int Pr, int Pm){
        return simulation.getP() - Pi - Pr - Pm;
    }
}
