// ========== UNIVERSITY LEVEL MATH QUESTIONS (Based on NCUK Content - 20 Questions Each) ==========
const TOPICS = {
    algebra: {
        name: "Algebra & Simultaneous Equations",
        icon: "fas fa-calculator",
        order: 0,
        questions: [
            { text: "Expand and simplify: (3x + 2)(2x - 5)", options: ["6x² - 11x - 10", "6x² + 11x - 10", "6x² - 11x + 10", "6x² + 11x + 10"], correct: "6x² - 11x - 10", hint: "Use FOIL: 3x·2x + 3x·(-5) + 2·2x + 2·(-5)" },
            { text: "Factorise completely: 2x² + 7x + 3", options: ["(2x+1)(x+3)", "(2x+3)(x+1)", "(x+1)(2x+3)", "(x+3)(2x+1)"], correct: "(2x+1)(x+3)", hint: "Find factors of 6 that sum to 7: 6 and 1" },
            { text: "Solve simultaneously: y = 3x - 4 and 2x + y = 11", options: ["x=3, y=5", "x=5, y=11", "x=2, y=2", "x=4, y=8"], correct: "x=3, y=5", hint: "Substitute: 2x + (3x-4) = 11 → 5x = 15" },
            { text: "Solve: 5(x - 2) = 3(x + 4)", options: ["x=11", "x=7", "x=9", "x=13"], correct: "x=11", hint: "Expand: 5x-10=3x+12 → 2x=22" },
            { text: "Factorise: 9x² - 16", options: ["(3x-4)(3x+4)", "(9x-4)(x+4)", "(3x-4)(3x-4)", "(3x+4)(3x+4)"], correct: "(3x-4)(3x+4)", hint: "Difference of squares: a²-b² = (a-b)(a+b)" },
            { text: "Solve the system: 3x + 2y = 12, 2x - y = 1", options: ["x=2, y=3", "x=3, y=1.5", "x=4, y=0", "x=1, y=4.5"], correct: "x=2, y=3", hint: "From second: y=2x-1, substitute into first" },
            { text: "Simplify: (a³b²)⁵", options: ["a¹⁵b¹⁰", "a⁸b⁷", "a¹⁵b⁷", "a⁸b¹⁰"], correct: "a¹⁵b¹⁰", hint: "Multiply exponents: 3×5=15, 2×5=10" },
            { text: "Solve: 5^(x) = 125", options: ["x=3", "x=5", "x=2", "x=4"], correct: "x=3", hint: "125 = 5³" },
            { text: "Expand: (2x - 1)³", options: ["8x³ - 12x² + 6x - 1", "8x³ + 12x² + 6x + 1", "8x³ - 6x² + 12x - 1", "8x³ - 12x² - 6x - 1"], correct: "8x³ - 12x² + 6x - 1", hint: "Use binomial: (a-b)³ = a³ - 3a²b + 3ab² - b³" },
            { text: "Factorise: 27x³ - 8", options: ["(3x-2)(9x²+6x+4)", "(3x+2)(9x²-6x+4)", "(3x-2)(9x²-6x+4)", "(3x+2)(9x²+6x+4)"], correct: "(3x-2)(9x²+6x+4)", hint: "Difference of cubes: a³-b³ = (a-b)(a²+ab+b²)" },
            { text: "Solve: 4x² - 25 = 0", options: ["x=±2.5", "x=±5/2", "x=±5", "x=±2"], correct: "x=±2.5", hint: "4x²=25 → x²=25/4 → x=±5/2" },
            { text: "Simplify: (x²y⁻³)⁻²", options: ["x⁻⁴y⁶", "x⁴y⁻⁶", "x⁻⁴y⁻⁶", "x⁴y⁶"], correct: "x⁻⁴y⁶", hint: "Multiply exponents: 2×(-2)=-4, (-3)×(-2)=6" },
            { text: "Solve: 2x + 5 = 3x - 7", options: ["x=12", "x=2", "x=5", "x=8"], correct: "x=12", hint: "5+7=3x-2x → 12=x" },
            { text: "Factorise: x² - 10x + 25", options: ["(x-5)²", "(x+5)²", "(x-25)(x-1)", "(x-5)(x+5)"], correct: "(x-5)²", hint: "Perfect square: (x-5)² = x²-10x+25" },
            { text: "Solve simultaneously: x + 2y = 7, 2x - y = 4", options: ["x=3, y=2", "x=2, y=2.5", "x=4, y=1.5", "x=1, y=3"], correct: "x=3, y=2", hint: "Multiply second by 2: 4x-2y=8, add to first" },
            { text: "Expand: (x + 4)(x² - 4x + 16)", options: ["x³ + 64", "x³ - 64", "x³ + 16x + 64", "x³ + 64x"], correct: "x³ + 64", hint: "Sum of cubes: (a+b)(a²-ab+b²)=a³+b³" },
            { text: "Solve: 3^(2x) = 81", options: ["x=2", "x=4", "x=3", "x=1"], correct: "x=2", hint: "81=3⁴, so 2x=4" },
            { text: "Simplify: (4x³y)² × (2xy²)³", options: ["128x⁹y⁸", "64x⁹y⁸", "128x⁷y⁷", "64x⁷y⁷"], correct: "128x⁹y⁸", hint: "First:16x⁶y², second:8x³y⁶, multiply:128x⁹y⁸" },
            { text: "Factorise: x³ + 64", options: ["(x+4)(x²-4x+16)", "(x-4)(x²+4x+16)", "(x+4)(x²+4x+16)", "(x-4)(x²-4x+16)"], correct: "(x+4)(x²-4x+16)", hint: "Sum of cubes: a³+b³ = (a+b)(a²-ab+b²)" },
            { text: "Solve the inequality: 3x - 7 > 2x + 5", options: ["x > 12", "x < 12", "x > 2", "x < 2"], correct: "x > 12", hint: "3x-2x > 5+7 → x > 12" }
        ]
    },
    quadratics: {
        name: "Quadratics & Inequalities",
        icon: "fas fa-chart-line",
        order: 1,
        questions: [
            { text: "Solve: x² + 3x - 10 = 0", options: ["x=2, x=-5", "x=-2, x=5", "x=2, x=5", "x=-2, x=-5"], correct: "x=2, x=-5", hint: "Factorise: (x+5)(x-2)=0" },
            { text: "Solve using quadratic formula: 3x² - 8x + 4 = 0", options: ["x=2, x=2/3", "x=4, x=1/3", "x=2, x=3", "x=1, x=4/3"], correct: "x=2, x=2/3", hint: "x = [8 ± √(64-48)]/6 = [8 ± 4]/6" },
            { text: "Solve inequality: x² - 4x - 5 < 0", options: ["-1 < x < 5", "x < -1 or x > 5", "x > 5", "x < -1"], correct: "-1 < x < 5", hint: "Factor: (x-5)(x+1)<0, between roots" },
            { text: "Find the vertex of y = 2x² - 8x + 3", options: ["(2, -5)", "(-2, 27)", "(4, 3)", "(1, -3)"], correct: "(2, -5)", hint: "x = -b/(2a)=8/4=2, then y=8-16+3=-5" },
            { text: "Solve: 4x² + 12x + 9 = 0", options: ["x=-1.5", "x=1.5", "x=±1.5", "No solution"], correct: "x=-1.5", hint: "Perfect square: (2x+3)²=0" },
            { text: "Find discriminant of 2x² + 3x - 2 = 0", options: ["25", "9", "17", "1"], correct: "25", hint: "b²-4ac = 9 - 4(2)(-2) = 9+16=25" },
            { text: "Solve: 2x² = 50", options: ["x=±5", "x=±25", "x=±√25", "x=±10"], correct: "x=±5", hint: "x²=25, so x=±5" },
            { text: "Complete square: x² - 8x + 10", options: ["(x-4)² - 6", "(x-4)² + 6", "(x+4)² - 6", "(x+4)² + 6"], correct: "(x-4)² - 6", hint: "Take half of -8 = -4, then (x-4)² -16+10" },
            { text: "Solve: 3x² - 12x = 0", options: ["x=0, x=4", "x=0, x=-4", "x=2, x=6", "x=0, x=2"], correct: "x=0, x=4", hint: "Factor: 3x(x-4)=0" },
            { text: "Inequality: x² - 9 < 0", options: ["-3 < x < 3", "x < -3 or x > 3", "x > 3", "x < -3"], correct: "-3 < x < 3", hint: "Between the roots for positive quadratic" },
            { text: "Find the minimum value of x² + 6x + 11", options: ["2", "11", "3", "5"], correct: "2", hint: "Complete square: (x+3)²+2, minimum when (x+3)²=0" },
            { text: "Solve: (x-2)(x+5) = 0", options: ["x=2, x=-5", "x=-2, x=5", "x=2, x=5", "x=-2, x=-5"], correct: "x=2, x=-5", hint: "Zero product property" },
            { text: "Determine the nature of roots for x² + 2x + 5 = 0", options: ["Complex", "Real and distinct", "Real and equal", "Rational"], correct: "Complex", hint: "Discriminant = 4-20 = -16 < 0" },
            { text: "Solve: 2x² + 7x - 15 = 0", options: ["x=1.5, x=-5", "x=-1.5, x=5", "x=3, x=-2.5", "x=-3, x=2.5"], correct: "x=1.5, x=-5", hint: "Factor: (2x-3)(x+5)=0" },
            { text: "Find the sum of roots of 3x² - 12x + 9 = 0", options: ["4", "12", "-12", "-4"], correct: "4", hint: "Sum = -b/a = 12/3 = 4" },
            { text: "Product of roots of 2x² + 8x - 5 = 0", options: ["-2.5", "2.5", "-4", "4"], correct: "-2.5", hint: "Product = c/a = -5/2 = -2.5" },
            { text: "Solve: x² + 2x - 8 = 0", options: ["x=2, x=-4", "x=-2, x=4", "x=4, x=-2", "x=-4, x=2"], correct: "x=2, x=-4", hint: "Factor: (x+4)(x-2)=0" },
            { text: "Inequality: 2x² - 5x - 3 > 0", options: ["x < -0.5 or x > 3", "-0.5 < x < 3", "x > 3", "x < -0.5"], correct: "x < -0.5 or x > 3", hint: "Factor: (2x+1)(x-3)>0, outside roots" },
            { text: "Find the axis of symmetry for y = 2x² - 4x + 1", options: ["x=1", "x=-1", "x=2", "x=4"], correct: "x=1", hint: "x = -b/(2a) = 4/(4)=1" },
            { text: "Solve: x² - 2x - 15 = 0", options: ["x=5, x=-3", "x=-5, x=3", "x=5, x=3", "x=-5, x=-3"], correct: "x=5, x=-3", hint: "Factor: (x-5)(x+3)=0" }
        ]
    },
    functions: {
        name: "Functions & Transformations",
        icon: "fas fa-chart-simple",
        order: 2,
        questions: [
            { text: "If f(x)=x², describe transformation to y=(x+2)² - 3", options: ["Left 2, down 3", "Right 2, down 3", "Left 2, up 3", "Right 2, up 3"], correct: "Left 2, down 3", hint: "h=-2 (left), k=-3 (down)" },
            { text: "Find vertex of y=(x+1)² - 4", options: ["(-1,-4)", "(1,-4)", "(-1,4)", "(1,4)"], correct: "(-1,-4)", hint: "Vertex at (h,k) where h=-1, k=-4" },
            { text: "If h(x)=3x+2, find h⁻¹(x)", options: ["(x-2)/3", "(x+2)/3", "3x-2", "x/3-2"], correct: "(x-2)/3", hint: "Swap: x=3y+2 → 3y=x-2 → y=(x-2)/3" },
            { text: "f(x)=x², what is f(x-3)?", options: ["(x-3)²", "x²-3", "x²-9", "x²-6x+9"], correct: "(x-3)²", hint: "Replace x with x-3" },
            { text: "If f(x)=4x-3, find f(5)", options: ["17", "20", "12", "23"], correct: "17", hint: "4(5)-3=20-3=17" },
            { text: "Domain of f(x)=√(x+5)", options: ["x≥-5", "x>-5", "x≤-5", "All real"], correct: "x≥-5", hint: "Inside square root must be ≥ 0" },
            { text: "If f(x)=x² and g(x)=2x-1, find f(g(x))", options: ["(2x-1)²", "2x²-1", "4x²-4x+1", "4x²-1"], correct: "(2x-1)²", hint: "f(g(x)) = (2x-1)² = 4x²-4x+1" },
            { text: "Find inverse of f(x)=√x, x≥0", options: ["x²", "√x", "x", "1/√x"], correct: "x²", hint: "Swap: x=√y → y=x²" },
            { text: "Range of f(x)=x² - 4", options: ["y≥-4", "y>-4", "y≤-4", "All real"], correct: "y≥-4", hint: "Minimum value is -4 when x=0" },
            { text: "If f(x)=x/2, find f⁻¹(6)", options: ["12", "3", "6", "18"], correct: "12", hint: "f⁻¹(x)=2x, so 2×6=12" },
            { text: "Describe transformation: y = -f(x)", options: ["Reflection in x-axis", "Reflection in y-axis", "Shift down", "Shift left"], correct: "Reflection in x-axis", hint: "Negative outside flips vertically" },
            { text: "Find f(2) if f(x)=2x² - 3x + 1", options: ["3", "7", "5", "9"], correct: "3", hint: "2(4)-6+1=8-6+1=3" },
            { text: "If f(x)=x+2 and g(x)=x², find g(f(x))", options: ["(x+2)²", "x²+2", "x²+4x+4", "x²+4"], correct: "(x+2)²", hint: "g(f(x)) = (x+2)²" },
            { text: "Domain of f(x)=1/(x-3)", options: ["x≠3", "x>3", "x<3", "All real"], correct: "x≠3", hint: "Denominator cannot be zero" },
            { text: "Find inverse of f(x)=x² - 4, x≥0", options: ["√(x+4)", "√(x-4)", "x²+4", "x²-4"], correct: "√(x+4)", hint: "Swap: x=y²-4 → y²=x+4 → y=√(x+4)" },
            { text: "If f(x)=2x+1, find f(3x)", options: ["6x+1", "2x+1", "6x+3", "2x+3"], correct: "6x+1", hint: "2(3x)+1=6x+1" },
            { text: "What transformation gives y=f(x+2)?", options: ["Left 2", "Right 2", "Up 2", "Down 2"], correct: "Left 2", hint: "x replaced by x+2 shifts left" },
            { text: "Find g⁻¹(5) if g(x)=x-3", options: ["8", "2", "5", "15"], correct: "8", hint: "g⁻¹(x)=x+3, so 5+3=8" },
            { text: "Range of f(x)=|x| + 1", options: ["y≥1", "y>1", "y≤1", "All real"], correct: "y≥1", hint: "Absolute value ≥0, plus 1 gives ≥1" },
            { text: "If f(x)=x³, find f(2x)", options: ["8x³", "2x³", "x³", "6x³"], correct: "8x³", hint: "(2x)³ = 8x³" }
        ]
    },
    calculus: {
        name: "Differentiation & Newton-Raphson",
        icon: "fas fa-infinity",
        order: 3,
        questions: [
            { text: "Find f'(x) for f(x)=2x³ - 5x² + 4x - 7", options: ["6x² - 10x + 4", "6x² - 5x + 4", "2x² - 10x + 4", "6x² - 10x - 4"], correct: "6x² - 10x + 4", hint: "Power rule: 3×2x²=6x², 2×(-5)x=-10x, derivative of 4x=4" },
            { text: "Newton-Raphson: f(x)=x²-2, f'(x)=2x, x₀=1, find x₁", options: ["1.5", "1.25", "1.75", "2"], correct: "1.5", hint: "x₁ = 1 - (1²-2)/(2×1) = 1 - (-1)/2 = 1.5" },
            { text: "Derivative of 5x⁴", options: ["20x³", "5x³", "20x⁴", "4x³"], correct: "20x³", hint: "5×4×x³=20x³" },
            { text: "Find stationary point of f(x)=x²-6x+5", options: ["(3,-4)", "(3,5)", "(6,5)", "(-3,32)"], correct: "(3,-4)", hint: "f'(x)=2x-6=0 → x=3, f(3)=9-18+5=-4" },
            { text: "Derivative of ln(2x)", options: ["1/x", "2/x", "1/(2x)", "2"], correct: "1/x", hint: "d/dx[ln(ax)] = 1/x" },
            { text: "Derivative of e^(3x)", options: ["3e^(3x)", "e^(3x)", "3e^x", "e^(3x)/3"], correct: "3e^(3x)", hint: "Chain rule: d/dx[e^(3x)] = 3e^(3x)" },
            { text: "Find f'(x) for f(x)=√x", options: ["1/(2√x)", "2√x", "1/√x", "√x/2"], correct: "1/(2√x)", hint: "Write as x^(1/2), derivative = (1/2)x^(-1/2)" },
            { text: "Second derivative of 4x³", options: ["24x", "12x", "24x²", "12x²"], correct: "24x", hint: "First:12x², second:24x" },
            { text: "Integral of 4x dx", options: ["2x² + C", "4x² + C", "x² + C", "8x² + C"], correct: "2x² + C", hint: "∫xⁿ dx = xⁿ⁺¹/(n+1)" },
            { text: "Newton iteration for f(x)=x³-2, x₀=1.3", options: ["~1.26", "~1.35", "~1.4", "~1.2"], correct: "~1.26", hint: "x₁ = 1.3 - (1.3³-2)/(3×1.3²)" },
            { text: "Derivative of sin(x)", options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"], correct: "cos(x)", hint: "Standard derivative" },
            { text: "Derivative of cos(x)", options: ["-sin(x)", "sin(x)", "-cos(x)", "tan(x)"], correct: "-sin(x)", hint: "Standard derivative" },
            { text: "Find gradient of y=x³ at x=2", options: ["12", "8", "6", "4"], correct: "12", hint: "dy/dx=3x², at x=2: 3×4=12" },
            { text: "Integral of 1/x dx", options: ["ln|x| + C", "1/x² + C", "x + C", "e^x + C"], correct: "ln|x| + C", hint: "Standard integral" },
            { text: "Find f'(x) for f(x)=x²ln(x)", options: ["2x ln(x) + x", "2x ln(x)", "x ln(x) + x", "2x + ln(x)"], correct: "2x ln(x) + x", hint: "Product rule: 2x·ln(x) + x²·(1/x)" },
            { text: "Stationary point of y=x³-12x", options: ["x=±2", "x=±4", "x=0", "x=±1"], correct: "x=±2", hint: "dy/dx=3x²-12=0 → x²=4 → x=±2" },
            { text: "Second derivative of 2x⁵", options: ["40x³", "10x⁴", "40x⁴", "20x³"], correct: "40x³", hint: "First:10x⁴, second:40x³" },
            { text: "Integral of e^x dx", options: ["e^x + C", "e^x", "ln|x| + C", "xe^x + C"], correct: "e^x + C", hint: "Standard integral" },
            { text: "Newton-Raphson: f(x)=x²-5, x₀=2, find x₁", options: ["2.25", "2.5", "2.75", "2.1"], correct: "2.25", hint: "x₁ = 2 - (4-5)/(4) = 2 - (-1/4)=2.25" },
            { text: "Derivative of tan(x)", options: ["sec²(x)", "csc²(x)", "cot(x)", "sec(x)tan(x)"], correct: "sec²(x)", hint: "Standard derivative" }
        ]
    },
    trigonometry: {
        name: "Trigonometry & Radians",
        icon: "fas fa-sine",
        order: 4,
        questions: [
            { text: "Solve sin x = √3/2 for 0° ≤ x ≤ 360°", options: ["60°,120°", "30°,150°", "60°,300°", "30°,330°"], correct: "60°,120°", hint: "sin 60° = √3/2, sin 120° = sin 60°" },
            { text: "Arc length: r=5cm, θ=2.5 rad", options: ["12.5cm", "10cm", "15cm", "7.5cm"], correct: "12.5cm", hint: "s = rθ = 5×2.5" },
            { text: "Sector area: r=6cm, θ=1.5 rad", options: ["27cm²", "18cm²", "36cm²", "13.5cm²"], correct: "27cm²", hint: "A = ½r²θ = 0.5×36×1.5" },
            { text: "cos 30° = ?", options: ["√3/2", "1/2", "√2/2", "1"], correct: "√3/2", hint: "Standard value: cos 30° = √3/2" },
            { text: "tan 60° = ?", options: ["√3", "1", "√3/3", "1/√3"], correct: "√3", hint: "sin 60°/cos 60° = (√3/2)/(1/2)=√3" },
            { text: "Convert 150° to radians", options: ["5π/6", "π/3", "2π/3", "3π/4"], correct: "5π/6", hint: "150 × π/180 = 5π/6" },
            { text: "Convert 2π/3 to degrees", options: ["120°", "60°", "90°", "150°"], correct: "120°", hint: "Multiply by 180/π: (2π/3)×(180/π)=120°" },
            { text: "Amplitude of h(t)=15+8sin t", options: ["8", "15", "23", "7"], correct: "8", hint: "Coefficient of sine is amplitude" },
            { text: "Maximum of h(t)=15+8sin t", options: ["23", "15", "8", "7"], correct: "23", hint: "15+8×1=23" },
            { text: "sin 0° = ?", options: ["0", "1", "0.5", "√2/2"], correct: "0", hint: "Standard value" },
            { text: "cos 180° = ?", options: ["-1", "0", "1", "0.5"], correct: "-1", hint: "Standard value" },
            { text: "Solve cos x = 0 for 0° ≤ x ≤ 360°", options: ["90°,270°", "0°,180°", "0°,360°", "90°,180°"], correct: "90°,270°", hint: "cos 90°=0, cos 270°=0" },
            { text: "Period of y=sin(2x)", options: ["π", "2π", "π/2", "4π"], correct: "π", hint: "Period = 2π/2 = π" },
            { text: "Solve tan x = 1 for 0° ≤ x ≤ 180°", options: ["45°", "135°", "45°,225°", "45°,135°"], correct: "45°", hint: "tan 45°=1, tan also positive in QIII but outside range" },
            { text: "Arc length: r=10cm, angle=30°", options: ["5.24cm", "10cm", "3.14cm", "6.28cm"], correct: "5.24cm", hint: "Convert 30°=π/6 rad, s=10×π/6≈5.24" },
            { text: "sin 30° = ?", options: ["1/2", "√3/2", "√2/2", "1"], correct: "1/2", hint: "Standard value" },
            { text: "cos 45° = ?", options: ["√2/2", "1/2", "√3/2", "1"], correct: "√2/2", hint: "Standard value" },
            { text: "Solve 2 sin x = 1 for 0° ≤ x ≤ 360°", options: ["30°,150°", "60°,120°", "30°,210°", "60°,300°"], correct: "30°,150°", hint: "sin x = 1/2 → x=30°,150°" },
            { text: "Convert 45° to radians", options: ["π/4", "π/3", "π/6", "π/2"], correct: "π/4", hint: "45 × π/180 = π/4" },
            { text: "Minimum of h(t)=20+5sin t", options: ["15", "20", "25", "5"], correct: "15", hint: "20+5×(-1)=15" }
        ]
    },
    vectors: {
        name: "Vectors & Geometry",
        icon: "fas fa-arrows-alt",
        order: 5,
        questions: [
            { text: "Gradient of line through P(3,5) and Q(7,13)", options: ["2", "8/4", "4", "3"], correct: "2", hint: "(13-5)/(7-3)=8/4=2" },
            { text: "Equation of line through (1,4) gradient 3", options: ["y=3x+1", "y=3x+4", "y=3x-1", "y=3x+7"], correct: "y=3x+1", hint: "y-4=3(x-1) → y=3x+1" },
            { text: "Midpoint of A(4,6) and B(10,14)", options: ["(7,10)", "(14,20)", "(6,8)", "(8,12)"], correct: "(7,10)", hint: "((4+10)/2, (6+14)/2)=(7,10)" },
            { text: "Distance between C(1,2) and D(5,5)", options: ["5", "4", "3", "√41"], correct: "5", hint: "√[(5-1)²+(5-2)²]=√(16+9)=5" },
            { text: "Cosine rule: find c if a=8,b=12,C=60°", options: ["√112", "√208", "√148", "√80"], correct: "√112", hint: "c²=64+144-2×8×12×0.5=208-96=112" },
            { text: "Area of triangle with a=6,b=8,C=30°", options: ["12", "24", "48", "6"], correct: "12", hint: "½×6×8×sin30°=24×0.5=12" },
            { text: "Vector from A(2,4) to B(7,10)", options: ["(5,6)", "(9,14)", "(5,14)", "(9,6)"], correct: "(5,6)", hint: "B-A=(5,6)" },
            { text: "Magnitude of vector (3,4)", options: ["5", "7", "25", "12"], correct: "5", hint: "√(3²+4²)=√25=5" },
            { text: "Dot product of (2,5) and (3,4)", options: ["26", "23", "20", "29"], correct: "26", hint: "2×3+5×4=6+20=26" },
            { text: "Equation of horizontal line through (3,7)", options: ["y=7", "x=3", "y=3", "x=7"], correct: "y=7", hint: "Horizontal lines have constant y" },
            { text: "Gradient of line through (-2,4) and (3,-1)", options: ["-1", "1", "-5", "5"], correct: "-1", hint: "(-1-4)/(3-(-2)) = -5/5 = -1" },
            { text: "Find vector magnitude of (-6,8)", options: ["10", "14", "100", "2"], correct: "10", hint: "√(36+64)=√100=10" },
            { text: "Unit vector in direction of (3,4)", options: ["(3/5,4/5)", "(3,4)", "(0.6,0.8)", "Both a and c"], correct: "Both a and c", hint: "Divide by magnitude 5" },
            { text: "Equation of vertical line through (5,9)", options: ["x=5", "y=9", "x=9", "y=5"], correct: "x=5", hint: "Vertical lines have constant x" },
            { text: "Dot product of (1,0) and (0,1)", options: ["0", "1", "-1", "2"], correct: "0", hint: "1×0+0×1=0 (perpendicular)" },
            { text: "Find angle between vectors (1,0) and (0,1)", options: ["90°", "0°", "45°", "180°"], correct: "90°", hint: "Dot product=0 means perpendicular" },
            { text: "Midpoint of (-3,8) and (5,-2)", options: ["(1,3)", "(2,6)", "(4,2)", "(1,5)"], correct: "(1,3)", hint: "((-3+5)/2, (8+(-2))/2)=(1,3)" },
            { text: "Distance between (0,0) and (3,4)", options: ["5", "7", "25", "12"], correct: "5", hint: "√(9+16)=5" },
            { text: "Find equation of line through (0,0) with gradient 4", options: ["y=4x", "y=4x+1", "y=4", "x=4y"], correct: "y=4x", hint: "y=mx through origin" },
            { text: "Parallel vector to (2,-3)", options: ["(4,-6)", "(-2,3)", "(-4,6)", "All of these"], correct: "All of these", hint: "Scalar multiples are parallel" }
        ]
    },
    statistics: {
        name: "Statistics & Probability",
        icon: "fas fa-chart-bar",
        order: 6,
        questions: [
            { text: "For data set: 2, 3, 4, 4, 5, 6, 7, 7, 8, 9, 11, 14. Find the mean", options: ["6.67", "6.5", "7", "6.25"], correct: "6.67", hint: "Sum=80, n=12, 80/12=6.67" },
            { text: "For the same data, find the median", options: ["6.5", "6", "7", "6.67"], correct: "6.5", hint: "Middle values: 6 and 7, average = 6.5" },
            { text: "Find Q1 for: 2,3,4,4,5,6,7,7,8,9,11,14", options: ["4", "3.5", "4.5", "5"], correct: "4", hint: "Lower half: 2,3,4,4,5,6 → Q1=4" },
            { text: "Find Q3 for the same data", options: ["8.5", "8", "9", "7.5"], correct: "8.5", hint: "Upper half: 7,7,8,9,11,14 → Q3=(8+9)/2=8.5" },
            { text: "Calculate IQR for the data", options: ["4.5", "5", "4", "6"], correct: "4.5", hint: "IQR = Q3 - Q1 = 8.5 - 4 = 4.5" },
            { text: "Using 1.5×IQR rule, is 14 an outlier?", options: ["No, bound is 15.25", "Yes", "No, bound is 16", "Yes, bound is 14.5"], correct: "No, bound is 15.25", hint: "Upper bound = 8.5 + 1.5×4.5 = 15.25" },
            { text: "For data: 3,5,5,7, find the mean", options: ["5", "5.5", "4.5", "6"], correct: "5", hint: "Sum=20, n=4, 20/4=5" },
            { text: "Calculate variance for 3,5,5,7", options: ["2", "2.5", "1.5", "3"], correct: "2", hint: "Σ(x-5)²=4+0+0+4=8, 8/4=2" },
            { text: "Standard deviation of 3,5,5,7 to 3 s.f.", options: ["1.41", "1.414", "1.5", "1.4"], correct: "1.41", hint: "√2 = 1.414 → 1.41" },
            { text: "In histogram with unequal widths, what represents frequency?", options: ["Area of bar", "Height of bar", "Width of bar", "Class midpoint"], correct: "Area of bar", hint: "Frequency density × class width = frequency" },
            { text: "Frequency density formula", options: ["Frequency ÷ Class Width", "Class Width ÷ Frequency", "Frequency × Class Width", "Frequency + Class Width"], correct: "Frequency ÷ Class Width", hint: "Density = frequency / class width" },
            { text: "P(A ∪ B) = ?", options: ["P(A)+P(B)-P(A∩B)", "P(A)+P(B)", "P(A)×P(B)", "P(A)+P(B)+P(A∩B)"], correct: "P(A)+P(B)-P(A∩B)", hint: "Addition rule" },
            { text: "If P(A)=0.3, P(B)=0.4, P(A∩B)=0.1, find P(A∪B)", options: ["0.6", "0.7", "0.5", "0.8"], correct: "0.6", hint: "0.3+0.4-0.1=0.6" },
            { text: "Mutually exclusive events satisfy:", options: ["P(A∩B)=0", "P(A∪B)=0", "P(A)=P(B)", "P(A∩B)=P(A)P(B)"], correct: "P(A∩B)=0", hint: "Cannot occur together" },
            { text: "Independent events satisfy:", options: ["P(A∩B)=P(A)P(B)", "P(A∩B)=0", "P(A∪B)=P(A)+P(B)", "P(A)=P(B)"], correct: "P(A∩B)=P(A)P(B)", hint: "Multiplication rule for independence" },
            { text: "From a bag with 5 red, 3 blue, probability of picking red first?", options: ["5/8", "3/8", "5/7", "3/7"], correct: "5/8", hint: "5 red out of 8 total" },
            { text: "Without replacement: P(Red then Red) from 5R,3B?", options: ["20/56", "25/64", "15/56", "10/56"], correct: "20/56", hint: "(5/8)×(4/7)=20/56" },
            { text: "Complement rule: P(A') = ?", options: ["1-P(A)", "P(A)-1", "1+P(A)", "P(A)"], correct: "1-P(A)", hint: "Probability of event not occurring" },
            { text: "Box plot shows which five values?", options: ["Min, Q1, Median, Q3, Max", "Mean, Median, Mode, Range, IQR", "Min, Mean, Median, Mode, Max", "Q1, Q2, Q3, Q4, Q5"], correct: "Min, Q1, Median, Q3, Max", hint: "Five-number summary" },
            { text: "Which is more robust to outliers?", options: ["Median and IQR", "Mean and Std Dev", "Mean and Range", "Mode and Range"], correct: "Median and IQR", hint: "Median not affected by extreme values" }
        ]
    }
};

const TOPIC_ORDER = ['algebra', 'quadratics', 'functions', 'calculus', 'trigonometry', 'vectors', 'statistics'];
let topicsState = {};
let globalStreak = 0;
let totalPossible = 0;
let currentUnlockedIndex = 0;
let currentTopic = null;
let confettiAnimationId = null;
let autoAdvanceTimer = null;
let userId = null;

// User Management Functions
function initializeUser() {
    // Check for existing user
    let savedUser = localStorage.getItem('mathMasterUser');
    if (!savedUser) {
        // Prompt for username on first visit
        userId = prompt('Welcome to Math Master! Enter your name to save your progress:', 'Student');
        if (!userId) userId = 'Student';
        localStorage.setItem('mathMasterUser', userId);
    } else {
        userId = savedUser;
    }
    return userId;
}

function saveProgress() {
    if (!userId) return;
    const saveData = {
        userId: userId,
        topicsState: topicsState,
        globalStreak: globalStreak,
        lastSaved: new Date().toISOString()
    };
    localStorage.setItem(`mathMaster_${userId}`, JSON.stringify(saveData));
    console.log(`Progress saved for ${userId}`);
}

function loadProgress() {
    if (!userId) return false;
    const savedData = localStorage.getItem(`mathMaster_${userId}`);
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            topicsState = data.topicsState;
            globalStreak = data.globalStreak;
            console.log(`Progress loaded for ${userId} - Last saved: ${data.lastSaved}`);
            return true;
        } catch (e) {
            console.error('Error loading progress:', e);
            return false;
        }
    }
    return false;
}

