/** Converts frequency from Hertz (Hz) to the specified destination unit
 * @param unit - Unit Type as String (String)
 * @param valueInHertz - Number value in Hertz to convert to the target unit (Number)
 * @returns Converted value in the specified unit (Number)
 */
const hertzToUnit = (unit: string, valueInHertz: number): number => {
    switch (unit) {
        // Return Hertz (Hz) as is
        case 'Hertz (Hz)': {
            return valueInHertz;
        }
        // Convert Hertz (Hz) to Kilohertz (kHz)
        case 'Kilohertz (kHz)': {
            return valueInHertz * 0.001;
        }
        // Convert Hertz (Hz) to Megahertz (MHz)
        case 'Megahertz (MHz)': {
            return valueInHertz * 0.000001;
        }
        // Convert Hertz (Hz) to Gigahertz (GHz)
        case 'Gigahertz (GHz)': {
            return valueInHertz * 0.000000001;
        }
        // Throw error for invalid destination unit
        default: {
            throw new Error('Unknown frequency unit');
        }
    }
};

/** Converts frequency from the specified source unit to Hertz (Hz)
 * @param unit - Unit Type as String (String)
 * @param value - Number value in the source unit to convert to Hertz (Number)
 * @returns Converted value in Hertz (Hz) (Number)
 */
const frequencyToHertz = (unit: string, value: number): number => {
    switch (unit) {
        // Return Hertz (Hz) as is
        case 'Hertz (Hz)': {
            return value;
        }
        // Convert Kilohertz (kHz) to Hertz (Hz)
        case 'Kilohertz (kHz)': {
            return value * 1000;
        }
        // Convert Megahertz (MHz) to Hertz (Hz)
        case 'Megahertz (MHz)': {
            return value * 1000000;
        }
        // Convert Gigahertz (GHz) to Hertz (Hz)
        case 'Gigahertz (GHz)': {
            return value * 1000000000;
        }
        // Throw error for invalid source unit
        default: {
            throw new Error('Unknown frequency unit');
        }
    }
};

/** Frequency Unit Conversion Function
 * @param from - Source Unit as String (String)
 * @param to - Destination Unit as String (String)
 * @param value - The Value to be Converted (Number)
 * @returns Converted value in the target unit (Number)
 */
const convertFrequency = (from: string, to: string, value: number): number => {
    // Convert source unit to Hertz (Hz)
    const inHertz = frequencyToHertz(from, value);

    // Convert from Hertz (Hz) to target unit
    const result = hertzToUnit(to, inHertz);

    return result;
};

export default convertFrequency;