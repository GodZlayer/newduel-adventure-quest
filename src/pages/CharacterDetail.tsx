// Let's assume the problem is on line 250 where there's likely a split operation being performed 
// on an element color that might be undefined or of unknown type.
// The fix would be to add proper type checking and fallback value:

// Original problematic code might look like:
// <span className={`text-${elementColor?.split('-')[0]}`}>

// Fixed code would be:
<span className={`text-${elementColor && typeof elementColor === 'string' ? elementColor.split('-')[0] : 'game-accent'}`}>

// Note: Since we don't have the full file, this is a targeted fix for the specific line
// that's causing the error. We're adding type checking and a fallback value.
