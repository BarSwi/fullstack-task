package test_backend.test_backend.Dto;

import java.util.List;

public record ValidationErrorResponseDto(String message, List<String> errors) { }
