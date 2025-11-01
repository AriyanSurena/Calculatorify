/** Converts density from Kilograms per cubic meter (kg/m³) to the specified destination unit
 * @param unit - Unit Type as String (String)
 * @param valueInKgPerM3 - Number value in Kilograms per cubic meter to convert to the target unit (Number)
 * @returns Converted value in the specified unit (Number)
 */
const kgPerM3ToUnit = (unit: string, valueInKgPerM3: number): number => {
    switch (unit) {
        // Return Kilograms per cubic meter (kg/m³) as is
        case 'Kilograms per cubic meter (kg/m³)': {
            return valueInKgPerM3;
        }
        // Convert Kilograms per cubic meter (kg/m³) to Grams per cubic centimeter (g/cm³)
        case 'Grams per cubic centimeter (g/cm³)': {
            return valueInKgPerM3 * 0.001;
        }
        // Convert Kilograms per cubic meter (kg/m³) to Pounds per cubic foot (lb/ft³)
        case 'Pounds per cubic foot (lb/ft³)': {
            return valueInKgPerM3 * 0.06242796058;
        }
        // Convert Kilograms per cubic meter (kg/m³) to Grams per cubic meter (g/m³)
        case 'Grams per cubic meter (g/m³)': {
            return valueInKgPerM3 * 1000;
        }
        // Convert Kilograms per cubic meter (kg/m³) to Pounds per cubic inch (lb/in³)
        case 'Pounds per cubic inch (lb/in³)': {
            return valueInKgPerM3 * 0.000036127292;
        }
        // Throw error for invalid destination unit
        default: {
            throw new Error('Unknown density unit');
        }
    }
};

/** Converts density from the specified source unit to Kilograms per cubic meter (kg/m³)
 * @param unit - Unit Type as String (String)
 * @param value - Number value in the source unit to convert to Kilograms per cubic meter (Number)
 * @returns Converted value in Kilograms per cubic meter (kg/m³) (Number)
 */
const densityToKgPerM3 = (unit: string, value: number): number => {
    switch (unit) {
        // Return Kilograms per cubic meter (kg/m³) as is
        case 'Kilograms per cubic meter (kg/m³)': {
            return value;
        }
        // Convert Grams per cubic centimeter (g/cm³) to Kilograms per cubic meter (kg/m³)
        case 'Grams per cubic centimeter (g/cm³)': {
            return value * 1000;
        }
        // Convert Pounds per cubic foot (lb/ft³) to Kilograms per cubic meter (kg/m³)
        case 'Pounds per cubic foot (lb/ft³)': {
            return value * 16.01846337396;
        }
        // Convert Grams per cubic meter (g/m³) to Kilograms per cubic meter (kg/m³)
        case 'Grams per cubic meter (g/m³)': {
            return value * 0.001;
        }
        // Convert Pounds per cubic inch (lb/in³) to Kilograms per cubic meter (kg/m³)
        case 'Pounds per cubic inch (lb/in³)': {
            return value * 27679.904710203;
        }
        // Throw error for invalid source unit
        default: {
            throw new Error('Unknown density unit');
        }
    }
};

/** Density Unit Conversion Function
 * @param from - Source Unit as String (String)
 * @param to - Destination Unit as String (String)
 * @param value - The Value to be Converted (Number)
 * @returns Converted value in the target unit (Number)
 */
const convertDensity = (from: string, to: string, value: number): number => {
    // Convert source unit to Kilograms per cubic meter (kg/m³)
    const inKgPerM3 = densityToKgPerM3(from, value);

    // Convert from Kilograms per cubic meter (kg/m³) to target unit
    const result = kgPerM3ToUnit(to, inKgPerM3);

    return result;
};

export default convertDensity;