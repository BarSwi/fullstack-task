package test_backend.test_backend.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class DailyResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
}
