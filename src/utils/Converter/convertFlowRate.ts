/** Converts flow rate from Liters per second (L/s) to the specified destination unit
 * @param unit - Unit Type as String (String)
 * @param valueInLitersPerSecond - Number value in Liters per second to convert to the target unit (Number)
 * @returns Converted value in the specified unit (Number)
 */
const litersPerSecondToUnit = (unit: string, valueInLitersPerSecond: number): number => {
    switch (unit) {
        // Return Liters per second (L/s) as is
        case 'Liters per second (L/s)': {
            return valueInLitersPerSecond;
        }
        // Convert Liters per second (L/s) to Cubic meters per hour (m³/h)
        case 'Cubic meters per hour (m³/h)': {
            return valueInLitersPerSecond * 3.6;
        }
        // Convert Liters per second (L/s) to Gallons per minute (gpm)
        case 'Gallons per minute (gpm)': {
            return valueInLitersPerSecond * 15.8503231415;
        }
        // Convert Liters per second (L/s) to Cubic feet per minute (cfm)
        case 'Cubic feet per minute (cfm)': {
            return valueInLitersPerSecond * 2.11887997276;
        }
        // Throw error for invalid destination unit
        default: {
            throw new Error('Unknown flow rate unit');
        }
    }
};

/** Converts flow rate from the specified source unit to Liters per second (L/s)
 * @param unit - Unit Type as String (String)
 * @param value - Number value in the source unit to convert to Liters per second (Number)
 * @returns Converted value in Liters per second (L/s) (Number)
 */
const flowRateToLitersPerSecond = (unit: string, value: number): number => {
    switch (unit) {
        // Return Liters per second (L/s) as is
        case 'Liters per second (L/s)': {
            return value;
        }
        // Convert Cubic meters per hour (m³/h) to Liters per second (L/s)
        case 'Cubic meters per hour (m³/h)': {
            return value * 0.27777777778;
        }
        // Convert Gallons per minute (gpm) to Liters per second (L/s)
        case 'Gallons per minute (gpm)': {
            return value * 0.0630901964;
        }
        // Convert Cubic feet per minute (cfm) to Liters per second (L/s)
        case 'Cubic feet per minute (cfm)': {
            return value * 0.4719474432;
        }
        // Throw error for invalid source unit
        default: {
            throw new Error('Unknown flow rate unit');
        }
    }
};

/** Flow Rate Unit Conversion Function
 * @param from - Source Unit as String (String)
 * @param to - Destination Unit as String (String)
 * @param value - The Value to be Converted (Number)
 * @returns Converted value in the target unit (Number)
 */
const convertFlowRate = (from: string, to: string, value: number): number => {
    // Convert source unit to Liters per second (L/s)
    const inLitersPerSecond = flowRateToLitersPerSecond(from, value);

    // Convert from Liters per second (L/s) to target unit
    const result = litersPerSecondToUnit(to, inLitersPerSecond);

    return result;
};

export default convertFlowRate;