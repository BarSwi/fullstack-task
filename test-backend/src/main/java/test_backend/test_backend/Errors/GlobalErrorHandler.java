package test_backend.test_backend.Errors;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import test_backend.test_backend.Dto.ValidationErrorResponseDto;

@RestControllerAdvice
public class GlobalErrorHandler {

    @ExceptionHandler(ValidationErrorsCombined.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ValidationErrorResponseDto handleValidationError(ValidationErrorsCombined validationErrorsCombined){
        return new ValidationErrorResponseDto("Błąd walidacji", validationErrorsCombined.getErrors());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(RuntimeException.class)
    String handleGenericException(RuntimeException ex) {
        return "An error occurred" + ex.getMessage();
    }

}