function resetProgress() {
    if (confirm('Are you sure you want to reset ALL your progress? This cannot be undone.')) {
        // Reset all topics state
        for (let tid of TOPIC_ORDER) {
            const qlist = TOPICS[tid].questions;
            topicsState[tid] = {
                currentIdx: 0,
                answers: qlist.map(() => ({ answered: false, correct: false }))
            };
        }
        globalStreak = 0;
        saveProgress();
        updateStats();
        renderDashboard();
        if (currentTopic) closeArena();
        alert('Progress has been reset!');
    }
}

function showUserInfo() {
    const correctCount = Object.values(topicsState).reduce((sum, state) => 
        sum + state.answers.filter(a => a.correct).length, 0);
    alert(`👤 User: ${userId}\n📊 Total Score: ${correctCount}/${totalPossible}\n🔥 Current Streak: ${globalStreak}\n🏆 Topics Mastered: ${document.getElementById('topicsComplete').innerText}/7\n\nProgress is automatically saved!`);
}

// Initialize game
function initGame() {
    initializeUser();
    
    totalPossible = 0;
    for (let tid of TOPIC_ORDER) {
        const qlist = TOPICS[tid].questions;
        totalPossible += qlist.length;
        if (!topicsState[tid]) {
            topicsState[tid] = {
                currentIdx: 0,
                answers: qlist.map(() => ({ answered: false, correct: false }))
            };
        }
    }
    
    // Try to load saved progress
    const loaded = loadProgress();
    
    document.getElementById('totalPossible').innerText = totalPossible;
    document.getElementById('totalTopics').innerText = TOPIC_ORDER.length;
    
    // Add user info button to header
    addUserControls();
    
    updateStats();
    renderDashboard();
    loadTheme();
    
    if (loaded) {
        // Show confirmation message
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `<i class="fas fa-save"></i> Welcome back, ${userId}! Your progress has been loaded.`;
        toast.style.cssText = 'position:fixed; bottom:20px; right:20px; background:#2196f3; color:white; padding:12px 20px; border-radius:8px; z-index:9999; animation:fadeOut 3s forwards;';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
}

function addUserControls() {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection && !document.getElementById('userInfoBtn')) {
        const userBtn = document.createElement('button');
        userBtn.id = 'userInfoBtn';
        userBtn.className = 'pdf-btn';
        userBtn.innerHTML = `<i class="fas fa-user"></i> ${userId.substring(0, 10)}`;
        userBtn.onclick = showUserInfo;
        
        const resetBtn = document.createElement('button');
        resetBtn.id = 'resetProgressBtn';
        resetBtn.className = 'pdf-btn';
        resetBtn.innerHTML = `<i class="fas fa-trash-alt"></i> Reset`;
        resetBtn.style.background = '#f44336';
        resetBtn.onclick = resetProgress;
        
        statsSection.appendChild(userBtn);
        statsSection.appendChild(resetBtn);
    }
}

