// ვქმნით ერორების მმართელს 
class AppError {
    // კონსტრუქტორი იღებს შეტყობინებას და სტატუს კოდს
    constructor(message, statusCode) {
        // შეცდომის ტექსტი
        this.message = message;
        // HTTP სტატუს კოდი (მაგ: 400, 404, 500)
        this.statusCode = statusCode
        // სტატუსის კოდი განსაზღვრა თუ იწყება 4 ით არის სერვერის ერორი ხოლო სხვა შემთხვევაში მომხმარებლის ერორი
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        // აღნიშნავს, რომ ეს შეცდომა წინასწარ განზრახული და კონტროლირებადი შეცდომა
        this.isOperational = true
    }
}
module.exports = AppError