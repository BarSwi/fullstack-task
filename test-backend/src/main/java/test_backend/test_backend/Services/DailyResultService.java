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
            int Pr = recoverQueue.isEmpty() ? 0 : recoverQueue.poll() + previousResult.getPr();
            int Pm = deathsQueue.isEmpty() ? 0 : deathsQueue.poll();
            Pm = (int) Math.floor(Pm * simulation.getM() + previousResult.getPm());
            int PiMax = previousResult.getPi() * (1 + simulation.getR());
            int Pi = PiMax >= previousResult.getPv() ? simulation.getP() - Pr - Pm : PiMax - Pr - Pm;
            int Pv = simulation.getP() - Pi - Pr - Pm;
            int PiDifference = Math.max(Pi - previousResult.getPi(), 0);

            addToQueues(simulation.getM(), PiDifference);
            list.add(createDailyResult(Pv,Pi,Pr,Pm,simulation));
        }

        dailyResultRepository.saveAllAndFlush(list);
    }
    private void initializeIterables(int Ti, int Tm){
        list = new ArrayList<>();
        recoverQueue = new ArrayDeque<>(Ti);
        deathsQueue = new ArrayDeque<>(Tm);
        recoverQueue.addAll(Collections.nCopies(Ti, 0));
        deathsQueue.addAll(Collections.nCopies(Tm, 0));
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
}
