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

    private Queue<Long> deathsQueue;
    private Queue<Long> recoverQueue;
    private List<DailyResult> list;

    public void calculateResults(Simulation simulation){
        initializeIterables(simulation.getTi(), simulation.getTm());
        dailyResultRepository.deleteBySimulationID(simulation.getID());
        list.add(createBaseDailyResult(simulation));

        for(int i = 1; i < simulation.getTs(); i++){
            DailyResult previousResult = list.get(i-1);
            long Pr = calculatePr(previousResult);
            long Pm = calculatePm(previousResult, simulation);
            long Pi = calculatePi(previousResult, simulation, Pr, Pm);
            long Pv = calculatePv(simulation, Pi, Pr, Pm);

            long numberOfInfected = Math.abs(previousResult.getPv() - Pv);
            addToQueues(simulation.getM(), numberOfInfected);
            list.add(createDailyResult(Pv,Pi,Pr,Pm,simulation));
        }
        dailyResultRepository.saveAllAndFlush(list);
    }
    private void initializeIterables(int Ti, int Tm){
        list = new ArrayList<>();
        recoverQueue = new ArrayDeque<>(Ti);
        deathsQueue = new ArrayDeque<>(Tm);
        recoverQueue.addAll(Collections.nCopies(Ti-1, 0L));
        deathsQueue.addAll(Collections.nCopies(Tm-1, 0L));
    }

    private DailyResult createBaseDailyResult(Simulation simulation){
        addToQueues(simulation.getM(), simulation.getI());
        return DailyResult.builder()
                .Pv(simulation.getP()-simulation.getI())
                .Pi(simulation.getI())
                .simulation(simulation)
                .build();
    }

    private DailyResult createDailyResult(long Pv, long Pi, long Pr, long Pm, Simulation simulation){
        return DailyResult.builder()
                .Pv(Pv)
                .Pi(Pi)
                .Pr(Pr)
                .Pm(Pm)
                .simulation(simulation)
                .build();
    }

    private void addToQueues(double M, long value){
        deathsQueue.add(value);
        recoverQueue.add(value - Math.round(value * M));
    }

    private long calculatePr(DailyResult previousResult){
        return recoverQueue.isEmpty() ? 0 : recoverQueue.poll() + previousResult.getPr();
    }

    private long calculatePm(DailyResult previousResult, Simulation simulation){
        long Pm = deathsQueue.isEmpty() ? 0 : deathsQueue.poll();
        return Math.round(Pm * simulation.getM() + previousResult.getPm());
    }

    private long calculatePi(DailyResult previousResult, Simulation simulation, long Pr, long Pm){
        long PiMax = previousResult.getPi() * simulation.getR();
        long PiValidResult = PiMax + previousResult.getPi() - Pr - Pm;

        return PiMax < previousResult.getPv() ? PiValidResult : simulation.getP() - Pr - Pm;
    }

    private long calculatePv(Simulation simulation, long Pi, long Pr, long Pm){
        return simulation.getP() - Pi - Pr - Pm;
    }
}
