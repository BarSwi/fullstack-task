package test_backend.test_backend.Repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import test_backend.test_backend.Entities.Simulation;

public interface SimulationRepository extends JpaRepository<Simulation, Long> {
    @Transactional
    void deleteByID(long id);
}
