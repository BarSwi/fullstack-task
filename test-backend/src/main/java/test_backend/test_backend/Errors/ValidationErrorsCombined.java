package test_backend.test_backend.Errors;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class ValidationErrorsCombined extends RuntimeException {
    private final List<String> errors;

}