function updateStats() {
    let totalCorrect = 0;
    let defeatedCount = 0;
    for (let tid of TOPIC_ORDER) {
        const state = topicsState[tid];
        if (state) {
            const correct = state.answers.filter(a => a.correct).length;
            totalCorrect += correct;
            if (correct === TOPICS[tid].questions.length) defeatedCount++;
        }
    }
    document.getElementById('totalScore').innerText = totalCorrect;
    document.getElementById('topicsComplete').innerText = defeatedCount;
    document.getElementById('streakCount').innerText = globalStreak;
    currentUnlockedIndex = defeatedCount;
    
    // Save progress after every update
    saveProgress();
}

function renderDashboard() {
    const container = document.getElementById('topicsGrid');
    if (!container) return;
    container.innerHTML = '';
    
    for (let i = 0; i < TOPIC_ORDER.length; i++) {
        const tid = TOPIC_ORDER[i];
        const topic = TOPICS[tid];
        const state = topicsState[tid];
        if (!state) continue;
        
        const correctCount = state.answers.filter(a => a.correct).length;
        const totalQs = topic.questions.length;
        const isDefeated = correctCount === totalQs;
        const isUnlocked = i <= currentUnlockedIndex;
        
        const card = document.createElement('div');
        card.className = `topic-card ${!isUnlocked ? 'locked' : ''}`;
        if (isUnlocked) {
            card.onclick = () => openTopic(tid);
        }
        
        const progressPercent = (correctCount / totalQs) * 100;
        
        card.innerHTML = `
            <div class="card-header">
                <i class="${topic.icon}"></i>
                <h3>${topic.name}</h3>
            </div>
            <div class="card-body">
                <div class="card-stats">
                    <span><i class="fas fa-check-circle"></i> ${correctCount}/${totalQs}</span>
                    <span><i class="fas fa-chart-line"></i> ${Math.round(progressPercent)}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                </div>
                <div class="card-status">
                    ${!isUnlocked ? '<span class="status-locked"><i class="fas fa-lock"></i> LOCKED</span>' : 
                      isDefeated ? '<span class="status-defeated"><i class="fas fa-trophy"></i> MASTERED</span>' : 
                      '<span class="status-unlocked"><i class="fas fa-play"></i> START CHALLENGE</span>'}
                </div>
            </div>
        `;
        container.appendChild(card);
    }
}

