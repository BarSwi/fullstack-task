package test_backend.test_backend.Entities;

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
    private int P;
    private int I;

    private int R;
    private float M;
    private int Ti;
    private int Tm;
    private int Ts;

    @OneToMany
    private List<DailyResult> results;
}