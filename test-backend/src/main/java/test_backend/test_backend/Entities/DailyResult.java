package test_backend.test_backend.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ID;
    private int Pi;
    private int Pv;
    private int Pm;
    private int Pr;

    @ManyToOne
    private Simulation simulation;
}
