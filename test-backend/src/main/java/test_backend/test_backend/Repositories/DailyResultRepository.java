package test_backend.test_backend.Repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import test_backend.test_backend.Entities.DailyResult;


@Repository
public interface DailyResultRepository extends JpaRepository<DailyResult, Long> {
    @Transactional
    void deleteBySimulationID(Long simulationId);
}
