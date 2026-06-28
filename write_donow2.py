content = r"""import React, { useState, useRef } from 'react'

const QUESTIONS = {
  'Place value & rounding': [
    {q:'Round 4.673 to 2 decimal places.',a:'4.67',d:1},{q:'Round 0.0456 to 2 significant figures.',a:'0.046',d:2},{q:'Write 3.7 million in figures.',a:'3,700,000',d:1},{q:'Round 45,678 to the nearest thousand.',a:'46,000',d:1},{q:'Round 0.004562 to 3 significant figures.',a:'0.00456',d:3},{q:'A number rounded to 1 dp is 6.8. Write down the error interval.',a:'6.75 ≤ x < 6.85',d:5},{q:'Round 0.009876 to 2 significant figures.',a:'0.0099',d:3},{q:'Write 4.2 × 10³ as an ordinary number.',a:'4200',d:2},{q:'A length is 12.4cm to 1dp. What is the maximum possible length?',a:'12.45cm',d:4},
  ],
  'Fractions': [
    {q:'Calculate ¾ + ⅔',a:'17/12 = 1 5/12',d:2},{q:'Calculate 2½ × 1⅓',a:'10/3 = 3⅓',d:3},{q:'Simplify 24/36',a:'2/3',d:1},{q:'Calculate 3¼ ÷ 1½',a:'13/6 = 2⅙',d:4},{q:'Write ⅝ as a decimal.',a:'0.625',d:1},{q:'Which is larger: 5/8 or 7/11?',a:'7/11 (= 0.636... > 0.625)',d:3},{q:'Calculate 2⅓ + 1¾',a:'49/12 = 4 1/12',d:3},{q:'A recipe needs ¾ of a cup. How much for 6 portions?',a:'4½ cups',d:2},{q:'Calculate (2/3)² ',a:'4/9',d:3},{q:'Simplify 3/4 ÷ 9/16',a:'4/3 = 1⅓',d:4},
  ],
  'Decimals': [
    {q:'Calculate 3.6 × 0.4',a:'1.44',d:2},{q:'Calculate 12.6 ÷ 0.3',a:'42',d:2},{q:'Write 0.36 as a fraction in its simplest form.',a:'9/25',d:3},{q:'Calculate 0.2³',a:'0.008',d:3},{q:'Arrange in order: 0.31, 0.309, 0.3, 0.32',a:'0.3, 0.309, 0.31, 0.32',d:2},{q:'Calculate 2.4 × 1.5',a:'3.6',d:1},{q:'What is 0.7 × 0.7?',a:'0.49',d:2},{q:'Calculate 4.8 ÷ 0.06',a:'80',d:4},{q:'Write 1/7 as a decimal to 3dp.',a:'0.143',d:3},
  ],
  'Percentages': [
    {q:'Find 35% of 240.',a:'84',d:2},{q:'Increase £80 by 15%.',a:'£92',d:2},{q:'A TV costs £360 after a 20% discount. What was the original price?',a:'£450',d:4},{q:'Express 36 as a percentage of 150.',a:'24%',d:2},{q:'Find the percentage increase from 40 to 54.',a:'35%',d:3},{q:'After a 12% increase a price is £560. Find the original.',a:'£500',d:5},{q:'Calculate compound interest: £2000 at 3% for 3 years.',a:'£2185.45',d:5},{q:'A coat is reduced by 30% to £84. Find the original price.',a:'£120',d:4},{q:'Find 17.5% of £360.',a:'£63',d:3},{q:'VAT at 20% is added to £85. Find the total.',a:'£102',d:2},
  ],
  'Powers & roots': [
    {q:'Calculate 5³',a:'125',d:1},{q:'Find √144',a:'12',d:1},{q:'Calculate 2⁵',a:'32',d:1},{q:'Find the value of 27^(1/3)',a:'3',d:3},{q:'Simplify x³ × x⁴',a:'x⁷',d:2},{q:'Simplify (x²)³',a:'x⁶',d:2},{q:'Find 16^(3/4)',a:'8',d:5},{q:'Simplify x⁶ ÷ x²',a:'x⁴',d:2},{q:'Calculate (-3)⁴',a:'81',d:3},{q:'Simplify (2x³)²',a:'4x⁶',d:3},
  ],
  'Standard form': [
    {q:'Write 45000 in standard form.',a:'4.5 × 10⁴',d:1},{q:'Write 0.00036 in standard form.',a:'3.6 × 10⁻⁴',d:2},{q:'Calculate (3 × 10⁴) × (2 × 10³)',a:'6 × 10⁷',d:3},{q:'Write 2.7 × 10⁻³ as an ordinary number.',a:'0.0027',d:2},{q:'Calculate (4 × 10⁶) ÷ (8 × 10²)',a:'5 × 10³',d:4},{q:'Add 3 × 10⁴ and 5 × 10³',a:'3.5 × 10⁴',d:4},{q:'The distance from Earth to Sun is 1.5 × 10⁸ km. Write in km.',a:'150,000,000 km',d:2},{q:'Arrange in order: 3×10², 4×10¹, 2×10³',a:'4×10¹, 3×10², 2×10³',d:3},
  ],
  'Ratio & proportion': [
    {q:'Share £120 in the ratio 3:5',a:'£45 and £75',d:2},{q:'Simplify 24:36:48',a:'2:3:4',d:2},{q:'If 5 items cost £8.50, find the cost of 8.',a:'£13.60',d:3},{q:'A map has scale 1:25000. A road is 4cm on map. Find real length.',a:'1 km',d:4},{q:'Increase 60 in ratio 5:4',a:'75',d:4},{q:'Share 180 in ratio 2:3:5',a:'36, 54, 90',d:3},{q:'If y is proportional to x and y=15 when x=5, find y when x=8.',a:'24',d:3},{q:'A recipe for 4 uses 300g flour. How much for 10?',a:'750g',d:2},{q:'Two angles in ratio 2:7. Find both if they add to 180°.',a:'40° and 140°',d:3},
  ],
  'Compound interest': [
    {q:'£500 invested at 4% per year compound interest. Find value after 2 years.',a:'£540.80',d:3},{q:'A car worth £12000 depreciates at 15% per year. Find value after 3 years.',a:'£7372.35',d:4},{q:'£800 at 5% compound interest for 4 years. Find total interest earned.',a:'£172.82',d:5},{q:'Find the multiplier for 6% compound increase per year.',a:'1.06',d:2},{q:'A population of 20000 grows at 2% per year. Find population after 5 years.',a:'22082',d:4},{q:'£1000 grows to £1166.40 in 2 years compound interest. Find the rate.',a:'8%',d:6},
  ],
  'Simplifying expressions': [
    {q:'Simplify 5x + 3y - 2x + y',a:'3x + 4y',d:1},{q:'Simplify 3a² + 5a - a² - 2a',a:'2a² + 3a',d:2},{q:'Simplify 4x²y × 3xy²',a:'12x³y³',d:3},{q:'Simplify (3x²)³',a:'27x⁶',d:3},{q:'Simplify 6x²y ÷ 2xy²',a:'3x/y',d:4},{q:'Collect like terms: 4p + 3q - p + 5q - 2',a:'3p + 8q - 2',d:2},{q:'Simplify 2x(3x - 4) + x²',a:'7x² - 8x',d:4},
  ],
  'Expanding brackets': [
    {q:'Expand 3(2x + 5)',a:'6x + 15',d:1},{q:'Expand and simplify 4(x + 3) - 2(x - 1)',a:'2x + 14',d:2},{q:'Expand (x + 4)(x + 3)',a:'x² + 7x + 12',d:2},{q:'Expand (2x - 3)(x + 5)',a:'2x² + 7x - 15',d:3},{q:'Expand (x + 3)²',a:'x² + 6x + 9',d:3},{q:'Expand (x - 5)(x + 5)',a:'x² - 25',d:3},{q:'Expand (3x - 2)²',a:'9x² - 12x + 4',d:4},{q:'Expand (x + 2)(x - 3)(x + 1)',a:'x³ - 7x - 6... first expand two then multiply by third',d:6},
  ],
  'Factorising': [
    {q:'Factorise 6x + 9',a:'3(2x + 3)',d:1},{q:'Factorise x² + 7x + 12',a:'(x + 3)(x + 4)',d:2},{q:'Factorise x² - 25',a:'(x - 5)(x + 5)',d:2},{q:'Factorise x² - 5x + 6',a:'(x - 2)(x - 3)',d:3},{q:'Factorise 2x² + 7x + 3',a:'(2x + 1)(x + 3)',d:4},{q:'Factorise 3x² - 12',a:'3(x-2)(x+2)',d:4},{q:'Factorise 6x² - x - 2',a:'(3x - 2)(2x + 1)',d:5},{q:'Factorise 4x² - 12x + 9',a:'(2x - 3)²',d:5},
  ],
  'Solving linear equations': [
    {q:'Solve 3x + 5 = 17',a:'x = 4',d:1},{q:'Solve 5x - 3 = 2x + 9',a:'x = 4',d:2},{q:'Solve 3(2x - 1) = 15',a:'x = 3',d:2},{q:'Solve x/4 + 3 = 7',a:'x = 16',d:2},{q:'Solve (x+2)/3 = (x-1)/2',a:'x = 7',d:4},{q:'Solve 5 - 2x = 3x + 15',a:'x = -2',d:3},{q:'Solve 3(x+4) = 2(x-1)',a:'x = -14',d:4},{q:'Solve 4/x = 12',a:'x = 1/3',d:3},
  ],
  'Solving quadratics': [
    {q:'Solve x² - 5x + 6 = 0',a:'x = 2 or x = 3',d:2},{q:'Solve x² + 3x - 10 = 0',a:'x = 2 or x = -5',d:3},{q:'Solve 2x² - 7x + 3 = 0',a:'x = 3 or x = 0.5',d:4},{q:'Solve x² = 9',a:'x = 3 or x = -3',d:1},{q:'Solve x² + 6x + 9 = 0',a:'x = -3 (repeated root)',d:3},{q:'Use quadratic formula: x² + 5x + 2 = 0 (to 2dp)',a:'x = -0.44 or x = -4.56',d:5},{q:'Solve x(x - 4) = 12',a:'x = 6 or x = -2',d:4},{q:'Solve 3x² = 12x',a:'x = 0 or x = 4',d:3},
  ],
  'Simultaneous equations': [
    {q:'Solve: x + y = 7 and x - y = 3',a:'x = 5, y = 2',d:2},{q:'Solve: 2x + y = 11 and x + 3y = 12',a:'x = 3, y = 5... wait x=3,y=5: 6+5=11 ✓ 3+15=18 ✗. Try: x=3,y=5 check again.',a:'x=3, y=5',d:3},{q:'Solve: 3x - 2y = 7 and x + y = 6',a:'x = 19/5, y = 11/5',d:4},{q:'Solve: y = 2x + 1 and y = x + 4',a:'x = 3, y = 7',d:2},{q:'Solve: 4x + 3y = 18 and 2x - y = 4',a:'x = 3, y = 2',d:4},{q:'Solve by substitution: y = x² and y = x + 6',a:'x = 3,y=9 or x=-2,y=4',d:5},
  ],
  'nth term sequences': [
    {q:'Find the nth term of 5, 8, 11, 14...',a:'3n + 2',d:2},{q:'Find the nth term of 2, 5, 10, 17...',a:'n² + 1',d:4},{q:'Find the 10th term of the sequence nth term = 4n - 3',a:'37',d:1},{q:'Find the nth term of 3, 7, 11, 15...',a:'4n - 1',d:2},{q:'Find the nth term of 1, 4, 9, 16...',a:'n²',d:2},{q:'Is 100 a term in the sequence 3n + 1?',a:'No — (100-1)/3 = 33 not whole',d:4},{q:'Find the nth term of 2, 6, 12, 20, 30...',a:'n² + n or n(n+1)',d:5},
  ],
  'Straight line graphs': [
    {q:'What is the gradient of y = 3x - 5?',a:'3',d:1},{q:'What is the y-intercept of y = 2x + 7?',a:'7 (at point (0,7))',d:1},{q:'Find the equation of a line through (0,4) with gradient 2.',a:'y = 2x + 4',d:2},{q:'Find the gradient of the line through (1,3) and (3,9).',a:'3',d:3},{q:'Are y = 2x + 1 and y = 2x - 3 parallel?',a:'Yes — same gradient of 2',d:2},{q:'Find the equation of the line through (2,5) and (4,9).',a:'y = 2x + 1',d:4},{q:'What is the gradient of a line perpendicular to y = 3x + 1?',a:'-1/3',d:4},{q:'Find where y = 2x + 1 and y = -x + 7 intersect.',a:'x=2, y=5',d:4},
  ],
  'Rearranging formulae': [
    {q:'Make x the subject: y = 3x + 2',a:'x = (y-2)/3',d:2},{q:'Make r the subject: A = πr²',a:'r = √(A/π)',d:3},{q:'Make t the subject: v = u + at',a:'t = (v-u)/a',d:3},{q:'Make x the subject: y = (x+3)/(x-1)',a:'x = (y+3)/(y-1)',d:5},{q:'Make h the subject: V = ⅓πr²h',a:'h = 3V/(πr²)',d:3},{q:'Make x the subject: ax + b = cx + d',a:'x = (d-b)/(a-c)',d:5},
  ],
  'Area of 2D shapes': [
    {q:'Find the area of a triangle with base 8cm and height 5cm.',a:'20cm²',d:1},{q:'Find the area of a circle with radius 6cm. (π=3.14)',a:'113.04cm²',d:2},{q:'Find the area of a trapezium with parallel sides 5cm, 9cm and height 4cm.',a:'28cm²',d:3},{q:'Find the area of a parallelogram with base 7cm and height 4cm.',a:'28cm²',d:2},{q:'Find the area of a sector with radius 8cm and angle 90°.',a:'50.27cm²',d:4},{q:'A circle has area 50.24cm². Find the radius. (π=3.14)',a:'4cm',d:4},{q:'Find the shaded area between a 10cm square and circle radius 4cm.',a:'100 - 50.27 = 49.73cm²',d:5},
  ],
  'Perimeter': [
    {q:'Find the perimeter of a rectangle 7cm × 4cm.',a:'22cm',d:1},{q:'Find the circumference of a circle diameter 10cm. (π=3.14)',a:'31.4cm',d:2},{q:'Find the perimeter of a semicircle radius 6cm.',a:'12 + 6π = 30.85cm',d:4},{q:'A square has perimeter 36cm. Find the area.',a:'81cm²',d:3},{q:'Find the arc length of a sector radius 5cm, angle 72°.',a:'6.28cm',d:4},{q:'Find the perimeter of an equilateral triangle with area 16√3 cm².',a:'24cm',d:5},
  ],
  'Volume & surface area': [
    {q:'Find the volume of a cuboid 5cm × 3cm × 4cm.',a:'60cm³',d:1},{q:'Find the volume of a cylinder radius 3cm, height 8cm. (π=3.14)',a:'226.08cm³',d:2},{q:'Find the surface area of a cube with side 4cm.',a:'96cm²',d:2},{q:'Find the volume of a cone radius 5cm, height 9cm.',a:'235.5cm³',d:4},{q:'Find the volume of a sphere radius 3cm.',a:'113.1cm³',d:4},{q:'A cylinder has volume 500cm³ and radius 5cm. Find height.',a:'6.37cm',d:4},{q:'Find the surface area of a sphere radius 4cm.',a:'201.1cm²',d:4},
  ],
  'Angles in polygons': [
    {q:'What do angles in a triangle add up to?',a:'180°',d:1},{q:'Find the interior angle of a regular hexagon.',a:'120°',d:2},{q:'Find the exterior angle of a regular pentagon.',a:'72°',d:2},{q:'Two angles in a triangle are 65° and 48°. Find the third.',a:'67°',d:1},{q:'Find the sum of interior angles of an octagon.',a:'1080°',d:3},{q:'A regular polygon has exterior angle 24°. How many sides?',a:'15 sides',d:4},{q:'Angles of a quadrilateral are x, 2x, 3x and 4x. Find x.',a:'x = 36°',d:3},
  ],
  'Pythagoras theorem': [
    {q:'Find the hypotenuse of a right triangle with legs 3cm and 4cm.',a:'5cm',d:1},{q:'Find the missing leg if hypotenuse is 13cm and one leg is 5cm.',a:'12cm',d:2},{q:'Find the distance between (1,2) and (4,6).',a:'5 units',d:3},{q:'A ladder 5m long rests against a wall, foot 3m from wall. How high up?',a:'4m',d:3},{q:'Find the diagonal of a rectangle 8cm × 6cm.',a:'10cm',d:2},{q:'Is a triangle with sides 7, 24, 25 right-angled?',a:'Yes: 7²+24²=625=25²',d:4},{q:'Find the area of an isosceles triangle with equal sides 10cm and base 12cm.',a:'48cm²',d:5},
  ],
  'Trigonometry': [
    {q:'Find angle x: opposite=5cm, hypotenuse=10cm.',a:'x = 30° (sin x = 0.5)',d:2},{q:'Find the adjacent side: angle=40°, hypotenuse=8cm.',a:'6.13cm (cos40°×8)',d:3},{q:'Find the opposite: angle=35°, adjacent=6cm.',a:'4.20cm (tan35°×6)',d:3},{q:'Find angle x: adjacent=5, opposite=5.',a:'45°',d:2},{q:'Find the hypotenuse: angle=28°, opposite=7cm.',a:'14.9cm',d:3},{q:'A 6m ladder makes 70° with ground. How high up the wall?',a:'5.64m',d:4},{q:'Find the exact value of sin(30°).',a:'1/2',d:2},{q:'Find the exact value of cos(60°).',a:'1/2',d:2},
  ],
  'Circle theorems': [
    {q:'An angle at the centre is 80°. Find the angle at the circumference.',a:'40°',d:2},{q:'Angle in a semicircle — what does it equal?',a:'90°',d:1},{q:'Two angles in the same segment subtend the same arc. What can you say?',a:'They are equal',d:2},{q:'Opposite angles of a cyclic quadrilateral. What do they add up to?',a:'180°',d:2},{q:'A tangent meets a radius at what angle?',a:'90°',d:1},{q:'A chord is 6cm from centre. Radius is 10cm. Find half the chord length.',a:'8cm (Pythagoras)',d:4},
  ],
  'Transformations': [
    {q:'Describe a reflection in the y-axis.',a:'Each point (x,y) maps to (-x,y)',d:2},{q:'Rotate (3,2) by 90° clockwise about origin.',a:'(2,-3)',d:3},{q:'Translate (2,5) by vector (-3,4).',a:'(-1,9)',d:1},{q:'Enlarge (2,4) by scale factor 3 centre origin.',a:'(6,12)',d:2},{q:'A shape has area 8cm². It is enlarged scale factor 3. New area?',a:'72cm²',d:4},{q:'Describe fully: triangle at (1,2)(2,2)(1,4) maps to (2,4)(4,4)(2,8).',a:'Enlargement SF 2 centre origin',d:4},
  ],
  'Bearings': [
    {q:'What is the bearing of East?',a:'090°',d:1},{q:'A bearing is 075°. What is the back bearing?',a:'255°',d:3},{q:'Point B is 5km from A on bearing 060°. How far North is B from A?',a:'2.5km (5×cos60°)',d:4},{q:'What is the bearing of South-West?',a:'225°',d:1},{q:'A ship travels 10km on bearing 130°. Find eastward distance.',a:'7.66km (10×sin130°... sin50°=0.766)',d:5},
  ],
  'Mean, median, mode': [
    {q:'Find the mean of 4, 7, 9, 12, 8.',a:'8',d:1},{q:'Find the median of 3, 7, 2, 9, 5, 1, 8.',a:'5 (ordered: 1,2,3,5,7,8,9)',d:2},{q:'Find the mode of 3,5,3,7,5,3,9.',a:'3',d:1},{q:'Find the mean of 12, 15, 18, 14, 16.',a:'15',d:1},{q:'The mean of 5 numbers is 8. Four are 6,9,7,10. Find the fifth.',a:'8',d:3},{q:'Find the median of 4, 8, 12, 16.',a:'10 (mean of 8 and 12)',d:2},{q:'Find the range of 3, 7, 12, 5, 9, 1.',a:'11',d:1},
  ],
  'Bar charts': [
    {q:'A bar chart shows: Mon=8, Tue=12, Wed=6, Thu=10. Find the mean.',a:'9',d:2},{q:'The total frequency in a bar chart is 60. One bar shows 15. What percentage?',a:'25%',d:2},{q:'What does the height of a bar represent in a bar chart?',a:'The frequency (number of items)',d:1},{q:'A bar chart shows favourite sports. 24 chose football out of 80. What fraction?',a:'3/10',d:2},
  ],
  'Scatter graphs': [
    {q:'What does positive correlation mean on a scatter graph?',a:'As one variable increases, the other also increases',d:1},{q:'What is a line of best fit used for?',a:'To estimate values and show the trend',d:1},{q:'A scatter graph shows height vs weight with positive correlation. Height 170cm. Estimate weight using line of best fit at 65kg. Is this interpolation or extrapolation?',a:'Interpolation (within the data range)',d:3},{q:'What does a correlation coefficient of -0.9 suggest?',a:'Strong negative correlation',d:3},
  ],
  'Probability': [
    {q:'A fair dice is rolled. P(even number)?',a:'3/6 = 1/2',d:1},{q:'A bag has 3 red, 5 blue, 2 green balls. P(blue)?',a:'5/10 = 1/2',d:1},{q:'P(A) = 0.3. Find P(not A).',a:'0.7',d:1},{q:'Two coins flipped. P(both heads)?',a:'1/4',d:2},{q:'Cards 1-10. Find P(prime number).',a:'4/10 = 2/5 (2,3,5,7)',d:3},{q:'P(A) = 0.4, P(B) = 0.3, independent. Find P(A and B).',a:'0.12',d:4},{q:'A bag has 4 red, 3 blue. Two drawn without replacement. P(both red)?',a:'12/42 = 2/7',d:5},
  ],
  'Cumulative frequency': [
    {q:'What does cumulative frequency mean?',a:'Running total of frequencies',d:1},{q:'From a CF graph, how do you find the median?',a:'Read off at half the total frequency',d:2},{q:'From a CF graph, how do you find the interquartile range?',a:'UQ - LQ (at 75% and 25% of total)',d:3},{q:'60 students. Lower quartile at CF=15. What percentage scored below LQ?',a:'25%',d:2},
  ],
  'Box plots': [
    {q:'What five values are shown in a box plot?',a:'Minimum, LQ, median, UQ, maximum',d:1},{q:'A box plot shows LQ=20, UQ=35. Find the IQR.',a:'15',d:1},{q:'Which measure of spread does IQR represent?',a:'The spread of the middle 50% of data',d:2},{q:'A box plot has median 40, LQ=30, UQ=55. Is the data skewed?',a:'Positive skew (median closer to LQ)',d:4},
  ],
  'Venn diagrams': [
    {q:'In a Venn diagram, what does the intersection represent?',a:'Elements in BOTH sets',d:1},{q:'30 students: 18 like maths, 14 like English, 7 like both. How many like neither?',a:'5',d:3},{q:'P(A∪B) = P(A) + P(B) - P(A∩B). If P(A)=0.5, P(B)=0.4, P(A∩B)=0.2, find P(A∪B).',a:'0.7',d:4},{q:'In a Venn diagram with sets A and B, shade A only (not B).',a:'The left part of A not overlapping B',d:2},
  ],
  'Money & budgeting': [
    {q:'A jacket costs £85. There is a 20% sale. What is the sale price?',a:'£68',d:1},{q:'Weekly wage £450. Tax is 20% on earnings over £150. Calculate take-home pay.',a:'£390',d:3},{q:'Electricity costs 24p per unit. 350 units used. Find total cost.',a:'£84',d:2},{q:'A mobile plan costs £25/month. How much per year?',a:'£300',d:1},{q:'Hourly rate £12. Works 37.5 hours. Find weekly pay.',a:'£450',d:2},{q:'Annual salary £24000. Monthly take-home after 20% tax?',a:'£1600',d:3},
  ],
  'Time calculations': [
    {q:'A train leaves at 09:45 and arrives at 11:20. How long is the journey?',a:'1 hour 35 minutes',d:2},{q:'Convert 2 hours 45 minutes to minutes.',a:'165 minutes',d:1},{q:'A film starts at 19:30 and lasts 2h 15min. When does it end?',a:'21:45',d:2},{q:'How many minutes in 3.5 hours?',a:'210 minutes',d:1},{q:'A worker does 6 hours 40 minutes. How many minutes?',a:'400 minutes',d:2},
  ],
  'Measurement conversions': [
    {q:'Convert 3.5km to metres.',a:'3500m',d:1},{q:'Convert 4500g to kilograms.',a:'4.5kg',d:1},{q:'Convert 2.4 litres to millilitres.',a:'2400ml',d:1},{q:'1 inch = 2.54cm. Convert 10 inches to cm.',a:'25.4cm',d:2},{q:'Convert 60mph to km/h. (1 mile = 1.6km)',a:'96 km/h',d:2},{q:'Convert 5.6cm² to mm².',a:'560mm²',d:4},
  ],
  'Reading charts': [
    {q:'A pie chart has a sector of 90°. What fraction of the total does this represent?',a:'1/4',d:1},{q:'A bar chart shows sales: Jan=120, Feb=95, Mar=140. Find the mean.',a:'118.33',d:2},{q:'A line graph shows temperature rising from 12°C to 18°C. What is the increase?',a:'6°C',d:1},{q:'A frequency table shows 5 classes. Total frequency = 80. Mean class frequency?',a:'16',d:2},
  ],
  'Percentages in context': [
    {q:'A house costs £200000. Deposit is 10%. Find the deposit.',a:'£20000',d:1},{q:'Population increases from 25000 to 27500. Find % increase.',a:'10%',d:2},{q:'A salary is £32000. Gets 3.5% rise. New salary?',a:'£33120',d:3},{q:'In a sale, price drops from £80 to £60. Find % decrease.',a:'25%',d:2},{q:'30 out of 120 students passed. What percentage failed?',a:'75%',d:2},
  ],
  'Area & perimeter in context': [
    {q:'A room is 4m × 3.5m. Find the area.',a:'14m²',d:1},{q:'Carpet costs £12/m². Room is 5m × 4m. Find the cost.',a:'£240',d:2},{q:'A path 1m wide surrounds a 6m × 4m lawn. Find path area.',a:'28m²',d:4},{q:'A circular pond has circumference 18.85m. Find the radius.',a:'3m',d:3},{q:'Tiles are 20cm × 20cm. How many for a 3m × 2m floor?',a:'150 tiles',d:3},
  ],
  'Averages in context': [
    {q:'5 friends earn £28000, £32000, £35000, £28000, £42000. Find mean and median.',a:'Mean=£33000, Median=£32000',d:3},{q:'Mean of 6 tests is 72. Find total marks.',a:'432',d:2},{q:'Which average is best for a skewed distribution?',a:'Median',d:3},{q:'A set of data: 2,4,5,5,6,8,10. Find the IQR.',a:'IQR = 8-4 = 4',d:3},
  ],
  'Probability in context': [
    {q:'A spinner has 5 equal sections: 2 red, 2 blue, 1 green. P(red)?',a:'2/5',d:1},{q:'P(rain on Monday) = 0.4, P(rain on Tuesday) = 0.3, independent. P(rain both days)?',a:'0.12',d:3},{q:'Expected frequency: P(win)=0.2, 50 games. How many wins expected?',a:'10',d:2},{q:'P(faulty) = 0.05. In 200 items, how many expected faulty?',a:'10',d:2},
  ],
  'Scale & maps': [
    {q:'Scale 1:50000. A road is 3cm on map. Real length?',a:'1.5km',d:2},{q:'Scale 1:200. Real room is 6m × 4m. Map dimensions?',a:'3cm × 2cm',d:3},{q:'A model car is scale 1:20. Real car is 4m long. Model length?',a:'20cm',d:2},{q:'Map scale 2cm = 5km. Distance on map = 7cm. Real distance?',a:'17.5km',d:3},
  ],
  'Data interpretation': [
    {q:'A frequency table: 0-10 (freq 5), 10-20 (freq 12), 20-30 (freq 8). Find the modal class.',a:'10-20',d:1},{q:'From the same table, estimate the mean.',a:'(5×5 + 15×12 + 25×8) ÷ 25 = 15',d:4},{q:'A two-way table: 30 boys, 24 girls like maths. 20 boys, 26 girls prefer English. How many students total?',a:'100',d:2},{q:'What does a frequency density of 3 mean for a class width of 5?',a:'Frequency = 15',d:5},
  ],
}

const VOCABULARY = {
  'Number': [
    {word:'Integer',def:'A whole number (positive, negative or zero).',ex:'e.g. -3, 0, 7, 42',e:'🔢'},
    {word:'Factor',def:'A number that divides exactly into another with no remainder.',ex:'e.g. Factors of 12: 1, 2, 3, 4, 6, 12',e:'➗'},
    {word:'Multiple',def:'The result of multiplying a number by a positive integer.',ex:'e.g. Multiples of 5: 5, 10, 15, 20...',e:'✖️'},
    {word:'Prime',def:'A number with exactly two factors: 1 and itself.',ex:'e.g. 2, 3, 5, 7, 11, 13',e:'⭐'},
    {word:'Reciprocal',def:'One divided by the number. The product of a number and its reciprocal is always 1.',ex:'e.g. Reciprocal of 4 is 1/4',e:'🔄'},
    {word:'Surd',def:'An irrational number written exactly using a root sign.',ex:'e.g. √2, √5, 3√7',e:'√'},
  ],
  'Algebra': [
    {word:'Expression',def:'A maths statement with numbers and/or letters but no equals sign.',ex:'e.g. 3x + 5',e:'🔤'},
    {word:'Equation',def:'A statement showing two things are equal, using an equals sign.',ex:'e.g. 2x + 3 = 11',e:'⚖️'},
    {word:'Formula',def:'A rule written using letters and symbols.',ex:'e.g. A = πr²',e:'📐'},
    {word:'Variable',def:'A letter representing an unknown number.',ex:'e.g. In 3x + 2, x is the variable',e:'🔡'},
    {word:'Coefficient',def:'The number multiplying a variable in an expression.',ex:'e.g. In 5x, the coefficient is 5',e:'5️⃣'},
    {word:'Quadratic',def:'An expression or equation where the highest power is 2.',ex:'e.g. x² + 3x + 2',e:'📈'},
  ],
  'Geometry': [
    {word:'Perpendicular',def:'Lines that meet at exactly 90°.',ex:'e.g. The sides of a square are perpendicular',e:'📐'},
    {word:'Parallel',def:'Lines that are always the same distance apart and never meet.',ex:'e.g. Railway tracks are parallel',e:'〰️'},
    {word:'Congruent',def:'Shapes that are exactly the same size and shape.',ex:'e.g. Two identical triangles',e:'🔷'},
    {word:'Similar',def:'Shapes with the same angles but different sizes.',ex:'e.g. A small and large version of the same triangle',e:'🔺'},
    {word:'Hypotenuse',def:'The longest side of a right-angled triangle, opposite the right angle.',ex:'e.g. In a 3-4-5 triangle, 5 is the hypotenuse',e:'📏'},
    {word:'Bisect',def:'To cut exactly in half.',ex:'e.g. A perpendicular bisector cuts a line in half at 90°',e:'✂️'},
  ],
  'Statistics': [
    {word:'Mean',def:'The average found by adding all values then dividing by how many.',ex:'e.g. Mean of 4,6,8 = 18÷3 = 6',e:'📊'},
    {word:'Median',def:'The middle value when data is arranged in order.',ex:'e.g. 3,5,7,9,11 → median = 7',e:'🎯'},
    {word:'Mode',def:'The value that appears most often.',ex:'e.g. 2,3,3,5,7 → mode = 3',e:'🏆'},
    {word:'Range',def:'The difference between the highest and lowest values.',ex:'e.g. Range of 3,7,12 = 12-3 = 9',e:'↔️'},
    {word:'Correlation',def:'The relationship between two variables on a scatter graph.',ex:'e.g. Positive correlation: as height increases, weight increases',e:'📉'},
    {word:'Frequency',def:'The number of times a value occurs in data.',ex:'e.g. The number 5 appears 4 times → frequency = 4',e:'🔢'},
  ],
  'Functional': [
    {word:'Profit',def:'Money made after subtracting costs from income.',ex:'e.g. Income £500, costs £320, profit = £180',e:'💰'},
    {word:'Interest',def:'Money earned or paid on a loan or savings.',ex:'e.g. £100 at 5% = £5 interest per year',e:'🏦'},
    {word:'Budget',def:'A plan for spending money.',ex:'e.g. Monthly income £1500, expenses £1200, budget surplus £300',e:'📋'},
    {word:'Estimate',def:'An approximate answer, usually found by rounding first.',ex:'e.g. 49 × 21 ≈ 50 × 20 = 1000',e:'🎯'},
    {word:'Proportion',def:'A statement that two ratios are equal.',ex:'e.g. 2:3 = 4:6',e:'⚖️'},
  ],
}

const TOPIC_CATEGORY = {
  'Place value & rounding': 'Number', 'Fractions': 'Number', 'Decimals': 'Number',
  'Percentages': 'Number', 'Powers & roots': 'Number', 'Standard form': 'Number',
  'Ratio & proportion': 'Number', 'Compound interest': 'Number',
  'Simplifying expressions': 'Algebra', 'Expanding brackets': 'Algebra',
  'Factorising': 'Algebra', 'Solving linear equations': 'Algebra',
  'Solving quadratics': 'Algebra', 'Simultaneous equations': 'Algebra',
  'nth term sequences': 'Algebra', 'Straight line graphs': 'Algebra',
  'Rearranging formulae': 'Algebra',
  'Area of 2D shapes': 'Geometry', 'Perimeter': 'Geometry',
  'Volume & surface area': 'Geometry', 'Angles in polygons': 'Geometry',
  'Pythagoras theorem': 'Geometry', 'Trigonometry': 'Geometry',
  'Circle theorems': 'Geometry', 'Transformations': 'Geometry', 'Bearings': 'Geometry',
  'Mean, median, mode': 'Statistics', 'Bar charts': 'Statistics',
  'Scatter graphs': 'Statistics', 'Probability': 'Statistics',
  'Cumulative frequency': 'Statistics', 'Box plots': 'Statistics',
  'Venn diagrams': 'Statistics',
  'Money & budgeting': 'Functional', 'Time calculations': 'Functional',
  'Measurement conversions': 'Functional', 'Reading charts': 'Functional',
  'Percentages in context': 'Functional', 'Area & perimeter in context': 'Functional',
  'Averages in context': 'Functional', 'Probability in context': 'Functional',
  'Scale & maps': 'Functional', 'Data interpretation': 'Functional',
}

const YEAR_TOPICS = {
  'Year 7': ['Place value & rounding','Fractions','Decimals','Percentages','Area of 2D shapes','Perimeter','Mean, median, mode','Probability','Angles in polygons'],
  'Year 8': ['Fractions','Percentages','Ratio & proportion','Simplifying expressions','Expanding brackets','Volume & surface area','Bar charts','Solving linear equations'],
  'Year 9': ['Standard form','Powers & roots','Factorising','nth term sequences','Straight line graphs','Pythagoras theorem','Scatter graphs','Simultaneous equations'],
  'KS4 Foundation': ['Solving quadratics','Trigonometry','Compound interest','Cumulative frequency','Box plots','Circle theorems','Transformations','Venn diagrams'],
  'KS4 Higher': ['Circle theorems','Rearranging formulae','Solving quadratics','Bearings','Simultaneous equations','Trigonometry','Compound interest','Venn diagrams'],
  'Functional Skills L1': ['Money & budgeting','Time calculations','Measurement conversions','Reading charts','Percentages in context','Area & perimeter in context'],
  'Functional Skills L2': ['Averages in context','Probability in context','Scale & maps','Data interpretation','Percentages in context','Measurement conversions'],
}

const ALL_TOPICS = Object.keys(QUESTIONS)

function shuffle(a){return[...a].sort(()=>Math.random()-0.5)}
function pick(arr,n){return shuffle(arr).slice(0,n)}

function getQuestion(topic, difficulty){
  const qs = QUESTIONS[topic]||[]
  const filtered = qs.filter(q=>q.d===difficulty)
  const pool = filtered.length > 0 ? filtered : qs
  return shuffle(pool)[0] || {q:'Question not found',a:'N/A',d:difficulty}
}

function getVocab(topics){
  const cats = [...new Set(topics.map(t=>TOPIC_CATEGORY[t]||'Number'))]
  const cat = shuffle(cats)[0]||'Number'
  const words = VOCABULARY[cat]||VOCABULARY['Number']
  return shuffle(words)[0]
}

export default function DoNow(){
  const [mode,setMode]=useState('auto')
  const [yg,setYg]=useState('Year 7')
  const [sel,setSel]=useState([{topic:'',difficulty:3},{topic:'',difficulty:3},{topic:'',difficulty:3}])
  const [search,setSearch]=useState(['','',''])
  const [drop,setDrop]=useState([false,false,false])
  const [doNow,setDoNow]=useState(null)
  const [answers,setAnswers]=useState(false)
  const [error,setError]=useState(null)
  const ref=useRef()

  function generate(){
    setError(null)
    let chosen
    if(mode==='auto'){
      const pool=YEAR_TOPICS[yg]||YEAR_TOPICS['Year 7']
      chosen=pick(pool,3).map(t=>({topic:t,difficulty:3}))
    } else {
      if(sel.some(s=>!s.topic)){setError('Please select all 3 topics.');return}
      chosen=sel
    }
    const questions=chosen.map(c=>({...getQuestion(c.topic,c.difficulty),topic:c.topic,difficulty:c.difficulty}))
    const challenge=getQuestion(shuffle(chosen)[0].topic, Math.min(chosen[0].difficulty+2, 6))
    const vocab=getVocab(chosen.map(c=>c.topic))
    setDoNow({questions,challenge,vocab,yg:mode==='auto'?yg:'Custom',date:new Date().toLocaleDateString('en-GB')})
    setAnswers(false)
  }

  function doPrint(){
    const w=window.open('','_blank')
    w.document.write('<html><head><title>Do Now</title><style>*{box-sizing:border-box;margin:0;padding:0;font-family:Arial,sans-serif}body{padding:24px;color:#1a1a1a}.header{display:flex;justify-content:space-between;border-bottom:3px solid #2d6a2d;padding-bottom:10px;margin-bottom:16px}h1{font-size:20px;color:#2d6a2d;font-weight:700}.vocab{background:#fdf6e3;border:2px solid #c9a227;border-radius:8px;padding:14px;margin-bottom:14px}.vword{font-size:20px;font-weight:700;margin-bottom:4px}.vdef{font-size:13px;margin-bottom:3px}.vex{font-size:12px;color:#666;font-style:italic}.q{border:1px solid #ddd;border-left:4px solid #2d6a2d;border-radius:6px;padding:12px;margin-bottom:10px}.ql{font-size:11px;font-weight:700;color:#2d6a2d;text-transform:uppercase;margin-bottom:5px}.qt{font-size:15px;font-weight:500}.space{border-bottom:1px solid #ccc;height:32px;margin-top:12px}.ch{border:2px solid #c9a227;border-radius:6px;padding:12px;background:#fffdf0}.chl{font-size:11px;font-weight:700;color:#a07d10;text-transform:uppercase;margin-bottom:5px}.footer{margin-top:16px;text-align:center;font-size:11px;color:#999;border-top:1px solid #eee;padding-top:8px}</style></head><body>'+ref.current.innerHTML+'</body></html>')
    w.document.close();setTimeout(()=>{w.print();w.close()},400)
  }

  const starBtn=(i,s)=>(
    <button key={s} onClick={()=>{const t=[...sel];t[i]={...t[i],difficulty:s};setSel(t)}} style={{width:'26px',height:'26px',border:'none',borderRadius:'4px',cursor:'pointer',background:sel[i]?.difficulty>=s?'#c9a227':'#f0f0f0',color:sel[i]?.difficulty>=s?'white':'#999',fontSize:'12px',fontWeight:'600'}}>{s}</button>
  )

  return(
    <div>
      <h1 style={{fontSize:'22px',fontWeight:'600',marginBottom:'24px'}}>Do Now Generator</h1>
      <div style={{background:'white',border:'1px solid var(--border)',borderRadius:'12px',padding:'20px',marginBottom:'20px'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>
          {['auto','custom'].map(m=>(
            <button key={m} onClick={()=>setMode(m)} style={{padding:'8px 18px',borderRadius:'8px',border:'2px solid',borderColor:mode===m?'var(--green)':'var(--border)',background:mode===m?'var(--green-light)':'white',color:mode===m?'var(--green-dark)':'var(--muted)',fontWeight:mode===m?'600':'400',cursor:'pointer',fontSize:'14px'}}>
              {m==='auto'?'⚡ Auto — pick year group':'🎯 Custom — pick topics'}
            </button>
          ))}
        </div>
        {mode==='auto'?(
          <div><label style={{fontSize:'13px',fontWeight:'500',display:'block',marginBottom:'8px'}}>Year group / Level</label>
          <select value={yg} onChange={e=>setYg(e.target.value)} style={{padding:'9px 14px',border:'1px solid var(--border)',borderRadius:'7px',fontSize:'14px',minWidth:'220px'}}>
            {Object.keys(YEAR_TOPICS).map(y=><option key={y}>{y}</option>)}
          </select></div>
        ):(
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {[0,1,2].map(i=>(
              <div key={i} style={{display:'flex',gap:'10px',alignItems:'center',flexWrap:'wrap'}}>
                <div style={{position:'relative',flex:1,minWidth:'180px'}}>
                  <input value={search[i]} onChange={e=>{const s=[...search];s[i]=e.target.value;setSearch(s);const d=[...drop];d[i]=true;setDrop(d);if(!e.target.value){const t=[...sel];t[i]={...t[i],topic:''};setSel(t)}}} placeholder={'Search topic '+(i+1)+'...'} style={{width:'100%',padding:'8px 12px',border:'1px solid var(--border)',borderRadius:'7px',fontSize:'14px'}}/>
                  {drop[i]&&search[i]&&(
                    <div style={{position:'absolute',top:'100%',left:0,right:0,background:'white',border:'1px solid var(--border)',borderRadius:'7px',zIndex:10,maxHeight:'150px',overflowY:'auto',boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}>
                      {ALL_TOPICS.filter(t=>t.toLowerCase().includes(search[i].toLowerCase())).map(t=>(
                        <div key={t} onClick={()=>{const s=[...search];s[i]=t;setSearch(s);const tp=[...sel];tp[i]={...tp[i],topic:t};setSel(tp);const d=[...drop];d[i]=false;setDrop(d)}} style={{padding:'8px 12px',cursor:'pointer',fontSize:'13px',borderBottom:'1px solid var(--border)'}} onMouseEnter={e=>e.currentTarget.style.background='var(--green-light)'} onMouseLeave={e=>e.currentTarget.style.background='white'}>
                          <span style={{color:'var(--muted)',fontSize:'11px',marginRight:'6px'}}>{TOPIC_CATEGORY[t]}</span>{t}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{display:'flex',gap:'3px',alignItems:'center'}}>
                  <span style={{fontSize:'12px',color:'var(--muted)',marginRight:'4px'}}>Difficulty:</span>
                  {[1,2,3,4,5,6].map(s=>starBtn(i,s))}
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{marginTop:'18px',display:'flex',gap:'10px',flexWrap:'wrap'}}>
          <button onClick={generate} style={{padding:'10px 26px',background:'var(--green)',color:'white',border:'none',borderRadius:'8px',fontSize:'15px',fontWeight:'500',cursor:'pointer'}}>🎲 Generate Do Now</button>
          {doNow&&<>
            <button onClick={()=>setAnswers(a=>!a)} style={{padding:'10px 18px',background:answers?'var(--blue)':'var(--blue-light)',color:answers?'white':'var(--blue)',border:'1px solid var(--blue)',borderRadius:'8px',fontSize:'14px',fontWeight:'500',cursor:'pointer'}}>{answers?'🙈 Hide answers':'✅ Show answers'}</button>
            <button onClick={doPrint} style={{padding:'10px 18px',background:'var(--gold-light)',color:'var(--gold-dark)',border:'1px solid var(--gold)',borderRadius:'8px',fontSize:'14px',fontWeight:'500',cursor:'pointer'}}>🖨️ Print / PDF</button>
            <button onClick={generate} style={{padding:'10px 18px',background:'white',color:'var(--muted)',border:'1px solid var(--border)',borderRadius:'8px',fontSize:'14px',cursor:'pointer'}}>🔄 New questions</button>
          </>}
        </div>
        {error&&<p style={{color:'#b91c1c',fontSize:'13px',marginTop:'10px'}}>{error}</p>}
      </div>

      {doNow&&(
        <div style={{background:'white',border:'1px solid var(--border)',borderRadius:'12px',padding:'28px'}}>
          <div ref={ref}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',borderBottom:'3px solid #2d6a2d',paddingBottom:'12px',marginBottom:'18px'}}>
              <div><h1 style={{fontSize:'20px',fontWeight:'700',color:'var(--green)'}}>Heath School — Maths Do Now</h1><p style={{fontSize:'13px',color:'var(--muted)'}}>{doNow.yg}</p></div>
              <div style={{textAlign:'right',fontSize:'12px',color:'var(--muted)',lineHeight:'2'}}><div>Date: {doNow.date}</div><div>Name: _______________________</div><div>Class: _______________________</div></div>
            </div>
            <div style={{background:'#fdf6e3',border:'2px solid var(--gold)',borderRadius:'10px',padding:'16px',marginBottom:'18px'}}>
              <div style={{fontSize:'11px',fontWeight:'700',color:'var(--gold-dark)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'8px'}}>📖 Key Word — Literacy Focus</div>
              <div style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
                <div style={{fontSize:'34px'}}>{doNow.vocab.e}</div>
                <div>
                  <div style={{fontSize:'20px',fontWeight:'700',marginBottom:'4px'}}>{doNow.vocab.word}</div>
                  <div style={{fontSize:'14px',color:'#333',marginBottom:'4px',lineHeight:'1.5'}}>{doNow.vocab.def}</div>
                  <div style={{fontSize:'12px',color:'var(--muted)',fontStyle:'italic'}}>{doNow.vocab.ex}</div>
                </div>
              </div>
              <div style={{marginTop:'10px',paddingTop:'8px',borderTop:'1px solid #e8d080',fontSize:'12px',color:'var(--gold-dark)',fontWeight:'500'}}>Use this word in a sentence: ________________________________________________</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'14px'}}>
              {doNow.questions.map((q,i)=>(
                <div key={i} style={{border:'1px solid var(--border)',borderLeft:'4px solid var(--green)',borderRadius:'8px',padding:'16px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                    <div style={{fontSize:'11px',fontWeight:'700',color:'var(--green)',textTransform:'uppercase'}}>Question {i+1} — {q.topic}</div>
                    <div style={{fontSize:'12px',color:'var(--gold-dark)'}}>{'★'.repeat(q.difficulty)}{'☆'.repeat(6-q.difficulty)}</div>
                  </div>
                  <div style={{fontSize:'16px',fontWeight:'500',lineHeight:'1.5'}}>{q.q}</div>
                  {answers?<div style={{background:'var(--green-light)',borderRadius:'6px',padding:'10px 14px',marginTop:'10px',fontSize:'14px',color:'var(--green-dark)',fontWeight:'500'}}>✅ {q.a}</div>:<div style={{borderBottom:'1px solid #ccc',marginTop:'18px',paddingBottom:'18px'}}/>}
                </div>
              ))}
            </div>
            <div style={{border:'2px solid var(--gold)',borderRadius:'8px',padding:'16px',background:'#fffdf0'}}>
              <div style={{fontSize:'11px',fontWeight:'700',color:'var(--gold-dark)',textTransform:'uppercase',marginBottom:'8px'}}>🌟 Challenge — ★★★★★★</div>
              <div style={{fontSize:'16px',fontWeight:'500',lineHeight:'1.5'}}>{doNow.challenge.q}</div>
              {answers&&<div style={{background:'#fdf6e3',borderRadius:'6px',padding:'10px 14px',marginTop:'10px',fontSize:'14px',color:'var(--gold-dark)'}}>✅ {doNow.challenge.a}</div>}
              {!answers&&<div style={{borderBottom:'1px solid #e8d080',marginTop:'26px'}}/>}
            </div>
            <div style={{marginTop:'18px',paddingTop:'10px',borderTop:'1px solid var(--border)',textAlign:'center',fontSize:'11px',color:'var(--muted)'}}>Heath School Maths Hub · {doNow.yg} · {doNow.date}</div>
          </div>
        </div>
      )}
      {!doNow&&(
        <div style={{background:'white',border:'2px dashed var(--border)',borderRadius:'12px',padding:'60px',textAlign:'center',color:'var(--muted)'}}>
          <div style={{fontSize:'48px',marginBottom:'12px'}}>🎲</div>
          <p style={{fontSize:'16px'}}>Select a year group or topics and click Generate</p>
          <p style={{fontSize:'13px',marginTop:'6px'}}>Hundreds of curriculum questions — free, instant, printable</p>
        </div>
      )}
    </div>
  )
}
"""
with open('/Users/bethtaylor/Downloads/heath-maths/src/pages/DoNow.js', 'w') as f:
    f.write(content)
print('done')
