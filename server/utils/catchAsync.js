// catchAsync არის ფუნქცია, რომელიც იღებს ასინქრონულ ფუნქციას (fn)
// და აბრუნებს ახალ ფუნქციას, რომელიც ავტომატურად დაიჭერს შეცდომებს (error-ებს).
const catchAsync = (fn) => {
    // ვაბრუნებთ ახალ ფუნქციას, რომელსაც აქვს express-ის middleware სტრუქტურა (req, res, next)
    return (req, res, next) => {
        // ვიძახებთ გადაცემულ ასინქრონულ ფუნქციას (fn)
        // თუ იქ რაიმე შეცდომა მოხდება, .catch(next) გამოიძახებს next-ს შეცდომით
        // რაც ავტომატურად გაატარებს შეცდომას error handling middleware-ში
        fn(req, res, next).catch(next)

    }

}
// ვუკეთებთ ექსპორტს სხვა ფაილებში გამოსაყენებლად 
module.exports = catchAsync