function openTopic(tid) {
    const idx = TOPIC_ORDER.indexOf(tid);
    if (idx > currentUnlockedIndex) {
        alert("🔒 Complete previous topics first to unlock this challenge!");
        return;
    }
    currentTopic = tid;
    document.getElementById('arenaTitle').innerHTML = `<i class="${TOPICS[tid].icon}"></i> ${TOPICS[tid].name}`;
    document.getElementById('quizArena').classList.remove('hidden');
    renderQuiz();
}

function closeArena() {
    if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
    document.getElementById('quizArena').classList.add('hidden');
    currentTopic = null;
    renderDashboard();
    updateStats();
    saveProgress();
}

function renderQuiz() {
    if (!currentTopic) return;
    
    const container = document.getElementById('quizContent');
    const topic = TOPICS[currentTopic];
    const state = topicsState[currentTopic];
    const totalQs = topic.questions.length;
    const correctCount = state.answers.filter(a => a.correct).length;
    const allCompleted = state.answers.every(a => a.answered && a.correct);
    
    document.getElementById('progressInfo').innerHTML = `<i class="fas fa-chart-line"></i> ${correctCount}/${totalQs} Correct`;
    
    if (allCompleted) {
        container.innerHTML = `
            <div class="victory-screen">
                <i class="fas fa-trophy"></i>
                <h2>TOPIC MASTERED!</h2>
                <p>Score: ${correctCount}/${totalQs}</p>
                <p><i class="fas fa-star"></i> Excellent work, ${userId}! <i class="fas fa-star"></i></p>
                <button class="next-btn" onclick="closeArena()">Return to Dashboard</button>
            </div>
        `;
        return;
    }
    
    const current = topic.questions[state.currentIdx];
    const isAnswered = state.answers[state.currentIdx].answered;
    const isCorrect = state.answers[state.currentIdx].correct;
    const progressPercent = (state.answers.filter(a => a.answered).length / totalQs) * 100;
    
    let feedbackHtml = `<i class="fas fa-brain"></i> Select the correct answer`;
    let feedbackClass = '';
    
    if (isAnswered) {
        if (isCorrect) {
            feedbackHtml = `<i class="fas fa-check-circle"></i> Correct! +1 point. Streak: ${globalStreak}x`;
            feedbackClass = 'feedback-correct';
        } else {
            feedbackHtml = `<i class="fas fa-lightbulb"></i> ${current.hint || 'Try again!'} Correct answer: ${current.correct}`;
            feedbackClass = 'feedback-wrong';
        }
    }
    
    container.innerHTML = `
        <div class="question-card">
            <div class="progress-bar" style="margin-bottom: 1rem;">
                <div class="progress-fill" style="width: ${progressPercent}%"></div>
            </div>
            <div class="question-text">
                <i class="fas fa-question-circle"></i> ${current.text}
            </div>
            <div class="options-grid" id="optionsContainer">
                ${current.options.map(opt => `
                    <button class="option-btn" data-opt="${opt.replace(/"/g, '&quot;')}">
                        <i class="fas fa-${isAnswered && opt === current.correct ? 'check-circle' : 'circle'}"></i>
                        ${opt}
                    </button>
                `).join('')}
            </div>
            <div class="feedback ${feedbackClass}">${feedbackHtml}</div>
            ${isAnswered ? `<button class="next-btn" id="nextQuestionBtn"><i class="fas fa-forward"></i> Next Question</button>` : ''}
        </div>
    `;
    
    if (!isAnswered) {
        const btns = document.querySelectorAll('.option-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
                const selected = btn.getAttribute('data-opt');
                const correct = selected === current.correct;
                handleAnswer(currentTopic, selected, correct);
            });
        });
    }
    
    const nextBtn = document.getElementById('nextQuestionBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
            nextQuestion(currentTopic);
        });
    }
}

