package test_backend.test_backend.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Simulation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;


    private String N;
    private long P;
    private long I;

    private int R;
    private double M;
    private int Ti;
    private int Tm;
    private int Ts;

    @OneToMany(mappedBy = "simulation", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<DailyResult> results;
}
