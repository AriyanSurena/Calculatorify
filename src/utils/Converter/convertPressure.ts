/** Converts pressure from Pascals (Pa) to the specified destination unit
 * @param unit - Unit Type as String (String)
 * @param valueInPascals - Number value in Pascals to convert to the target unit (Number)
 * @returns Converted value in the specified unit (Number)
 */
const pascalsToUnit = (unit: string, valueInPascals: number): number => {
    switch (unit) {
        // Return Pascals (Pa) as is
        case 'Pascals (Pa)': {
            return valueInPascals;
        }
        // Convert Pascals (Pa) to Kilopascals (kPa)
        case 'Kilopascals (kPa)': {
            return valueInPascals * 0.001;
        }
        // Convert Pascals (Pa) to Bars (bar)
        case 'Bars (bar)': {
            return valueInPascals * 0.00001;
        }
        // Convert Pascals (Pa) to Atmospheres (atm)
        case 'Atmospheres (atm)': {
            return valueInPascals * 0.00000986923267;
        }
        // Convert Pascals (Pa) to Pounds per square inch (psi)
        case 'Pounds per square inch (psi)': {
            return valueInPascals * 0.00014503773773;
        }
        // Throw error for invalid destination unit
        default: {
            throw new Error('Unknown pressure unit');
        }
    }
};

/** Converts pressure from the specified source unit to Pascals (Pa)
 * @param unit - Unit Type as String (String)
 * @param value - Number value in the source unit to convert to Pascals (Number)
 * @returns Converted value in Pascals (Pa) (Number)
 */
const pressureToPascals = (unit: string, value: number): number => {
    switch (unit) {
        // Return Pascals (Pa) as is
        case 'Pascals (Pa)': {
            return value;
        }
        // Convert Kilopascals (kPa) to Pascals (Pa)
        case 'Kilopascals (kPa)': {
            return value * 1000;
        }
        // Convert Bars (bar) to Pascals (Pa)
        case 'Bars (bar)': {
            return value * 100000;
        }
        // Convert Atmospheres (atm) to Pascals (Pa)
        case 'Atmospheres (atm)': {
            return value * 101325;
        }
        // Convert Pounds per square inch (psi) to Pascals (Pa)
        case 'Pounds per square inch (psi)': {
            return value * 6894.75729;
        }
        // Throw error for invalid source unit
        default: {
            throw new Error('Unknown pressure unit');
        }
    }
};

/** Pressure Unit Conversion Function
 * @param from - Source Unit as String (String)
 * @param to - Destination Unit as String (String)
 * @param value - The Value to be Converted (Number)
 * @returns Converted value in the target unit (Number)
 */
const convertPressure = (from: string, to: string, value: number): number => {
    // Convert source unit to Pascals (Pa)
    const inPascals = pressureToPascals(from, value);

    // Convert from Pascals (Pa) to target unit
    const result = pascalsToUnit(to, inPascals);

    return result;
};

export default convertPressure;