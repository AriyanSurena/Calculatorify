/** Converts mass from Kilograms (kg) to the specified destination unit
 * @param unit - Unit Type as String (String)
 * @param valueInKilograms - Number value in Kilograms to convert to the target unit (Number)
 * @returns Converted value in the specified unit (Number)
 */
const kilogramsToUnit = (unit: string, valueInKilograms: number): number => {
    switch (unit) {
        // Return Kilograms (kg) as is
        case 'Kilograms (kg)': {
            return valueInKilograms;
        }
        // Convert Kilograms (kg) to Grams (g)
        case 'Grams (g)': {
            return valueInKilograms * 1000;
        }
        // Convert Kilograms (kg) to Pounds (lb)
        case 'Pounds (lb)': {
            return valueInKilograms * 2.20462262185;
        }
        // Convert Kilograms (kg) to Ounces (oz)
        case 'Ounces (oz)': {
            return valueInKilograms * 35.2739619496;
        }
        // Convert Kilograms (kg) to Metric Tons (t)
        case 'Metric Tons (t)': {
            return valueInKilograms / 1000;
        }
        // Convert Kilograms (kg) to Milligrams (mg)
        case 'Milligrams (mg)': {
            return valueInKilograms * 1_000_000;
        }
        // Convert Kilograms (kg) to Short Tons (short ton)
        case 'Short Tons (short ton)': {
            return valueInKilograms * 0.00110231131;
        }
        // Throw error for invalid destination unit
        default: {
            throw new Error('Unknown mass unit');
        }
    }
};

/** Converts mass from the specified source unit to Kilograms (kg)
 * @param unit - Unit Type as String (String)
 * @param value - Number value in the source unit to convert to Kilograms (Number)
 * @returns Converted value in Kilograms (kg) (Number)
 */
const massToKilograms = (unit: string, value: number): number => {
    switch (unit) {
        // Return Kilograms (kg) as is
        case 'Kilograms (kg)': {
            return value;
        }
        // Convert Grams (g) to Kilograms (kg)
        case 'Grams (g)': {
            return value / 1000;
        }
        // Convert Pounds (lb) to Kilograms (kg)
        case 'Pounds (lb)': {
            return value / 2.20462262185;
        }
        // Convert Ounces (oz) to Kilograms (kg)
        case 'Ounces (oz)': {
            return value / 35.2739619496;
        }
        // Convert Metric Tons (t) to Kilograms (kg)
        case 'Metric Tons (t)': {
            return value * 1000;
        }
        // Convert Milligrams (mg) to Kilograms (kg)
        case 'Milligrams (mg)': {
            return value / 1_000_000;
        }
        // Convert Short Tons (short ton) to Kilograms (kg)
        case 'Short Tons (short ton)': {
            return value * 907.18474;
        }
        // Throw error for invalid source unit
        default: {
            throw new Error('Unknown mass unit');
        }
    }
};

/** Mass Unit Conversion Function
 * @param from - Source Unit as String (String)
 * @param to - Destination Unit as String (String)
 * @param value - The Value to be Converted (Number)
 * @returns Converted value in the target unit (Number)
 */
const convertMass = (from: string, to: string, value: number): number => {
    // Convert source unit to Kilograms (kg)
    const inKilograms = massToKilograms(from, value);

    // Convert from Kilograms (kg) to target unit
    const result = kilogramsToUnit(to, inKilograms);

    return result;
};

export default convertMass;