function handleAnswer(tid, selected, isCorrect) {
    const state = topicsState[tid];
    if (state.answers[state.currentIdx].answered) return;
    
    state.answers[state.currentIdx].answered = true;
    state.answers[state.currentIdx].correct = isCorrect;
    
    if (isCorrect) {
        globalStreak++;
        updateStats();
        triggerConfetti();
    } else {
        globalStreak = 0;
        updateStats();
    }
    
    renderQuiz();
    updateStats();
    renderDashboard();
    saveProgress();
    
    // Auto-advance after 1.5 seconds
    autoAdvanceTimer = setTimeout(() => {
        nextQuestion(tid);
        autoAdvanceTimer = null;
    }, 1500);
}

function nextQuestion(tid) {
    const state = topicsState[tid];
    const totalQs = TOPICS[tid].questions.length;
    
    if (state.currentIdx + 1 < totalQs) {
        state.currentIdx++;
        renderQuiz();
    } else {
        renderQuiz();
        updateStats();
        renderDashboard();
        saveProgress();
    }
}

function triggerConfetti() {
    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
    
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 6 + 2,
            speedY: Math.random() * 6 + 3,
            speedX: (Math.random() - 0.5) * 4,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`
        });
    }
    
    let startTime = Date.now();
    
    function draw() {
        if (Date.now() - startTime > 1500) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confettiAnimationId = null;
            return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
            p.y += p.speedY;
            p.x += p.speedX;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        }
        confettiAnimationId = requestAnimationFrame(draw);
    }
    draw();
}

function generateReport() {
    let totalCor = parseInt(document.getElementById('totalScore').innerText);
    let completed = parseInt(document.getElementById('topicsComplete').innerText);
    let reportDiv = document.createElement('div');
    const currentTheme = document.body.getAttribute('data-theme');
    reportDiv.style.background = currentTheme === 'light' ? '#ffffff' : '#0f2a3a';
    reportDiv.style.padding = "25px";
    reportDiv.style.borderRadius = "20px";
    reportDiv.style.color = currentTheme === 'light' ? '#0a2b3e' : '#e6f3ff';
    reportDiv.style.fontFamily = "'Inter', sans-serif";
    reportDiv.style.border = "2px solid #2196f3";
    reportDiv.innerHTML = `
        <div style="text-align:center; margin-bottom:20px;">
            <i class="fas fa-graduation-cap" style="font-size: 40px; color:#2196f3;"></i>
            <h2 style="color:#2196f3;">NCUK Math Master Report</h2>
            <p><strong>Student:</strong> ${userId}</p>
        </div>
        <p><strong>Final Score:</strong> ${totalCor} / ${totalPossible}</p>
        <p><strong>Topics Mastered:</strong> ${completed} / 7</p>
        <p><strong>Current Streak:</strong> ${globalStreak}</p>
        <hr style="margin:15px 0; border-color:#2196f3;">
        <p><i class="fas fa-chart-line"></i> Keep practicing to achieve mastery!</p>
        <p><i class="fas fa-calendar"></i> Report Date: ${new Date().toLocaleDateString()}</p>
        <p><i class="fas fa-user"></i> Progress is automatically saved for ${userId}</p>
    `;
    html2pdf().set({ margin: 0.5, filename: `Math_Master_Report_${userId}.pdf`, image: { type: 'jpeg', quality: 0.98 } }).from(reportDiv).save();
}

function loadTheme() {
    const saved = localStorage.getItem('mathTheme') || 'dark';
    document.body.setAttribute('data-theme', saved);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        if (btn.dataset.theme === saved) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('mathTheme', theme);
    document.getElementById('themeModal').classList.remove('show');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const reportBtn = document.getElementById('pdfReportBtn');
    if (reportBtn) reportBtn.addEventListener('click', generateReport);
    
    const closeBtn = document.getElementById('closeArenaBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeArena);
    
    const openThemeBtn = document.getElementById('openThemeModal');
    if (openThemeBtn) {
        openThemeBtn.addEventListener('click', () => {
            document.getElementById('themeModal').classList.add('show');
        });
    }
    
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            document.getElementById('themeModal').classList.remove('show');
        });
    }
    
    const applyBtn = document.getElementById('applyThemeBtn');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            const selected = document.querySelector('.theme-btn.active')?.dataset.theme || 'dark';
            applyTheme(selected);
        });
    }
    
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    initGame();
});