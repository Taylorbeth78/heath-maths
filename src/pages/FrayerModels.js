import React, { useState, useRef } from 'react'
import { supabase } from '../lib/supabase'

const FRAYER_DATA = {
  'Integer': {
    definition: 'A whole number that can be positive, negative or zero. It has no decimal or fractional part.',
    characteristics: ['No decimal point', 'Can be negative', 'Zero is an integer', 'Includes all counting numbers'],
    examples: ['3', '-7', '0', '100', '-42'],
    nonExamples: ['3.5', '1/2', '0.1', 'pi'],
    exSvg: '<svg viewBox="0 0 200 60" width="200" height="60"><rect x="5" y="10" width="50" height="40" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="30" y="35" text-anchor="middle" font-size="18" font-weight="bold" fill="#2563eb">3</text><rect x="75" y="10" width="50" height="40" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="100" y="35" text-anchor="middle" font-size="18" font-weight="bold" fill="#2563eb">-7</text><rect x="145" y="10" width="50" height="40" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="170" y="35" text-anchor="middle" font-size="18" font-weight="bold" fill="#2563eb">0</text></svg>',
    nonSvg: '<svg viewBox="0 0 200 60" width="200" height="60"><rect x="5" y="10" width="55" height="40" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="32" y="35" text-anchor="middle" font-size="16" fill="#dc2626">3.5</text><rect x="75" y="10" width="55" height="40" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="102" y="35" text-anchor="middle" font-size="16" fill="#dc2626">1/2</text></svg>',
    category: 'Number'
  },
  'Prime': {
    definition: 'A number with exactly two factors: 1 and itself.',
    characteristics: ['Exactly 2 factors only', '2 is the only even prime', '1 is NOT prime', 'Primes: 2,3,5,7,11,13...'],
    examples: ['2', '3', '5', '7', '11', '13'],
    nonExamples: ['1 (only one factor)', '4 (factors: 1,2,4)', '9 (factors: 1,3,9)'],
    exSvg: '<svg viewBox="0 0 200 60" width="200" height="60"><circle cx="35" cy="30" r="25" fill="#ecfdf5" stroke="#059669" stroke-width="2"/><text x="35" y="36" text-anchor="middle" font-size="18" font-weight="bold" fill="#059669">2</text><circle cx="100" cy="30" r="25" fill="#ecfdf5" stroke="#059669" stroke-width="2"/><text x="100" y="36" text-anchor="middle" font-size="18" font-weight="bold" fill="#059669">7</text><circle cx="165" cy="30" r="25" fill="#ecfdf5" stroke="#059669" stroke-width="2"/><text x="165" y="36" text-anchor="middle" font-size="18" font-weight="bold" fill="#059669">13</text></svg>',
    nonSvg: '<svg viewBox="0 0 200 60" width="200" height="60"><circle cx="35" cy="30" r="25" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="35" y="36" text-anchor="middle" font-size="18" fill="#dc2626">1</text><circle cx="100" cy="30" r="25" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="100" y="36" text-anchor="middle" font-size="18" fill="#dc2626">4</text><circle cx="165" cy="30" r="25" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="165" y="36" text-anchor="middle" font-size="18" fill="#dc2626">9</text></svg>',
    category: 'Number'
  },
  'Parallel': {
    definition: 'Lines that are always the same distance apart and never meet, no matter how far they are extended.',
    characteristics: ['Never intersect', 'Always same distance apart', 'Same gradient', 'Shown with arrow marks'],
    examples: ['Railway tracks', 'Opposite sides of a rectangle', 'y=2x+1 and y=2x-3'],
    nonExamples: ['Intersecting roads', 'Lines with different gradients', 'Perpendicular lines'],
    exSvg: '<svg viewBox="0 0 200 70" width="200" height="70"><line x1="10" y1="22" x2="190" y2="22" stroke="#059669" stroke-width="3"/><line x1="10" y1="50" x2="190" y2="50" stroke="#059669" stroke-width="3"/><text x="100" y="12" text-anchor="middle" font-size="9" fill="#059669">always same distance apart</text></svg>',
    nonSvg: '<svg viewBox="0 0 200 70" width="200" height="70"><line x1="10" y1="65" x2="150" y2="10" stroke="#dc2626" stroke-width="3"/><line x1="50" y1="10" x2="180" y2="65" stroke="#dc2626" stroke-width="3"/><text x="100" y="68" text-anchor="middle" font-size="9" fill="#dc2626">they cross - NOT parallel</text></svg>',
    category: 'Geometry'
  },
  'Perpendicular': {
    definition: 'Lines that meet at exactly 90 degrees (a right angle).',
    characteristics: ['Meet at exactly 90 degrees', 'Shown with a small square', 'Gradients multiply to give -1', 'Can occur at any point'],
    examples: ['Sides of a square', 'x-axis and y-axis', 'The letter T shape'],
    nonExamples: ['Parallel lines (never meet)', 'Lines at 45 degrees', 'Lines at 120 degrees'],
    exSvg: '<svg viewBox="0 0 200 80" width="200" height="80"><line x1="100" y1="5" x2="100" y2="75" stroke="#059669" stroke-width="3"/><line x1="10" y1="40" x2="190" y2="40" stroke="#059669" stroke-width="3"/><rect x="100" y="40" width="12" height="12" fill="none" stroke="#059669" stroke-width="2"/><text x="120" y="28" font-size="11" fill="#059669">90 degrees</text></svg>',
    nonSvg: '<svg viewBox="0 0 200 70" width="200" height="70"><line x1="20" y1="65" x2="180" y2="10" stroke="#dc2626" stroke-width="3"/><line x1="10" y1="35" x2="190" y2="35" stroke="#dc2626" stroke-width="3"/><text x="100" y="68" text-anchor="middle" font-size="9" fill="#dc2626">not 90 degrees</text></svg>',
    category: 'Geometry'
  },
  'Congruent': {
    definition: 'Shapes that are exactly the same size and shape.',
    characteristics: ['Same size AND shape', 'Same angles', 'Same side lengths', 'May be rotated or reflected'],
    examples: ['Two identical triangles', 'Two squares of same size', 'Left and right gloves'],
    nonExamples: ['Similar shapes (different size)', 'A square and rectangle', 'Different angles'],
    exSvg: '<svg viewBox="0 0 200 70" width="200" height="70"><polygon points="10,65 50,10 90,65" fill="#ecfdf5" stroke="#059669" stroke-width="2"/><text x="100" y="40" text-anchor="middle" font-size="16" fill="#059669">=</text><polygon points="110,65 150,10 190,65" fill="#ecfdf5" stroke="#059669" stroke-width="2"/></svg>',
    nonSvg: '<svg viewBox="0 0 200 70" width="200" height="70"><polygon points="10,65 35,25 60,65" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><polygon points="80,65 130,10 180,65" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="100" y="68" text-anchor="middle" font-size="9" fill="#dc2626">same shape but different size</text></svg>',
    category: 'Geometry'
  },
  'Similar': {
    definition: 'Shapes with the same angles and proportions but different sizes.',
    characteristics: ['Same angles', 'Sides in same ratio', 'One is an enlargement of other', 'Different sizes'],
    examples: ['Photo and enlarged print', 'Map and real landscape', 'Nested triangles'],
    nonExamples: ['Congruent shapes (same size)', 'A square and a rectangle', 'Different angles'],
    exSvg: '<svg viewBox="0 0 200 70" width="200" height="70"><polygon points="10,65 30,30 50,65" fill="#f5f3ff" stroke="#7c3aed" stroke-width="2"/><polygon points="70,65 110,10 150,65" fill="#f5f3ff" stroke="#7c3aed" stroke-width="2"/><text x="100" y="68" text-anchor="middle" font-size="9" fill="#7c3aed">same shape, bigger - SIMILAR</text></svg>',
    nonSvg: '<svg viewBox="0 0 200 70" width="200" height="70"><rect x="10" y="20" width="60" height="40" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><polygon points="100,60 140,10 180,60" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="100" y="68" text-anchor="middle" font-size="9" fill="#dc2626">different shape - NOT similar</text></svg>',
    category: 'Geometry'
  },
  'Hypotenuse': {
    definition: 'The longest side of a right-angled triangle, always opposite the right angle.',
    characteristics: ['Longest side', 'Opposite the right angle', 'Found using Pythagoras theorem', 'Only in right-angled triangles'],
    examples: ['The slanted side of a ramp', '5 in a 3-4-5 triangle', 'Diagonal of a rectangle'],
    nonExamples: ['The two shorter sides (legs)', 'Any side of non-right triangle', 'The side next to the right angle'],
    exSvg: '<svg viewBox="0 0 200 80" width="200" height="80"><polygon points="10,75 10,15 130,75" fill="#ecfdf5" stroke="#059669" stroke-width="2"/><rect x="10" y="65" width="10" height="10" fill="none" stroke="#059669" stroke-width="1.5"/><text x="75" y="30" font-size="11" fill="#059669" font-weight="bold">hypotenuse</text></svg>',
    nonSvg: '<svg viewBox="0 0 200 80" width="200" height="80"><polygon points="10,75 10,15 130,75" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><rect x="10" y="65" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.5"/><line x1="10" y1="15" x2="10" y2="75" stroke="#dc2626" stroke-width="3"/><text x="0" y="50" font-size="9" fill="#dc2626">this is a LEG</text></svg>',
    category: 'Geometry'
  },
  'Mean': {
    definition: 'The average found by adding all values and dividing by how many there are.',
    characteristics: ['Add all values then divide by count', 'Affected by outliers', 'May not be a whole number', 'Most common average'],
    examples: ['Mean of 2,4,6 = 12/3 = 4', 'Mean of 10,20,30 = 20', 'Average class score'],
    nonExamples: ['Median (middle value)', 'Mode (most common)', 'Range (spread)'],
    exSvg: '<svg viewBox="0 0 200 60" width="200" height="60"><rect x="5" y="10" width="185" height="40" rx="6" fill="#fffbeb" stroke="#d97706" stroke-width="2"/><text x="100" y="28" text-anchor="middle" font-size="12" fill="#d97706">2 + 4 + 6 = 12</text><text x="100" y="46" text-anchor="middle" font-size="12" fill="#d97706">12 divided by 3 = 4 (mean)</text></svg>',
    nonSvg: '<svg viewBox="0 0 200 60" width="200" height="60"><rect x="5" y="10" width="85" height="40" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="47" y="35" text-anchor="middle" font-size="13" fill="#dc2626">Median</text><rect x="110" y="10" width="85" height="40" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="152" y="35" text-anchor="middle" font-size="13" fill="#dc2626">Mode</text></svg>',
    category: 'Statistics'
  },
  'Median': {
    definition: 'The middle value when data is arranged in order from smallest to largest.',
    characteristics: ['Must order data first', 'Not affected by outliers', 'Average middle two if even count', 'Splits data in half'],
    examples: ['1,3,5,7,9 median = 5', '2,4,6,8 median = 5', 'Middle salary in a company'],
    nonExamples: ['Mean (uses all values)', 'Mode (most frequent)', 'Middle of unordered data'],
    exSvg: '<svg viewBox="0 0 200 60" width="200" height="60"><text x="100" y="22" text-anchor="middle" font-size="15" fill="#059669">1   3   5   7   9</text><rect x="82" y="5" width="36" height="24" rx="4" fill="none" stroke="#059669" stroke-width="2"/><text x="100" y="50" text-anchor="middle" font-size="11" fill="#059669">middle value = 5</text></svg>',
    nonSvg: '<svg viewBox="0 0 200 60" width="200" height="60"><text x="100" y="22" text-anchor="middle" font-size="15" fill="#dc2626">9   1   7   3   5</text><text x="100" y="50" text-anchor="middle" font-size="11" fill="#dc2626">NOT ordered - cannot find median!</text></svg>',
    category: 'Statistics'
  },
  'Mode': {
    definition: 'The value that appears most often in a data set.',
    characteristics: ['Most frequent value', 'Can have more than one mode', 'Can have no mode', 'Works with non-numerical data'],
    examples: ['In 2,3,3,5,7 mode is 3', 'In 1,1,2,2 modes are 1 and 2', 'Most popular shoe size'],
    nonExamples: ['Mean (calculated average)', 'Median (middle value)', 'Range (spread)'],
    exSvg: '<svg viewBox="0 0 200 60" width="200" height="60"><text x="100" y="22" text-anchor="middle" font-size="14" fill="#d97706">2   3   3   5   7</text><rect x="78" y="6" width="44" height="22" rx="4" fill="none" stroke="#d97706" stroke-width="2"/><text x="100" y="50" text-anchor="middle" font-size="11" fill="#d97706">3 appears twice - mode is 3</text></svg>',
    nonSvg: '<svg viewBox="0 0 200 60" width="200" height="60"><text x="100" y="22" text-anchor="middle" font-size="14" fill="#dc2626">1   2   3   4   5</text><text x="100" y="50" text-anchor="middle" font-size="11" fill="#dc2626">all appear once - NO mode</text></svg>',
    category: 'Statistics'
  },
  'Correlation': {
    definition: 'The relationship between two variables on a scatter graph.',
    characteristics: ['Shown on scatter graphs', 'Positive, negative or no correlation', 'Does not prove causation', 'Stronger when closer to line'],
    examples: ['Height vs weight (positive)', 'Car age vs value (negative)', 'Revision vs score (positive)'],
    nonExamples: ['A bar chart (one variable)', 'A pie chart', 'Causation'],
    exSvg: '<svg viewBox="0 0 200 70" width="200" height="70"><line x1="10" y1="60" x2="190" y2="10" stroke="#059669" stroke-width="1" stroke-dasharray="5"/><circle cx="20" cy="58" r="3" fill="#059669"/><circle cx="55" cy="46" r="3" fill="#059669"/><circle cx="90" cy="34" r="3" fill="#059669"/><circle cx="125" cy="24" r="3" fill="#059669"/><circle cx="160" cy="14" r="3" fill="#059669"/><text x="100" y="68" text-anchor="middle" font-size="9" fill="#059669">positive correlation</text></svg>',
    nonSvg: '<svg viewBox="0 0 200 70" width="200" height="70"><circle cx="30" cy="15" r="3" fill="#dc2626"/><circle cx="60" cy="55" r="3" fill="#dc2626"/><circle cx="90" cy="25" r="3" fill="#dc2626"/><circle cx="120" cy="50" r="3" fill="#dc2626"/><circle cx="150" cy="10" r="3" fill="#dc2626"/><circle cx="180" cy="40" r="3" fill="#dc2626"/><text x="100" y="68" text-anchor="middle" font-size="9" fill="#dc2626">no correlation - scattered randomly</text></svg>',
    category: 'Statistics'
  },
  'Probability': {
    definition: 'A measure of how likely an event is to happen. Always between 0 and 1.',
    characteristics: ['Always between 0 and 1', '0 = impossible', '1 = certain', 'P(A) + P(not A) = 1'],
    examples: ['P(heads) = 1/2', 'P(roll a 6) = 1/6', 'P(pick red card) = 1/2'],
    nonExamples: ['P = 1.5 (impossible)', 'P = -0.2 (impossible)', 'Over 100%'],
    exSvg: '<svg viewBox="0 0 200 70" width="200" height="70"><line x1="10" y1="40" x2="190" y2="40" stroke="#059669" stroke-width="3"/><circle cx="10" cy="40" r="6" fill="#dc2626"/><circle cx="190" cy="40" r="6" fill="#059669"/><circle cx="100" cy="40" r="6" fill="#d97706"/><text x="5" y="60" font-size="8" fill="#dc2626">0 impossible</text><text x="72" y="60" font-size="8" fill="#d97706">0.5 evens</text><text x="158" y="60" font-size="8" fill="#059669">1 certain</text></svg>',
    nonSvg: '<svg viewBox="0 0 200 60" width="200" height="60"><rect x="5" y="10" width="85" height="40" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="47" y="35" text-anchor="middle" font-size="14" fill="#dc2626">P = 1.5</text><rect x="110" y="10" width="85" height="40" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="152" y="35" text-anchor="middle" font-size="14" fill="#dc2626">P = -0.3</text></svg>',
    category: 'Statistics'
  },
  'Gradient': {
    definition: 'The steepness of a line. Calculated as rise divided by run.',
    characteristics: ['Rise divided by run', 'Positive = slopes upward', 'Negative = slopes downward', 'Zero = horizontal line'],
    examples: ['y=3x+2 has gradient 3', 'A ramp going uphill', 'A ski slope'],
    nonExamples: ['The y-intercept', 'A flat line (gradient=0)', 'Length of a line'],
    exSvg: '<svg viewBox="0 0 200 80" width="200" height="80"><line x1="10" y1="70" x2="190" y2="10" stroke="#7c3aed" stroke-width="3"/><line x1="10" y1="70" x2="100" y2="70" stroke="#7c3aed" stroke-width="1" stroke-dasharray="4"/><line x1="100" y1="70" x2="100" y2="37" stroke="#7c3aed" stroke-width="1" stroke-dasharray="4"/><text x="55" y="79" font-size="10" fill="#7c3aed">run</text><text x="105" y="55" font-size="10" fill="#7c3aed">rise</text></svg>',
    nonSvg: '<svg viewBox="0 0 200 60" width="200" height="60"><line x1="10" y1="30" x2="190" y2="30" stroke="#dc2626" stroke-width="3"/><text x="100" y="20" text-anchor="middle" font-size="11" fill="#dc2626">flat line - gradient = 0</text><text x="100" y="50" text-anchor="middle" font-size="10" fill="#dc2626">NOT the same as y-intercept</text></svg>',
    category: 'Algebra'
  },
  'Equation': {
    definition: 'A mathematical statement showing two expressions are equal, using an equals sign.',
    characteristics: ['Must have an equals sign', 'Can be solved for unknowns', 'Both sides balance', 'Can have one or more unknowns'],
    examples: ['2x + 3 = 11', 'x squared - 4 = 0', 'y = 3x + 2'],
    nonExamples: ['3x + 5 (expression - no equals)', '3x > 10 (inequality)', 'x + y (just an expression)'],
    exSvg: '<svg viewBox="0 0 200 70" width="200" height="70"><rect x="5" y="15" width="70" height="40" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="40" y="40" text-anchor="middle" font-size="15" fill="#2563eb">2x+3</text><text x="100" y="42" text-anchor="middle" font-size="22" fill="#2563eb">=</text><rect x="125" y="15" width="70" height="40" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="160" y="40" text-anchor="middle" font-size="15" fill="#2563eb">11</text></svg>',
    nonSvg: '<svg viewBox="0 0 200 60" width="200" height="60"><rect x="30" y="10" width="140" height="40" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="100" y="35" text-anchor="middle" font-size="16" fill="#dc2626">3x + 5</text><text x="100" y="58" text-anchor="middle" font-size="10" fill="#dc2626">no equals sign = just expression</text></svg>',
    category: 'Algebra'
  },
  'Quadratic': {
    definition: 'An expression where the highest power is 2. Its graph is a U-shaped parabola.',
    characteristics: ['Highest power is x squared', 'Graph is a parabola', 'Can have 0, 1 or 2 solutions', 'Form: ax squared + bx + c'],
    examples: ['x squared + 3x + 2', '2x squared - 5 = 0', 'y = x squared'],
    nonExamples: ['3x + 2 (linear)', 'x cubed (cubic)', '5 (constant)'],
    exSvg: '<svg viewBox="0 0 200 80" width="200" height="80"><polyline points="10,75 40,35 70,12 100,5 130,12 160,35 190,75" fill="none" stroke="#7c3aed" stroke-width="3"/><text x="100" y="78" text-anchor="middle" font-size="10" fill="#7c3aed">y = x squared - parabola</text></svg>',
    nonSvg: '<svg viewBox="0 0 200 70" width="200" height="70"><line x1="10" y1="60" x2="190" y2="10" stroke="#dc2626" stroke-width="3"/><text x="100" y="68" text-anchor="middle" font-size="10" fill="#dc2626">y = 3x + 2 - straight line (linear)</text></svg>',
    category: 'Algebra'
  },
  'Surd': {
    definition: 'An irrational number in exact form using a root sign. Cannot be written exactly as a decimal.',
    characteristics: ['Cannot simplify to whole number', 'Written with root sign', 'Gives exact value', 'Examples: root 2, root 3'],
    examples: ['root 2', 'root 3', '5 root 2', '3 + root 7'],
    nonExamples: ['root 4 = 2 (simplifies)', 'root 9 = 3 (simplifies)', '0.5 (exact decimal)'],
    exSvg: '<svg viewBox="0 0 200 60" width="200" height="60"><rect x="5" y="10" width="85" height="40" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="47" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#2563eb">root 2</text><rect x="110" y="10" width="85" height="40" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="152" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="#2563eb">root 5</text></svg>',
    nonSvg: '<svg viewBox="0 0 200 60" width="200" height="60"><rect x="5" y="10" width="85" height="40" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="47" y="35" text-anchor="middle" font-size="13" fill="#dc2626">root 4 = 2</text><rect x="110" y="10" width="85" height="40" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="152" y="35" text-anchor="middle" font-size="13" fill="#dc2626">root 9 = 3</text></svg>',
    category: 'Number'
  },
  'Vector': {
    definition: 'A quantity with both size (magnitude) and direction. Written as a column of two numbers or shown as an arrow.',
    characteristics: ['Has magnitude AND direction', 'Written as column vector', 'Arrow shows direction', 'Can be added and subtracted'],
    examples: ['Column (3,4)', 'Velocity 50mph north', 'Displacement A to B'],
    nonExamples: ['Speed (no direction)', 'Temperature (scalar)', 'Mass 5kg (scalar)'],
    exSvg: '<svg viewBox="0 0 200 70" width="200" height="70"><defs><marker id="arr3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#7c3aed"/></marker></defs><line x1="20" y1="60" x2="160" y2="15" stroke="#7c3aed" stroke-width="3" marker-end="url(#arr3)"/><text x="90" y="55" font-size="10" fill="#7c3aed">magnitude + direction</text></svg>',
    nonSvg: '<svg viewBox="0 0 200 60" width="200" height="60"><rect x="5" y="10" width="85" height="40" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="47" y="30" text-anchor="middle" font-size="12" fill="#dc2626">50 mph</text><text x="47" y="46" text-anchor="middle" font-size="9" fill="#dc2626">speed - no direction!</text><rect x="110" y="10" width="85" height="40" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><text x="152" y="30" text-anchor="middle" font-size="12" fill="#dc2626">5 kg</text><text x="152" y="46" text-anchor="middle" font-size="9" fill="#dc2626">mass - scalar only</text></svg>',
    category: 'Geometry'
  },
}

