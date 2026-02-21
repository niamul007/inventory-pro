/**
 * [The Safety Wrapper]: 
 * This is a Higher-Order Function (a function that returns another function).
 * It eliminates the need for repeated try/catch blocks in every controller.
 */
const catchAsync = (fn) => {
  // 1. Returns a standard Express middleware function (req, res, next)
  return (req, res, next) => {
    
    // 2. Execute the 'fn' (your async controller). 
    // Since 'fn' is async, it automatically returns a Promise.
    
    // 3. If the Promise resolves (Success), everything is fine.
    // 4. If the Promise rejects (Error), the .catch() block grabs the error.
    
    // 5. By passing 'next' into the .catch(), it automatically calls next(err), 
    // which triggers the Global Error Handler hospital.
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;