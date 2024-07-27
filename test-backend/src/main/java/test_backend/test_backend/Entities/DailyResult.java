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
    private long Pi;
    private long Pv;
    private long Pm;
    private long Pr;

    @ManyToOne
    private Simulation simulation;
}