const CATEGORIES = ['All', 'Number', 'Algebra', 'Geometry', 'Statistics', 'Functional', 'Higher']

const CAT_COLORS = {
  'Number':    { bg: '#2563eb', light: '#eff6ff', border: '#93c5fd' },
  'Algebra':   { bg: '#7c3aed', light: '#f5f3ff', border: '#c4b5fd' },
  'Geometry':  { bg: '#059669', light: '#ecfdf5', border: '#6ee7b7' },
  'Statistics':{ bg: '#d97706', light: '#fffbeb', border: '#fcd34d' },
  'Functional':{ bg: '#db2777', light: '#fdf2f8', border: '#f9a8d4' },
  'Higher':    { bg: '#4f46e5', light: '#eef2ff', border: '#a5b4fc' },
}

export default function FrayerModels() {
  const [search, setSearch] = React.useState('')
  const [category, setCategory] = React.useState('All')
  const [selected, setSelected] = React.useState(null)
  const [dbFrayerData, setDbFrayerData] = React.useState({})
  const [loadStatus, setLoadStatus] = React.useState('Loading from database...')

  React.useEffect(() => {
    supabase.from('vocabulary').select('*').then(({data, error}) => {
      if (error) { setLoadStatus('ERROR: ' + error.message); return }
      if (!data) { setLoadStatus('ERROR: no data returned'); return }
      const loaded = {}
      data.forEach(row => {
        if (row.characteristics && row.characteristics.length > 0) {
          loaded[row.word] = {
            definition: row.definition,
            characteristics: row.characteristics,
            examples: row.examples || [],
            nonExamples: row.non_examples || [],
            exSvg: row.ex_svg || '',
            nonSvg: row.non_svg || '',
            category: row.category
          }
        }
      })
      setDbFrayerData(loaded)
      setLoadStatus('Loaded ' + Object.keys(loaded).length + ' words from database (of ' + data.length + ' total rows fetched)')
    })
  }, [])

  const allFrayerData = { ...FRAYER_DATA, ...dbFrayerData }

  const filtered = Object.entries(allFrayerData).filter(([word, data]) => {
    const matchCat = category === 'All' || data.category === category
    const matchSearch = word.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  function doPrint() {
    if (!selected) return
    const data = allFrayerData[selected]
    const col = CAT_COLORS[data.category] || CAT_COLORS['Number']
    const w = window.open('', '_blank')
    w.document.write('<html><head><title>Frayer Model - ' + selected + '</title><style>@page{size:A4 landscape;margin:15px}*{box-sizing:border-box;margin:0;padding:0;font-family:Arial,sans-serif}body{padding:15px;color:#1a1a1a}.top{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid ' + col.bg + ';padding-bottom:8px;margin-bottom:12px}.title{font-size:16px;font-weight:700;color:' + col.bg + '}.word-box{text-align:center;padding:10px;background:' + col.light + ';border:3px solid ' + col.bg + ';border-radius:10px;margin-bottom:12px}.word{font-size:30px;font-weight:700;color:' + col.bg + '}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.box{border:2px solid ' + col.border + ';border-radius:8px;padding:12px}.box-red{border:2px solid #fca5a5;border-radius:8px;padding:12px;background:#fef2f2}.box-title{font-size:11px;font-weight:700;color:' + col.bg + ';text-transform:uppercase;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid ' + col.border + '}.box-title-red{font-size:11px;font-weight:700;color:#dc2626;text-transform:uppercase;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid #fca5a5}.content{font-size:13px;line-height:1.6}li{margin-left:16px;margin-bottom:2px}.footer{margin-top:10px;text-align:center;font-size:10px;color:#999;border-top:1px solid #eee;padding-top:6px}</style></head><body><div class="top"><div class="title">Heath School - Maths Frayer Model</div><div style="font-size:11px;color:#666">' + new Date().toLocaleDateString('en-GB') + '</div></div><div class="word-box"><div class="word">' + selected + '</div><div style="font-size:12px;color:#666;margin-top:3px">' + data.category + '</div></div><div class="grid"><div class="box"><div class="box-title">Definition</div><div class="content">' + data.definition + '</div></div><div class="box"><div class="box-title">Characteristics</div><div class="content"><ul>' + data.characteristics.map(function(c){return '<li>'+c+'</li>'}).join('') + '</ul></div></div><div class="box"><div class="box-title">Examples</div>' + data.exSvg + '<div class="content" style="margin-top:6px"><ul>' + data.examples.map(function(e){return '<li>'+e+'</li>'}).join('') + '</ul></div></div><div class="box-red"><div class="box-title-red">Non-Examples</div>' + data.nonSvg + '<div class="content" style="margin-top:6px"><ul>' + data.nonExamples.map(function(e){return '<li>'+e+'</li>'}).join('') + '</ul></div></div></div><div class="footer">Heath School Maths Hub - Frayer Model - ' + selected + '</div></body></html>')
    w.document.close()
    setTimeout(function(){ w.print(); w.close() }, 400)
  }

  return (
    React.createElement('div', null,
      React.createElement('h1', {style:{fontSize:'22px',fontWeight:'600',marginBottom:'6px'}}, 'Frayer Models'),
      React.createElement('p', {style:{fontSize:'13px',color:'var(--muted)',marginBottom:'6px'}}, 'Visual vocabulary cards for GCSE Maths keywords'),
      React.createElement('p', {style:{fontSize:'12px',color:loadStatus.startsWith('ERROR')?'#dc2626':'#059669',marginBottom:'20px',fontFamily:'monospace'}}, loadStatus),
      React.createElement('div', {style:{background:'white',border:'1px solid var(--border)',borderRadius:'12px',padding:'20px',marginBottom:'20px'}},
        React.createElement('div', {style:{display:'flex',gap:'10px',flexWrap:'wrap',marginBottom:'16px'}},
          React.createElement('input', {value:search, onChange:function(e){setSearch(e.target.value)}, placeholder:'Search keywords...', style:{flex:1,minWidth:'200px',padding:'9px 14px',border:'1px solid var(--border)',borderRadius:'7px',fontSize:'14px'}}),
          CATEGORIES.map(function(c){ return React.createElement('button', {key:c, onClick:function(){setCategory(c)}, style:{padding:'8px 16px',borderRadius:'8px',border:'2px solid',borderColor:category===c?'var(--green)':'var(--border)',background:category===c?'var(--green-light)':'white',color:category===c?'var(--green-dark)':'var(--muted)',fontWeight:category===c?'600':'400',cursor:'pointer',fontSize:'13px'}}, c) })
        ),
        React.createElement('div', {style:{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))',gap:'8px'}},
          filtered.map(function(entry){
            var word = entry[0]; var data = entry[1];
            var col = CAT_COLORS[data.category] || CAT_COLORS['Number'];
            return React.createElement('button', {key:word, onClick:function(){setSelected(word)}, style:{padding:'10px',borderRadius:'8px',border:'2px solid '+(selected===word?col.bg:col.border),background:selected===word?col.bg:col.light,color:selected===word?'white':col.bg,fontWeight:'600',cursor:'pointer',fontSize:'13px',textAlign:'center'}}, word)
          })
        )
      ),
      selected && allFrayerData[selected] ? (function(){
        var data = allFrayerData[selected];
        var col = CAT_COLORS[data.category] || CAT_COLORS['Number'];
        return React.createElement('div', {style:{background:'white',border:'1px solid var(--border)',borderRadius:'12px',padding:'24px'}},
          React.createElement('div', {style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}},
            React.createElement('div', null,
              React.createElement('h2', {style:{fontSize:'28px',fontWeight:'700',color:col.bg}}, selected),
              React.createElement('span', {style:{fontSize:'12px',background:col.light,color:col.bg,padding:'3px 10px',borderRadius:'20px',fontWeight:'600'}}, data.category)
            ),
            React.createElement('button', {onClick:doPrint, style:{padding:'10px 20px',background:'var(--gold-light)',color:'var(--gold-dark)',border:'1px solid var(--gold)',borderRadius:'8px',fontSize:'14px',fontWeight:'500',cursor:'pointer'}}, 'Print Frayer Model')
          ),
          React.createElement('div', {style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}},
            React.createElement('div', {style:{border:'2px solid '+col.border,borderRadius:'10px',padding:'16px',background:col.light}},
              React.createElement('div', {style:{fontSize:'11px',fontWeight:'700',color:col.bg,textTransform:'uppercase',marginBottom:'8px'}}, 'Definition'),
              React.createElement('div', {style:{fontSize:'15px',lineHeight:'1.6'}}, data.definition)
            ),
            React.createElement('div', {style:{border:'2px solid '+col.border,borderRadius:'10px',padding:'16px'}},
              React.createElement('div', {style:{fontSize:'11px',fontWeight:'700',color:col.bg,textTransform:'uppercase',marginBottom:'8px'}}, 'Characteristics'),
              React.createElement('ul', {style:{paddingLeft:'18px',fontSize:'14px',lineHeight:'2'}},
                data.characteristics.map(function(c,i){ return React.createElement('li', {key:i}, c) })
              )
            ),
            React.createElement('div', {style:{border:'2px solid '+col.border,borderRadius:'10px',padding:'16px'}},
              React.createElement('div', {style:{fontSize:'11px',fontWeight:'700',color:col.bg,textTransform:'uppercase',marginBottom:'8px'}}, 'Examples'),
              React.createElement('div', {dangerouslySetInnerHTML:{__html:data.exSvg}}),
              React.createElement('ul', {style:{paddingLeft:'18px',fontSize:'14px',lineHeight:'2',marginTop:'8px'}},
                data.examples.map(function(e,i){ return React.createElement('li', {key:i}, e) })
              )
            ),
            React.createElement('div', {style:{border:'2px solid #fca5a5',borderRadius:'10px',padding:'16px',background:'#fef2f2'}},
              React.createElement('div', {style:{fontSize:'11px',fontWeight:'700',color:'#dc2626',textTransform:'uppercase',marginBottom:'8px'}}, 'Non-Examples'),
              React.createElement('div', {dangerouslySetInnerHTML:{__html:data.nonSvg}}),
              React.createElement('ul', {style:{paddingLeft:'18px',fontSize:'14px',lineHeight:'2',marginTop:'8px'}},
                data.nonExamples.map(function(e,i){ return React.createElement('li', {key:i}, e) })
              )
            )
          )
        )
      })() : React.createElement('div', {style:{background:'white',border:'2px dashed var(--border)',borderRadius:'12px',padding:'60px',textAlign:'center',color:'var(--muted)'}},
        React.createElement('div', {style:{fontSize:'48px',marginBottom:'12px'}}, 'book'),
        React.createElement('p', {style:{fontSize:'16px'}}, 'Select a keyword above to view its Frayer Model'),
        React.createElement('p', {style:{fontSize:'13px',marginTop:'6px'}}, Object.keys(allFrayerData).length + ' keywords with diagrams, definitions, examples and non-examples')
      )
    )
  )
}
